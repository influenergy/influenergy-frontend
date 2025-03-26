import { useQuery, useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";

// Query keys
export const queryKeys = {
  campaigns: "campaigns",
  campaign: (id: string) => ["campaign", id],
  createCollaboration: (id: string) => ["createCollaboration", id],
};

// Hook for fetching all campaigns
export const useCampaigns = () => {
  return useQuery({
    queryKey: [queryKeys.campaigns],
    queryFn: async () => {
      return await postApi.getCampaigns();
    },
    // Set staleTime to 5 seconds
    staleTime: 5000,
  });
};

// Hook for fetching a single campaign by ID
export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: queryKeys.campaign(id),
    queryFn: async () => {
      return await postApi.getCampaignById(id);
    },
    enabled: !!id, // Only run query if id is provided
    // Set staleTime to 5 seconds
    staleTime: 5000,
  });
};

export const useCreateCollaboration = (
  id: string,
  creatorId: string,
  amount: string
) => {
  return useMutation({
    mutationKey: queryKeys.createCollaboration(id),
    mutationFn: async () => {
      return await postApi.createCollaboration(id, creatorId, amount);
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
