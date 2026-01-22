"use client";

import { Card } from "../ui/card";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
  />
);

export default function BrandDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* TOP STATS */}
      <div className="border border-gray-200 rounded-lg px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border bg-white p-5"
            >
              <div className="flex flex-col gap-2">
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-7 w-16" />
              </div>
              <SkeletonBox className="w-14 h-14 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* ONGOING COLLABORATIONS */}
      <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white">
        <div className="flex justify-between items-center mb-5">
          <SkeletonBox className="h-5 w-48" />
          <SkeletonBox className="h-4 w-16" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <SkeletonBox className="h-36 w-full rounded-lg" />
              <SkeletonBox className="h-4 w-3/4" />
              <SkeletonBox className="h-4 w-1/2" />
              <SkeletonBox className="h-8 w-full rounded-md" />
            </Card>
          ))}
        </div>
      </div>

      {/* FAVORITE CREATORS */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <SkeletonBox className="h-5 w-40" />
          <SkeletonBox className="h-4 w-16" />
        </div>

        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="w-[260px] p-4 space-y-3">
              <SkeletonBox className="h-32 w-full rounded-lg" />
              <SkeletonBox className="h-4 w-3/4" />
              <SkeletonBox className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </Card>

      {/* RECENT CREATORS */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <SkeletonBox className="h-5 w-44" />
          <SkeletonBox className="h-4 w-16" />
        </div>

        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="w-[260px] p-4 space-y-3">
              <SkeletonBox className="h-32 w-full rounded-lg" />
              <SkeletonBox className="h-4 w-3/4" />
              <SkeletonBox className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
