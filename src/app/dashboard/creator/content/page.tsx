"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetPost } from "@/hooks/usePost";
import CardSkeleton from "@/components/common/CardSkeleton";
import PostCard from "@/components/common/PostCard";
import UploadVideoModal from "@/components/dashboard/UploadVideoModal";

interface VideoData {
  _id: string;
  title: string;
  image: string;
  isPublic: string;
  videoLink: string;
  createdAt?: string;
  updatedAt?: string;
}

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: posts, isLoading, isError, refetch } = useGetPost();

  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:space-x-4">
        <p className="text-2xl font-semibold md:text-3xl font-poppins md:w-1/2">
          Upload your best performing videos to showcase your performance to
          brand!
        </p>
        <div className="flex items-center justify-end w-full md:w-auto">
          <Button
            className="bg-primary text-white py-1 px-4 rounded-lg md:w-auto"
            onClick={() => setIsOpen(true)}
          >
            + Post Video
          </Button>

          <UploadVideoModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSuccess={() => refetch()}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {posts.videos.map((data: VideoData, index: number) => (
          <PostCard
            key={index}
            data={{
              image: data.image,
              title: data.title,
              isPublic: data.isPublic,
              videoLink: data.videoLink,
              _id: data._id,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
