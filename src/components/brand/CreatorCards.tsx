"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Instagram, Youtube, MapPin } from "lucide-react";


interface Creator {
  _id: string;
  fullName: string;
  profile?: {
    profilePicture?: string;
    bio?: string;
    category?: string[];
    location?: string;
    socialLinks?: {
      primary?: {
        platform?: string;
        followers?: number;
        username?: string;
      };
    };
  };
}

interface Collaboration {
  _id: string;
  collaborationId: string;
  creatorId: Creator;
  creatorName: string;
  status: string;
  coverMessage?: string;
  createdAt: string;
  profileIcon: string;
  profile?: {
    profileIcon?: string;
    bio?: string;
    category?: string[];
    location?: string;
    socialLinks?: {
      primary?: {
        platform?: string;
        followers?: number;
        username?: string;
      };
    };
  };
}

interface CreatorCardsProps {
  collaborations: Collaboration[];
}

const CreatorCard = ({ collaboration }: { collaboration: Collaboration }) => {
  const router = useRouter();
  const { creatorId, status } = collaboration;
  const [expanded, setExpanded] = useState(false);


  const handleCardClick = () => {
    router.push(
      `/dashboard/brand/creators/${creatorId}?status=${status}&collaborationId=${collaboration.collaborationId
      }`
    );
  };

  const statusStyles: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Shortlisted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Completed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Offered: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const getPlatformIcon = (platform?: string) => {
    if (platform?.toLowerCase() === "instagram") {
      return <Instagram className="w-4 h-4" />;
    }
    if (platform?.toLowerCase() === "youtube") {
      return <Youtube className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  const formatFollowers = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div
      className="group relative bg-white dark:bg-card border border-border rounded-xl overflow-hidden cursor-pointer
             transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
    >
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur
        ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}
        >
          {status}
        </span>
      </div>

      {/* Profile Image */}
      <div className="relative h-52 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center overflow-hidden">
        {collaboration.profileIcon ? (
          <>
            <img
              src={collaboration.profileIcon}
              alt={collaboration.creatorName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </>
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center shadow-inner">
            <User className="w-12 h-12 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground truncate">
          {collaboration.creatorName}
        </h3>

        {/* Category */}
        {collaboration.profile?.category?.[0] && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {collaboration.profile.category[0]}
          </p>
        )}

        {/* Stats */}
        {collaboration.profile?.socialLinks?.primary && (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <div className="flex items-center gap-1.5 text-foreground font-medium">
              {getPlatformIcon(
                collaboration.profile.socialLinks.primary.platform
              )}
              {formatFollowers(
                collaboration.profile.socialLinks.primary.followers
              )}
            </div>
            <span className="text-muted-foreground">followers</span>
          </div>
        )}

        {/* Cover Message */}
        {collaboration.coverMessage && (
          <div className="mt-4 pt-4 border-t border-border">
            <p
              className={`text-xs text-muted-foreground italic leading-relaxed ${expanded ? "" : "line-clamp-2"
                }`}
            >
              “{collaboration.coverMessage}”
            </p>

            {collaboration.coverMessage.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-5">
          <button
            onClick={handleCardClick}
            className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg
                   bg-primary text-white hover:bg-primary/90
                   transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>

  );
};

const CreatorCards: React.FC<CreatorCardsProps> = ({ collaborations }) => {

  if (!collaborations || collaborations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No creators yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Creators will appear here once they apply to your campaigns.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {collaborations.map((collaboration) => (
        <div key={collaboration._id} className="relative">
          <CreatorCard collaboration={collaboration} />
        </div>
      ))}
    </div>
  );
};

export default CreatorCards;