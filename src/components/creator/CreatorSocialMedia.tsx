import React from "react";
import { Share2 } from "lucide-react";
import { UserProfile } from "@/types/CreatorDetails";
import Link from "next/link";

const CreatorSocialMedia = ({ creator }:UserProfile) => {
  const { socialLinks } = creator.profile;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex gap-2 items-center">
        <Share2 className="text-primary h-5 w-5" />
        Creator&apos;s Social Media
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4">
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Primary Social Media Platform
          </p>
          <p className="text-base md:text-lg">
            {socialLinks?.primary?.platform || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Primary social media profile link
          </p>
          <Link
            href={socialLinks?.primary?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm md:text-base break-words"
          >
            {socialLinks?.primary?.link || "Not Available"}
          </Link>
        </div>

        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Secondary Social Media Platform
          </p>
          <p className="text-base md:text-lg">{socialLinks?.secondary?.platform || "Not Available"}</p>
        </div>

        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Secondary social media profile link
          </p>
          <Link
            href={socialLinks?.secondary?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm md:text-base break-words"
          >
            {socialLinks?.secondary?.link || "Not Available"}
          </Link>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Primary Social Media Platform Followers
          </p>
          <p className="text-base md:text-lg">
            {socialLinks?.primary?.followers || "Not Available"}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 font-light">
            Secondary Social Media Platform Followers
          </p>
          <p className="text-base md:text-lg">{socialLinks?.secondary?.followers || "Not Available"}</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorSocialMedia;
