import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useAppSelector } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/services/userServices";

export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
  addVideo: "addVideo",
  paymentCollect: "paymentCollect",
};

export const useGetPost = () => {
  const user = useAppSelector((state) => state.auth.user);

  return useQuery({
    queryKey: [queryKeys.getPost],
    queryFn: async () => {
      try {
        return await postApi.getVideoPost();
      } catch (error) {
        // Log the error but don't retry
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    // Only enable the query when user's profile is completed
    enabled: !!user?.isProfileCompleted,
    // Disable automatic retries
    retry: false,
    // Add staleTime to prevent frequent refetches
    staleTime: 5000,
    // Disable refetching on window focus
    refetchOnWindowFocus: false,
  });
};

export const useAddVideoUrl = (videoUrl: string, collaborationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await postApi.addVideoUrl(videoUrl, collaborationId);
    },
    onSuccess: () => {
      // Invalidate relevant queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["creatorVideos", collaborationId],
      });
    },
  });
};

export const useUploadPost = () => {
  return useMutation({
    mutationKey: [queryKeys.uploadPost],
    mutationFn: async (data: FormData) => {
      return await postApi.uploadVideoPost(data);
    },
  });
};

export const useAcceptOrDeclineCollaboration = (
  collaborationId: string,
  status: string,
  options?: { onSuccess?: () => void }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await postApi.acceptOrDeclineCollaboration(
        collaborationId,
        status
      );
    },
    onSuccess: () => {
      // Invalidate relevant queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });

      queryClient.invalidateQueries({ queryKey: ["pendingCollaborationCount"] });

      // Call the onSuccess callback if provided
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};

export const usePendingCollaborationCount = () => {
  const user = useAppSelector((state) => state.auth.user);
  return useQuery({
    queryKey: ["pendingCollaborationCount"],
    queryFn: async () => {
      const res = await userApi.getPendingCollaborationCount(); // implement this API
      return res.data.pendingCollaborationCount || 0;
    },
    enabled: !!user?.isProfileCompleted,
    retry: false,
    staleTime: 60 * 1000, // optional
  })
};



export const useAcceptOrDeclineVideo = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationKey: ["acceptOrDeclineVideo"],
    mutationFn: async ({
      collaborationId,
      videoId,
      status,
      message = "",
    }: {
      collaborationId: string;
      videoId: string;
      status: "Approved" | "Declined" | "Pending" | "Waiting Approval";
      message?: string;
    }) => {
      try {
        const response = await postApi.acceptOrDeclineVideo(
          collaborationId,
          videoId,
          status,
          message
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching getCollaborationByStatus :", error);
        throw error;
      }
    },
    onSuccess,
  });
};

export const useToggleFavorite = (options?: { onSuccess?: () => void, filters?: any }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ creatorId }: { creatorId: string }) => {
      try {
        const res = await postApi.toggleFavoriteCreator(creatorId);
        return res.data;
      } catch (error) {
        console.error("Error in favoriteToggle:", error);
        throw error;
      }
    },

    // ✨ OPTIMISTIC UPDATE - runs immediately when toggleFavorite is called
    onMutate: async ({ creatorId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["exploreCreators", options?.filters] });

      // Snapshot the previous value
      const previousCreators = queryClient.getQueryData(["exploreCreators", options?.filters]);

      // Optimistically update the UI
      queryClient.setQueryData(["exploreCreators", options?.filters], (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            creators: page.creators?.map((creator: any) =>
              creator._id === creatorId
                ? { ...creator, isFavorite: !creator.isFavorite }
                : creator
            ),
          })),
        };
      });

      // Return context with the snapshot
      return { previousCreators };
    },

    // If mutation fails, rollback to previous value
    onError: (err, variables, context) => {
      if (context?.previousCreators) {
        queryClient.setQueryData(
          ["exploreCreators", options?.filters],
          context.previousCreators
        );
      }
    },

    // Always refetch after success to ensure data consistency
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finddaiCampaignsList"] });
      if (options?.onSuccess) options.onSuccess();
    },
  });
};

export const useDeleteCollab = (status: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collabId: string) => postApi.deleteCollab(collabId),
    onSuccess: () => {
      // Refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["finddaiCampaignsList", status] });
    },
  });
};


export const useApplyCampaign = (filters: { search: string; niche: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      campaignId,
      payload,
    }: {
      campaignId: string;
      payload: any;
    }) => {
      const res = await postApi.createCollaboration(campaignId, payload);
      if (!res?.status) {
        throw new Error(res?.message || "Something went wrong");
      }
      return res;
    },

    // ✨ OPTIMISTIC UPDATE - runs immediately
    onMutate: async ({ campaignId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: ["campaigns", filters.search, filters.niche] 
      });

      // Snapshot previous value
      const previousCampaigns = queryClient.getQueryData([
        "campaigns",
        filters.search,
        filters.niche,
      ]);

      // Optimistically update the UI
      queryClient.setQueryData(
        ["campaigns", filters.search, filters.niche],
        (old: any) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              campaigns: page.campaigns.map((campaign: any) =>
                campaign._id === campaignId
                  ? { ...campaign, applied: true }
                  : campaign
              ),
            })),
          };
        }
      );

      return { previousCampaigns };
    },

    // If mutation fails, rollback
    onError: (err, variables, context) => {
      if (context?.previousCampaigns) {
        queryClient.setQueryData(
          ["campaigns", filters.search, filters.niche],
          context.previousCampaigns
        );
      }
    },

    // Refetch after success to ensure sync
    onSettled: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["campaigns", filters.search, filters.niche] 
      });
    },
  });
};
