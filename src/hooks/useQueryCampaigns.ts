import { useQuery} from "@tanstack/react-query";
import { postApi } from "@/services/postServices";


// Query keys
export const queryKeys = {
  campaigns: "campaigns",
  campaign: (id: string) => ["campaign", id],
};

// Hook for fetching all campaigns
export const useCampaigns = () => {
  return useQuery({
    queryKey: [queryKeys.campaigns],
    queryFn: async () => {
      return await postApi.getCampaigns();
    },
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
  });
};

