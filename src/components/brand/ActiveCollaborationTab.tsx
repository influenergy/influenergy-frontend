import { useEffect, useState } from "react";
import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { postApi } from "@/services/postServices";
import { useAppSelector, selectUser } from "@/store";

// Campaign Card Component
const CampaignCard = ({
  campaign, 
}: {
  campaign: Campaign;
}) => (
  <div className="w-3/4 md:w-full rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2">
    <div className="mb-3">
      <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
        {campaign.campaignName}
      </h3>
    </div>

    <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
      <Image
        src={campaign.campaignPost || "/images/login.webp"}
        alt={campaign.campaignName}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority={true}
        className="object-cover rounded-xl"
      />
    </div>

    <Button className="bg-primary w-full text-base p-5 md:text-lg flex items-center justify-center gap-2">
      Active Collaboration
    </Button>
  </div>
);

export default function ActiveCollaborationTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchActiveCollaborations = async () => {
      try {
        setIsLoading(true);
        if (user && user._id) {
          const response = await postApi.getActiveCollaboration(user._id);
          setCampaigns(response.campaigns || []);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching active collaborations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveCollaborations();
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading active collaborations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading active collaborations</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4">
      {campaigns.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No active collaborations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="relative">
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
