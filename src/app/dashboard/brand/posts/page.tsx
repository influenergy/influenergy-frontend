"use client";
import React, { useState } from "react";
import Post from "@/components/dashboard/Post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCampaigns } from "@/hooks/useQueryCampaigns";
import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import CampaignSkeleton from "@/components/Skeletons/CampaignSkeleton";
import { Sparkles } from "lucide-react";
import { ProductUrlModal } from "@/components/questionnaire/ProductUrlModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error } = useCampaigns();
  const [showUrlModal, setShowUrlModal] = useState(false);
  // Local state not needed; data is passed via sessionStorage for cross-page handoff

  const handleURLModalClose = () => {
    setShowUrlModal(false);
    // setShowQuestionnaire(true);
  };
  const handleAIGenerationSuccess = (campaignData: Record<string, unknown>) => {
    try {
      sessionStorage.setItem("aiGeneratedCampaign", JSON.stringify(campaignData));
    } catch { }
    setShowUrlModal(false);
    router.push("/dashboard/brand/create-post");
  };
  // Extract campaigns from the response and provide a default empty array
  const campaigns: Campaign[] = data?.campaigns || [];
  if (isLoading) {

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Ad Briefs</h1>
          <div className="w-36 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
        <CampaignSkeleton />
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="mb-8">
        {campaigns.length != 0 && (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">My Ad Briefs</h1>
              <p className="text-gray-600 text-sm max-w-md dark:text-white">
                Our AI helps you create a brief quickly, and you can refine it manually to get the most accurate creator matches.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-primary px-5 py-2 rounded-xl hover:text-white" onClick={() => {
                setShowUrlModal(true)
              }}>
                <Sparkles className="h-8 w-8 " />
                Create Brief using AI
              </Button>
              <Link href="/dashboard/brand/create-post">
                <Button className="bg-primary px-5 py-2 rounded-xl">
                  Add New Ad Brief
                </Button>
              </Link>
            </div>
          </div>

        )}
      </div>

      {error && (
        <div className="text-center w-full text-red-500 mb-4">
          Not able to fetch campaigns data
        </div>
      )}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {campaigns.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]  gap-5 ">
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/empty.png"
              width={400}
              height={400}
              alt="Empty"
              className="object-cover"
            />
            <p className="text-4xl font-semibold text-center mt-4 leading-normal dark:text-gray-200">

              Welcome to the brief section!<br />Create your campaign brief and let our AI Find tool match <br />you with the perfect creators.
            </p>
            <Link href="/dashboard/brand/create-post">
              <Button className="bg-primary px-5 py-2 h-10 rounded-xl text-lg ">
                + Create Ad Brief
              </Button>
            </Link>
          </div>
        ) : (
          campaigns.map((campaign: Campaign) => (
            <div key={campaign._id} className="relative">
              <Post {...campaign} />
            </div>
          ))
        )}
      </div>

      <ProductUrlModal
        isOpen={showUrlModal}
        onClose={handleURLModalClose}
        onSuccess={handleAIGenerationSuccess}
      />
    </div>
  );
};

export default Page;
