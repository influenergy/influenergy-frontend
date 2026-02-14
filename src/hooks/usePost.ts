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
  sort?: string;
  platform?: string;
  followers?: string;
  niche?: string;
  search?: string;
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

// Update the hook to handle both cases
export const useToggleFavorite = (
  options?: {
    onSuccess?: () => void;
    filters?: CampaignFilters | string;
    debouncedSearch?: string;
  }
) => {
  const queryClient = useQueryClient();

  const normalizedFilters =
    typeof options?.filters === "string"
      ? { search: options.filters, niche: "" }
      : options?.filters;

  const searchParam = options?.debouncedSearch ?? "";

  const buildQueryKey = () =>
    ["exploreCreators", searchParam, normalizedFilters];

  return useMutation<
    ToggleFavoriteResponse,                     // ✅ Mutation return type
    Error,                                      // ✅ Error type
    { creatorId: string },                      // ✅ Variables type
    { previousCreators?: ExploreCreatorsResponse } // ✅ Context type
  >({
    mutationFn: async ({ creatorId }) => {
      return await postApi.toggleFavoriteCreator(creatorId);
    },

    // 🔹 Optimistic update
    onMutate: async ({ creatorId }) => {
      const queryKey = buildQueryKey();
      await queryClient.cancelQueries({ queryKey });

      const previousCreators =
        queryClient.getQueryData<ExploreCreatorsResponse>(queryKey);

      queryClient.setQueryData<ExploreCreatorsResponse>(queryKey, (old) => {
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
      });

      return { previousCreators };
    },

    onError: (_err, _variables, context) => {
      const queryKey = buildQueryKey();
      if (context?.previousCreators) {
        queryClient.setQueryData(queryKey, context.previousCreators);
      }
    },

    onSuccess: () => {
      options?.onSuccess?.();
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

