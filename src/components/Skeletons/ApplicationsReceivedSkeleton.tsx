import React from 'react';

// Skeleton for the campaign dropdown
const CampaignSelectSkeleton = () => (
  <div className="mb-6">
    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
    <div className="w-full max-w-md h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
  </div>
);

// Skeleton for individual creator card
const CreatorCardSkeleton = () => (
  <div className="flex flex-col items-start justify-between px-3 py-2 gap-2 border border-gray-300 rounded-2xl dark:border-gray-700">
    {/* Creator Info Section */}
    <div className="flex items-start gap-4 w-full px-3 py-2">
      {/* Avatar Skeleton */}
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
      
      {/* Info Skeleton */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Name */}
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        
        {/* City + Age + Followers */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Status Badge Skeleton */}
      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    </div>
    
    {/* Cover Message Skeleton */}
    <div className="w-full space-y-2 px-3">
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
    
    {/* Deliverables Section Skeleton */}
    <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 w-full">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
    
    {/* Action Buttons Skeleton */}
    <div className="flex gap-3 w-full px-3">
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
    </div>
  </div>
);

// Main skeleton component for the entire page
export default function ApplicationsReceivedSkeleton() {
  return (
    <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Campaign Select Skeleton */}
        <CampaignSelectSkeleton />
        
        {/* Creator Cards Skeleton (showing 3 cards) */}
        <div className="mt-6 space-y-4">
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
          <CreatorCardSkeleton />
        </div>
      </div>
    </div>
  );
}

// You can also export individual skeleton components if needed
export { CampaignSelectSkeleton, CreatorCardSkeleton };