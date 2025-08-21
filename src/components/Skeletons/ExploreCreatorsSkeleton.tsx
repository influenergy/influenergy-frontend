// src/components/Skeletons/ExploreCreatorsSkeleton.tsx
"use client";
import React from "react";
import { Card } from "@/components/ui/card";

export default function ExploreCreatorsSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      {/* Page title */}
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>

      {/* Grid of creator cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, idx) => (
          <Card
            key={idx}
            className="flex flex-col items-stretch p-2 gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow"
          >
            {/* Image placeholder */}
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              {/* Name + socials */}
              <div className="flex w-full justify-between items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                  <div className="w-5 h-5 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                </div>
              </div>

              {/* Categories + city */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex gap-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-10"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-12"></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-12"></div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="h-8 bg-gray-300 dark:bg-gray-500 rounded-lg w-28"></div>
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-500 rounded-md"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Placeholder */}
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mx-auto mt-6"></div>
    </div>
  );
}
