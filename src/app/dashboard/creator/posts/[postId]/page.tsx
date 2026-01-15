"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading campaign details...</span>
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

    <PostDescription data={campaignData} collaborations={collaborations} role="CREATOR"/>
  </>
};

export default Page;