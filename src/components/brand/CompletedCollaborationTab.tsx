import { Campaign } from "@/types/PostQuestionnaire";
import { Loader2 } from "lucide-react";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";

export default function CompletedCollaborationTab() {
  const { data, isLoading, isError } = useFindAiCampaignsList("Completed");

  if (isLoading) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading completed collaborations...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Something went wrong while fetching data</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4">
      {data.campaigns.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No completed collaborations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {data.campaigns.map((campaign: Campaign) => (
            <div key={campaign._id} className="relative">
              <CampaignCard campaign={campaign} status={"Completed"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
