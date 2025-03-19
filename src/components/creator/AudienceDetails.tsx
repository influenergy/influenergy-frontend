import React from "react";
import { Users } from "lucide-react";
import { UserProfile } from "@/types/CreatorDetails";

const AudienceDetails = ({ creator }: UserProfile) => {
  const { audienceInfo } = creator.profile;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <Users className="text-primary h-5 w-5" />
        Creator&apos;s Audience Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4">
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Primary Audience Location
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.primaryLocation || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Primary Audience Age
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.primaryAge || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Primary Audience Gender
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.primaryGender || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Primary Audience Percentage
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.primaryPercentage || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Secondary Audience Location
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.secondaryLocation || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Secondary Audience Age
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.secondaryAge || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Secondary Audience Gender
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.secondaryGender || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Secondary Audience Percentage
          </p>
          <p className="text-base md:text-lg">
            {audienceInfo?.secondaryPercentage || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudienceDetails;
