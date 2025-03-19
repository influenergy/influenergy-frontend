import React from "react";
import { User } from "lucide-react";
import { UserProfile } from "@/types/CreatorDetails";

const CreatorProfile = ({ creator }: UserProfile) => {
  const creatorsProfile = creator;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex gap-2 items-center">
        <User className="text-primary h-5 w-5" />
        Creator&apos;s Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md p-4">
        <div>
          <p className="text-xs md:text-sm font-light text-gray-600">
            Do they consider themselves as UGC Creator or Influencer?
          </p>
          <p className="text-base md:text-lg">
            {creatorsProfile?.profile?.type || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Creator&apos;s Full Name
          </p>
          <p className="text-base md:text-lg">
            {creatorsProfile?.fullName || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            What is their preferred Name
          </p>
          <p className="text-base md:text-lg">
            {creatorsProfile?.profile?.stageName || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
