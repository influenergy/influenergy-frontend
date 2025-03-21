"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetPost } from "@/hooks/usePost";
import CardSkeleton from "@/components/common/CardSkeleton";
import PostCard from "@/components/common/PostCard";
import UploadVideoModal from "@/components/dashboard/UploadVideoModal";
import Image from "next/image";
import { selectUser, useAppSelector } from "@/store";

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
  const user = useAppSelector(selectUser);

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
    return (
      <div className="w-full flex flex-col items-center justify-center h-full gap-5">
        <Image
          src="/images/MyPost/error.png"
          width={400}
          height={400}
          alt="Error"
          className="object-cover"
        />
        <p className="text-4xl font-semibold text-center mt-4">
          Something went wrong while fetching data
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen">
      {posts.videos.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center h-full gap-5">
          <Image
            src="/images/MyPost/empty.png"
            width={400}
            height={400}
            alt="Empty"
            className="object-cover"
          />
          <p className="text-4xl font-semibold text-center mt-4">
            Welcome to Brief section <br /> Here you can create brief for your
            campaign
          </p>
          {user?.isAccountVerified ? (
            <Button
              className="bg-primary text-white py-1 px-4 rounded-lg md:w-auto"
              onClick={() => setIsOpen(true)}
            >
              + Create brief
            </Button>
          ) : (
            <p className="text-lg font-medium text-destructive">
              You account is not verified yet. Please verify your account to
              start creating briefs.
            </p>
          )}

          <UploadVideoModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSuccess={() => refetch()}
          />
        </div>
      ) : (
        <>
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
        </>
      )}
      <UploadVideoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default Page;
