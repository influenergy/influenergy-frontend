"use client";

import React from "react";

const CampaignSkeleton = () => {
  return (
    <div className="border rounded-lg p-5 dark:border-gray-700 flex flex-col animate-pulse">
      {/* Bookmark */}
      <div className="flex justify-end mb-3">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Header */}
      <div className="flex gap-5 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-gray-300 dark:bg-gray-700" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Budget */}
      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />

      {/* Date */}
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3" />

      {/* Niches */}
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>

      {/* Deliverables */}
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4" />

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Footer buttons */}
      <div className="mt-4 pt-4 flex justify-between gap-3">
        <div className="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  );
};

export default CampaignSkeleton;
