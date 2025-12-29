"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCampaign } from "@/hooks/useQueryCampaigns";
import { CampaignResponse, Collaboration } from "@/types/PostTypes";

const Page = () => {
  const { postId,status } = useParams();
  const [campaignData, setCampaignData] = useState<CampaignResponse | null>(null);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const { data, isLoading, error } = useCampaign(postId as string,status as string);
  useEffect(() => {
    if (data?.data) {
      setCampaignData(data.data.campaignData || {});
      setCollaborations(data.data.collaborations);
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
      <div className="text-center text-red-500">
        Not able to fetch campaigns data
      </div>
    );
  }

  if (!campaignData) {
    return <div>Campaign not found</div>;
  }
  
  return <>

    <PostDescription data={campaignData} collaborations={collaborations} />
  </>
};

export default Page;