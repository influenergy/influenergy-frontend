import { useQuery, useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";

// Query keys
export const queryKeys = {
  campaigns: "campaigns",
  campaign: (id: string) => ["campaign", id],
  createCollaboration: (id: string) => ["createCollaboration", id],
  getAISummary: (campaignId: string) => ["getAISummary", campaignId],
};

// Hook for fetching all campaigns
export const useCampaigns = () => {
  return useQuery({
    queryKey: [queryKeys.campaigns],
    queryFn: async () => {
      return await postApi.getCampaigns({
        all: true,
      });
    },
    // Set staleTime to 5 seconds
    staleTime: 5000,
  });
};

// Hook for fetching a single campaign by ID
export const useCampaign = (id: string, creatorId: string, status: string) => {
  return useQuery({
    queryKey: queryKeys.campaign(id),
    queryFn: async () => {
      return await postApi.getCampaignById(id, creatorId, status);
    },
    enabled: !!id, // Only run query if id is provided
    // Set staleTime to 5 seconds
    staleTime: 5000,
  });
};

type CreateCollaborationPayload = {
  brandId: string;
  coverMessage?: string;
  creatorBudget?: string;
};

export const useCreateCollaboration = (campaignId: string) => {
  return useMutation({
    mutationKey: queryKeys.createCollaboration(campaignId),
    mutationFn: (payload: CreateCollaborationPayload) => {
      return postApi.createCollaboration(campaignId, payload);
    },
  });
};


export const useCollaborationStatusDetails = (status: string) => {
  return useQuery({
    queryKey: ["collaborationStatusDetails", status],
    queryFn: async () => {
      try {
        return await postApi.getCollaborationByStatus(status);
      } catch (error) {
        console.error("Error fetching collaboration status details:", error);
        throw error;
      }
    },
    // Set staleTime to 5 seconds
    staleTime: 5000,
    enabled: !!status,
  });
};

export const useGetAISummary = (creatorId: string, campaignId: string) => {
  return useQuery({
    queryKey: [queryKeys.getAISummary],
    queryFn: async () => {
      try {
        return await postApi.getAISummary(creatorId, campaignId);
      } catch (error) {
        // Log the error but don't retry
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    // Only enable the query when user's profile is completed
    enabled: !!campaignId,
    // Disable automatic retries
    retry: false,
    // Add staleTime to prevent frequent refetches
    staleTime: 5000,
    // Disable refetching on window focus
    refetchOnWindowFocus: false,
  });
};
