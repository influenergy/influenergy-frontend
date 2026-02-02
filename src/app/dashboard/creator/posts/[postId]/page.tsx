"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCampaign } from "@/hooks/useQueryCampaigns";
import { NewCampaignResponse, Collaboration } from "@/types/PostTypes";
import { useAppSelector } from "@/store";
import ErrorState from "@/components/common/ErrorState";


const Page = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { postId } = useParams();
  const creatorId = user?._id;

  const [campaignData, setCampaignData] = useState<NewCampaignResponse | null>(null);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const { data, isLoading, error } = useCampaign(postId as string, creatorId as string, 'none');

  useEffect(() => {
    if (data?.data) {
      setCampaignData(data.data || {});
      setCollaborations(data.data.collaborations || []);
    }
  }, [data]);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Campaigns unavailable"
        description="We couldn’t fetch campaigns right now."
      />
    );
  }


  if (!campaignData) {
    return <div>Campaign not found</div>;
  }

  return <>

    <PostDescription data={campaignData} collaborations={collaborations} role="CREATOR" />
  </>
};

export default Page;