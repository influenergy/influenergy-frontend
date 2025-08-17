import { Campaign } from "@/types/PostQuestionnaire";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";
import Loader from "./Loader";

export default function ActiveCollaborationTab() {
  const { data, isLoading, isError } = useFindAiCampaignsList("Active");

  if (isLoading) {
    return <Loader />;
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
          <p className="text-gray-500">No active collaborations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {data.campaigns.map((campaign: Campaign) => (
            <div key={campaign._id} className="relative">
              <CampaignCard campaign={campaign} status={"Active"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
