import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useAppSelector } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/services/userServices";
import { Campaign } from "@/types/Collaboration";

export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
  addVideo: "addVideo",
  paymentCollect: "paymentCollect",
};

type CampaignFilters = {
  search: string;
  niche: string;
};

type ApplyCampaignPayload = {
  brandId: string;
  coverMessage?: string;
  creatorBudget?: string;
};


// 🔹 Favorite API response
type ToggleFavoriteResponse = {
  added: boolean;
  removed: boolean;
};

// 🔹 Creator inside explore list
type ExploreCreator = {
  _id: string;
  isFavorite: boolean;
  // add more fields if you have them
};

// 🔹 Each page of infinite query
type ExploreCreatorsPage = {
  creators: ExploreCreator[];
};

// 🔹 Full infinite query cache structure
type ExploreCreatorsResponse = {
  pages: ExploreCreatorsPage[];
};

type CollaborationData = {
  collaborationId: string;
  brandId: string;
  creatorId: string;
  campaignId: string;
  creatorBudget?: string;
  status: string;
  createdAt: string;
};


type CreateCollaborationResponse = {
  success: boolean;
  message: string;
  data: CollaborationData;
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

export const useToggleFavorite = (
  options?: { onSuccess?: () => void; filters?: CampaignFilters }
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleFavoriteResponse,                // mutation return type
    Error,                                 // error type
    { creatorId: string },                 // variables type
    { previousCreators?: ExploreCreatorsResponse } // context type
  >({
    mutationFn: async ({ creatorId }) => {
      const res = await postApi.toggleFavoriteCreator(creatorId);
      return res as ToggleFavoriteResponse;
    },

    // ✨ OPTIMISTIC UPDATE
    onMutate: async ({ creatorId }) => {
      await queryClient.cancelQueries({
        queryKey: ["exploreCreators", options?.filters],
      });

      const previousCreators =
        queryClient.getQueryData<ExploreCreatorsResponse>([
          "exploreCreators",
          options?.filters,
        ]);

      queryClient.setQueryData<ExploreCreatorsResponse>(
        ["exploreCreators", options?.filters],
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              creators: page.creators.map((creator) =>
                creator._id === creatorId
                  ? { ...creator, isFavorite: !creator.isFavorite }
                  : creator
              ),
            })),
          };
        }
      );

      return { previousCreators };
    },

    // 🔁 Rollback on error
    onError: (_err, _variables, context) => {
      if (context?.previousCreators) {
        queryClient.setQueryData(
          ["exploreCreators", options?.filters],
          context.previousCreators
        );
      }
    },

    // 🔄 Refetch after success
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finddaiCampaignsList"],
      });

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


export const useApplyCampaign = (filters: {
  search: string;
  niche: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateCollaborationResponse & { campaignId: string },
    Error,
    { campaignId: string; payload: ApplyCampaignPayload }
  >({
    mutationFn: async ({ campaignId, payload }) => {
      const res = await postApi.createCollaboration(campaignId, payload);

      if (!res.success) {
        throw new Error(res.message);
      }

      return { ...res, campaignId };
    },

    onSuccess: (data) => {
      const campaignId = data.campaignId;

      queryClient.setQueryData(
        ["campaigns", filters.search, filters.niche],
        (old: any) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              campaigns: page.campaigns.map((campaign: Campaign) =>
                campaign._id === campaignId
                  ? { ...campaign, applied: true }
                  : campaign
              ),
            })),
          };
        }
      );
    },
  });
};

