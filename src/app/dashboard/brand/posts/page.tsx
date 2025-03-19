"use client";

import React from "react";
import CardSkeleton from "@/components/common/CardSkeleton";
import Post from "@/components/dashboard/Post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCampaigns } from "@/hooks/useQueryCampaigns";
import { Campaign } from "@/types/PostQuestionnaire";

const Page = () => {
  const { data, isLoading, error } = useCampaigns();

  // Extract campaigns from the response and provide a default empty array
  const campaigns: Campaign[] = data?.campaigns || [];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link href="/dashboard/brand/create-post">
          <Button className="bg-primary px-5 py-2 rounded-xl">
            + Create Ad
          </Button>
        </Link>
      </div>

      {error && (
        <div className="text-center w-full text-red-500 mb-4">
          Not able to fetch campaigns data
        </div>
      )}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {isLoading ? (
          [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
        ) : campaigns.length === 0 ? (
          <div className="text-center w-full">
            <p className="text-muted-foreground">
              You have not created any posts yet.
            </p>
          </div>
        ) : (
          campaigns.map((campaign: Campaign) => (
            <div key={campaign._id} className="relative">
              <Post {...campaign} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
