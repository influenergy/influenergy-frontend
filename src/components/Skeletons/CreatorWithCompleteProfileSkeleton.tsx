import React from "react";
import { Card } from "../ui/card";

function CreatorWithCompleteProfileSkeleton() {
  return (
    <div className="flex flex-col lg:flex-col gap-6 pr-4 animate-pulse">
      {/* Top Welcome Card */}
      <Card className="p-6 w-full flex gap-6">
        <div className="bg-gray-300 rounded-lg h-[100px] w-[180px]" />
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[50%_25%_25%] gap-6">
        {/* AI Profile Recommendation */}
        <Card className="p-6 w-full flex flex-col">
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-4"></div>
          <div className="flex-1 bg-gray-200 rounded-xl p-6 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="bg-gray-300 rounded-full h-12 w-12"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recently Worked With */}
        <Card className="p-6 w-full flex flex-col">
          <div className="h-5 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="flex flex-col gap-4 flex-1">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="bg-gray-300 rounded-full w-[70px] h-[70px]" />
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((_, idx) => (
            <Card key={idx} className="flex flex-col gap-4 px-2 py-5">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorWithCompleteProfileSkeleton;
