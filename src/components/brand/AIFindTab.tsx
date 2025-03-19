import { memo } from "react";
import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";

const CampaignCard = memo(
  ({
    campaign,
    onFindClick,
  }: {
    campaign: Campaign;
    onFindClick: (id: string) => void;
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
          loading="lazy"
          className="object-cover rounded-xl"
        />
      </div>

      <Button
        className="bg-primary w-full text-base p-5 md:text-lg flex items-center justify-center gap-2"
        onClick={() => onFindClick(campaign.vectorId)}
      >
        AI Find <Sparkles className="h-5 w-5 sm:h-7 sm:w-7" />
      </Button>
    </div>
  )
);

CampaignCard.displayName = "CampaignCard";


export default function AIFindTab() {
  const router = useRouter();
  const { data: campaigns, isLoading, isError } = useFindAiCampaignsList();  


  const handleFindAI = async (campaignId: string) => {
    router.push(`/dashboard/brand/findai/campaign/${campaignId}`);
  };

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading campaigns</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4">
      {campaigns?.campaigns?.length === 0 ? (  
        <div className="text-center py-10">
          <p className="text-gray-500">No campaigns available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {campaigns?.campaigns?.map((campaign: Campaign) => ( 
            <div key={campaign._id} className="relative">
              <CampaignCard campaign={campaign} onFindClick={handleFindAI} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
