"use client";
import React from "react";
import { Card } from "../ui/card";

function BrandDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-6 w-full">
        {/* Welcome Card */}
        <Card className="p-6 flex flex-col gap-6">
          <div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex-1 bg-gray-300 rounded-xl h-[200px]" />
        </Card>

        {/* Stats + Recently Worked With */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_2.5fr] gap-6">
          {/* Stats */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 flex flex-col gap-4">
                <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </Card>
            ))}
          </div>

          {/* Recently Worked With */}
          <Card className="p-6 flex flex-col gap-4">
            <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg"
              >
                <div className="w-20 h-20 bg-gray-300 rounded-xl"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1">
        <Card className="p-6 grid grid-cols-2 gap-6">
          <div className="bg-gray-300 rounded-full w-[200px] h-[200px] mx-auto"></div>
          <div className="bg-gray-300 rounded-full w-[200px] h-[200px] mx-auto"></div>
        </Card>
      </div>

      {/* Completed Collaborations */}
      <Card className="p-6">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4 flex flex-col gap-3">
              <div className="h-5 bg-gray-300 rounded w-2/3"></div>
              <div className="bg-gray-300 rounded-lg w-full h-40"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default BrandDashboardSkeleton;
