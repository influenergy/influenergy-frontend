import React from "react";
import { Users } from "lucide-react";
import { UserProfile } from "@/types/CreatorDetails";

const CreatorAudience = ({ creator }:UserProfile) => {
 

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-900">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex gap-2 items-center">
        <Users className="text-primary h-5 w-5" />
        Audience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light dark:text-gray-200">Gender</p>
          <p className="text-base md:text-lg">{creator?.profile?.gender  || "Not Available"}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light dark:text-gray-200">
            Which country they have most from
          </p>
          <p className="text-base md:text-lg">{creator?.profile?.audience?.audienceLocations.join(", ") || "Not Available"}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light dark:text-gray-200">
            What languages they speak
          </p>
          <p className="text-base md:text-lg">
            {creator?.profile?.languages?.join(", ") || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorAudience;
