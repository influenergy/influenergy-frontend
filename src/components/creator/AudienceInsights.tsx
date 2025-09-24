import { UserProfile } from "@/types/CreatorDetails";
import React from "react";
import { TiChartPieOutline } from "react-icons/ti";

const AudienceInsights = ({ creator }: UserProfile) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-900 mt-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <TiChartPieOutline className="text-primary h-6 w-6" />
        Audience Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            What&apos;s the growth rate of creators followers over last 6 months?
          </p>
          <p className="text-base md:text-lg">
            {creator.profile?.growthRate || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            What are the top geographic locations of their audience?
          </p>
          <p className="text-base md:text-lg">
            {creator.profile?.audience?.audienceLocations.join(", ") ||
              "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            What % of their audience is US based?
          </p>
          <p className="text-base md:text-lg">
            {creator.profile?.audience?.usBasedPercentage || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudienceInsights;
