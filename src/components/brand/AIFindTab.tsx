import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";
import Loader from "./Loader";

export default function AIFindTab() {
  const router = useRouter();
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useFindAiCampaignsList("Pending");

  const handleFindAI = async (campaignId: string) => {
    router.push(`/dashboard/brand/findai/campaign/${campaignId}`);
  };

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
    <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">
      {/* {campaigns?.campaigns?.length === 0 ? (
        <>
          <div className="w-full flex flex-col items-center justify-center  min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center">
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/image.png"
              alt="No campaigns"
              width={180}
              height={180}
              className="mx-auto"
              priority
            />
            <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
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
                  onActionClick={handleFindAI}
                  displayStatus={"Initial"}
                />
              </div>
            ))}
          </div>
        </>
      )} */}
    </div>
  );
}
