"use client";

import React, { useEffect, useState } from "react";
// import Cards from "@/components/common/PostCard";
import CardSkeleton from "@/components/common/CardSkeleton";
import { DESCRIPTION } from "@/constants/Description";
import PostDescription from "@/components/dashboard/Post";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
        {isLoading
          ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
          : DESCRIPTION.map((item, i) => (
              <PostDescription key={i} data={item} />
            ))}
      </div>
    </div>
  );
};

export default Page;
