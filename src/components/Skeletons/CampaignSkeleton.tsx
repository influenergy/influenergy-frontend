"use client";

import React from "react";

const CampaignSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap justify-center sm:justify-start gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-72 h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
        >
          <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded-t-xl" />
          <div className="p-4 space-y-3">
            <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignSkeleton;
