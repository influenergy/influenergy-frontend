"use client";

import Cards from "@/components/common/Cards";
import CardSkeleton from "@/components/common/CardSkeleton";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
          : [...Array(10)].map((_, i) => <Cards key={i} />)}
      </div>
    </div>
  );
};

export default Page;
