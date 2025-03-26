import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";

export default function AIFindTab() {
  const router = useRouter();
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useFindAiCampaignsList("Initial");

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
        <p className="text-red-500">Something went wrong while fetching data</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full px-2 sm:px-4 flex-1">
      {campaigns?.campaigns?.length === 0 ? (
        <>
          <div className="w-full flex flex-col items-center justify-center  min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center">
            <Image
              src="/images/AIFind/image.png"
              alt="No campaigns"
              width={180}
              height={180}
              className="mx-auto"
              priority
            /> 
            <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">
                Welcome to AI Find.
                <br />
                Here you can match your created post with your desired creator
                using the magic of AI.
                <br />
                No posts are available now. Go to my post section to create a
                new post.
              </h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {campaigns?.campaigns?.map((campaign: Campaign) => (
              <div key={campaign._id} className="relative">
                <CampaignCard
                  campaign={campaign}
                  onFindClick={handleFindAI}
                  status={"Initial"}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
