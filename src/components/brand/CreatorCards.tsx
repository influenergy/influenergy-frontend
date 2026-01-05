"use client";

import React from "react";
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
  console.log("datt->", collaboration);

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
      className="group relative bg-white dark:bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/40 dark:hover:bg-muted/50"
    >
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status] || "bg-gray-100 text-gray-700"
            }`}
        >
          {status}
        </span>
      </div>

      {/* Profile Picture */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
        {collaboration.profileIcon ? (
          <img
            src={collaboration.profileIcon}
            alt={collaboration.creatorName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
          {collaboration.creatorName}
        </h3>

        {/* Category */}
        {collaboration.profile?.category?.[0] && (
          <p className="text-sm text-muted-foreground mb-3">
            {collaboration.profile?.category[0]}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3">
          {/* Followers */}
          {collaboration.profile?.socialLinks?.primary && (
            <div className="flex items-center gap-1.5 text-sm">
              {getPlatformIcon(collaboration.profile.socialLinks.primary.platform)}
              <span className="font-medium text-foreground">
                {formatFollowers(collaboration.profile.socialLinks.primary.followers)}
              </span>
              <span className="text-muted-foreground">followers</span>
            </div>
          )}
        </div>

        {/* Location */}
        {/* {collaboration.profile?.location && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{collaboration.profile.location}</span>
          </div>
        )} */}

        {/* Bio */}
        {/* {creatorId.profile?.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {creatorId.profile.bio}
          </p>
        )} */}

        {/* Cover Message */}
        {collaboration.coverMessage && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground italic line-clamp-2">
              "{collaboration.coverMessage}"
            </p>
          </div>
        )}

        {/* View Profile Button */}
        <div className="mt-4">
          <button onClick={handleCardClick} className="w-full py-2 px-4 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const CreatorCards: React.FC<CreatorCardsProps> = ({ collaborations }) => {
  console.log(collaborations);

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