import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { AxiosError } from "axios";

export const queryKeys = {
  finddaiCampaignsList: "finddaiCampaignsList",
  profileDetails: (id: string) => ["profileDetails", id],
};

export const useFindAiCampaignsList = (status: string) => {
  return useQuery({
    queryKey: [queryKeys.finddaiCampaignsList, status],
    queryFn: async () => {
      try {
        return await postApi.getCollabByStatus(status);
      } catch (error) {
        console.error("Error fetching AI campaigns list:", error);
        throw error;
      }
    },
    retry: false,
    // Set staleTime to 5 seconds
    // staleTime: 1000 * 60,
  });
};

export const useCampaignProfileDetails = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.profileDetails, id],
    queryFn: async () => {
      try {
        return await postApi.profileCardDetails(id);
      } catch (error) {
        console.error(`Error fetching campaign with ID ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    // Set staleTime to 5 seconds
    staleTime: 5000,
    retry: (failureCount, error) => {
      const err = error as AxiosError;
      if (err.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};

export const useInfiniteFindAiCampaign = (
  campaignId: string,
  filter?: string,
) => {
  return useInfiniteQuery({
    queryKey: ["findAiCampaign", campaignId, filter],
    queryFn: ({ pageParam = 1 }) =>
      postApi.findAIMatch(campaignId, pageParam, 12, filter),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;

      if (page < totalPages) {
        return page + 1;
      }
      return undefined;
    },

    enabled: !!campaignId,
    retry: false,
  });
};



export const useGetCreatorVideos = (id: string) => {
  return useQuery({
    queryKey: ["creatorVideos", id],
    queryFn: async () => {
      try {
        return await postApi.getCreatorVideos(id);
      } catch (error) {
        console.error(`Error fetching creator videos for ID ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    retry: 2,
    // Set staleTime to 5 seconds
    staleTime: 5000,
  });
};


