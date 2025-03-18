"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCampaign } from "@/hooks/useQueryCampaigns";

const Page = () => {
  const { postId } = useParams();
  const { data: campaign, isLoading, error } = useCampaign(postId as string);


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

  if (!campaign) {
    return <div>Campaign not found</div>;
  }


  return <PostDescription {...campaign} />;
};

export default Page;
