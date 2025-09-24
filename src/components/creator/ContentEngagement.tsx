import React from "react";
import { File } from "lucide-react";
import { UserProfile } from "@/types/CreatorDetails";

const ContentEngagement = ({ creator }: UserProfile) => {
  const contentEngagement = creator.profile;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-900 mt-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <File className="text-primary h-5 w-5" />
        Content and Engagement
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4">
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            What age bracket follows creator the most?
          </p>
          <p className="text-base md:text-lg">
            {contentEngagement?.audience?.ageBracket?.join(" , ") || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            What are the average views of their last 6 videos?
          </p>
          <p className="text-base md:text-lg">
            {contentEngagement?.averageView || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-200">
            Have they worked with AI consumer apps before?
          </p>
          {contentEngagement?.workedWithAIConsumerApps ? (
            <p className="text-base md:text-lg">
              {contentEngagement?.workedWithAIConsumerApps == true
                ? "Yes"
                : "No"}
            </p>
          ) : (
            <p className="text-base md:text-lg">Not Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEngagement;
