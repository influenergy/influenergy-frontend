"use client";
import CardSkeleton from "@/components/common/CardSkeleton";
import React, { useEffect, useState } from "react";
import PostCard from "@/components/common/PostCard";
import { Button } from "@/components/ui/button";
// import ComingSoon from "@/components/common/ComingSoon";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
      <Button className="bg-primary text-white py-1 px-4 rounded-lg">+ Post Video</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {isLoading
          ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
          : [...Array(10)].map((_, i) => <PostCard key={i} />)}

      </div>
          {/* <ComingSoon/> */}
    </div>
  );
};

export default Page;
