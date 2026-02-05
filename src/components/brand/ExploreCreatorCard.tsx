"use client";

import Image from "next/image";
import {
    Heart,
    Share2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/tiktok";
import {
    Instagram,
    Youtube,
    Twitter,
    Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";


interface CreatorCardProps {
    creator: any;
    isExpanded?: boolean;
    isActive?: boolean;
    someActive?: boolean;
    showFavoriteIcon?: boolean,
    level?: any;
    badgePrice?: string;
    onToggleBio?: () => void;
    onToggleFavorite?: () => void;
    onInvite?: () => void;
    isToggling?: boolean;
    showInviteButton?: boolean;
    similarity?: number;
}

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};


export const getSocialMediaIcon = (platform?: string) => {
    if (!platform) return <Share2 className="w-5 h-5" />;

    const normalized = platform.toLowerCase().trim();

    switch (normalized) {
        case "instagram":
            return <Instagram className="w-5 h-5 text-pink-500" />;

        case "youtube":
        case "youtube reel":
            return <Youtube className="w-5 h-5 text-red-500" />;

        case "twitter":
        case "twitter / x":
        case "x":
            return <Twitter className="w-5 h-5 text-black" />;

        case "newsletter":
        case "email":
            return <Mail className="w-5 h-5 text-gray-600" />;

        case "tiktok":
            return <TikTokIcon size={20} />;

        default:
            return <Share2 className="w-5 h-5 text-gray-400" />;
    }
};




const ExploreCreatorCard = ({
    creator,
    isExpanded = false,
    isActive = false,
    someActive = false,
    showFavoriteIcon = true,
    level,
    badgePrice,
    onToggleBio,
    onToggleFavorite,
    onInvite,
    isToggling,
    showInviteButton = true,
    similarity,
}: CreatorCardProps) => {
    const isLongDescription =
        (creator.profile?.aboutYourself?.length || 0) > 120;

    const router = useRouter();

    const handleCardClick = (creatorId: string) => {
        router.push(`/dashboard/brand/creators/${creatorId}`);
    };


    const matchPercentage =
        typeof similarity === "number"
            ? Math.round(similarity * 100)
            : null;


    return (
        <Card onClick={() => handleCardClick(creator._id)}
            className={`
    flex flex-col bg-white rounded-2xl border shadow-sm
    transition-all duration-300 cursor-pointer
    
  `}
        >
            {/* IMAGE */}
            <div className="relative p-3">
                <Image
                    src={creator.profileIcon || "/default-avatar.png"}
                    alt={creator.fullName}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-xl bg-gray-100"
                />

                {/* MATCH PERCENTAGE (LEFT) */}
                {matchPercentage !== null && (
                    <div className="absolute top-4 left-4 z-10 
      bg-primary text-white text-xs font-semibold 
      px-2 py-1 rounded-full shadow">
                        {matchPercentage}% Match
                    </div>
                )}

                {/* FAVORITE ICON (RIGHT) */}
                {showFavoriteIcon && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite?.();
                        }}
                        className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-1 shadow"
                    >
                        <Heart
                            className={`w-6 h-6 ${creator?.isFavorite
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-500"
                                }`}
                        />
                    </button>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-4 px-4 pb-4">
                {/* NAME + SOCIALS */}
                <div className="flex items-start justify-between">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                        {creator.profile.fullName}
                    </h3>

                    <div className="flex gap-3 text-gray-500">
                        {creator.profile?.socialLinks?.primary?.platform && (
                            <a
                                href={creator.profile.socialLinks.primary.link}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {getSocialMediaIcon(
                                    creator.profile.socialLinks.primary.platform
                                )}
                            </a>
                        )}

                        {creator.profile?.socialLinks?.secondary?.platform && (
                            <a
                                href={creator.profile.socialLinks.secondary.link}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {getSocialMediaIcon(
                                    creator.profile.socialLinks.secondary.platform
                                )}
                            </a>
                        )}
                    </div>
                </div>

                {/* META */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    {creator.profile?.socialLinks?.primary?.followers && (
                        <span>
                            {creator.profile.socialLinks.primary.followers} followers
                        </span>
                    )}

                    {creator.profile?.city && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {creator.profile.city}
                        </span>
                    )}

                    {creator.profile?.dob && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {calculateAge(creator.profile.dob)} yrs
                        </span>
                    )}
                </div>

                {/* NICHES (PRIMARY COLOR) */}
                {creator.profile?.category?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {creator.profile.category.slice(0, 2).map((c: string, idx: number) => (
                            <span
                                key={idx}
                                className="text-xs px-3 py-1 rounded-full
                       bg-primary/10 text-primary font-medium"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                )}

                {/* BIO */}
                {creator.profile?.aboutYourself && (
                    <div>
                        <p className={`text-sm text-gray-600 ${isExpanded ? "" : "line-clamp-2"}`}>
                            {creator.profile.aboutYourself}
                        </p>

                        {isLongDescription && (
                            <button
                                onClick={() => handleCardClick(creator._id)}
                                className="text-xs text-primary mt-1 hover:underline"
                            >
                                {isExpanded ? "View less" : "View more"}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ACTION */}
            {showInviteButton && (
                <div className="px-4 pb-4 mt-auto">
                    <Button size="sm" className="w-full" onClick={(e) => {
                        e.stopPropagation();
                        onInvite?.();
                    }}>
                        Invite for Campaign
                    </Button>
                </div>
            )}
        </Card>

    );
};

export default ExploreCreatorCard;
