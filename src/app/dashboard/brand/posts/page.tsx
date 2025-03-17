"use client";

import React, { useEffect } from "react";
import CardSkeleton from "@/components/common/CardSkeleton";
import PostDescription from "@/components/dashboard/Post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector, selectPosts, selectPostLoading } from "@/store";
import { fetchCampaigns } from "@/store/features/postSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectPostLoading);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

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
          campaigns.map((campaign, i) => (
            <div key={i} className="relative">
              <PostDescription data={campaign} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Link href={`/dashboard/brand/posts/edit/${campaign._id}`}>
                  <Button size="sm" variant="secondary">Edit</Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
