// src/pages/ExploreCreators.tsx
"use client";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { userApi } from "@/services/userServices"; // ✅ using your API wrapper
import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToggleFavorite } from "@/hooks/usePost";
import Link from "next/link";
import SkeletonCard from "@/components/Skeletons/ExploreCreatorsSkeleton";





// Helper function to get social media icon based on platform name
const getSocialMediaIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
        case 'instagram':
            return <Instagram className="w-5 h-5" />;
        case 'youtube':
        case 'youtube reel':
            return <Youtube className="w-5 h-5" />;
        case 'twitter':
        case 'twitter / x':
            return <Twitter className="w-5 h-5" />;
        case 'facebook':
            return <Facebook className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
        case 'newsletter':
            return <Mail className="w-5 h-5" />;
        case 'pinterest':
        case 'tiktok':
        case 'twitch':
        default:
            return <Share2 className="w-5 h-5" />;
    }
};

type Creator = {
    _id: string;
    fullName: string;
    profileIcon?: string;
    isFavorite: boolean;
    profile?: {
        category?: string[], aboutYourself: string, city: string, fullName: string, _id: string, socialLinks: {
            primary: {
                platform: string,
                link: string,
                followers: string
            },
            secondary: {
                platform: string,
                link: string,
                followers: string
            }
        }
    };
};

type ExploreResponse = {
    page: number;
    total: number;
    totalPages: number;
    creators: Creator[];
};

const fetchCreators = async ({ pageParam = 1 }: { pageParam?: number }): Promise<ExploreResponse> => {
    const res = await userApi.getExploredCreators(pageParam, 12);
    return res; // { page, total, totalPages, creators }
};

export default function ExploreCreators() {

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const queryClient = useQueryClient();


    const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite({
        onSuccess: () => {
            // Re-fetch creators list after favorite toggle
            queryClient.invalidateQueries({ queryKey: ["exploreCreators"] });
        },
    });
    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["exploreCreators"],
        queryFn: fetchCreators,
        initialPageParam: 1,
        getNextPageParam: (lastPage: ExploreResponse) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });

    // infinite scroll observer
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [fetchNextPage, hasNextPage]);

    if (status === "pending") return <SkeletonCard />;
    if (status === "error") return <p>Failed to load creators</p>;
    const handleSelecteCreatorForCampaign = (creatorId:string)=>{
        console.log(creatorId,'storing in creatorId')
        localStorage.setItem("selected-creator-campaign",creatorId)
    }
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Explore Creators</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.pages.flatMap((page) =>
                    page.creators.map((creator: Creator) => {
                        const isLongDescription =
                            (creator.profile?.aboutYourself?.length || 0) > 120;
                        const isExpanded = expanded[creator._id] || false;

                        return (
                            <Card
                                key={creator._id}
                                className="flex flex-col items-stretch p-2 gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600  dark:text-white shadow hover:scale-105 transition"
                            >
                                {/* IMAGE */}
                                <Image
                                    width={300}
                                    height={200}
                                    src={creator.profileIcon || "/default-avatar.png"}
                                    alt={creator.fullName}
                                    className="w-full h-40 object-cover rounded-xl mb-2"
                                />

                                {/* CONTENT */}
                                <div className="flex flex-col gap-2">
                                    {/* NAME + SOCIALS */}
                                    <div className="flex w-full justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                                            {(() => {
                                                if (!creator.fullName) return "";
                                                const parts = creator.fullName.trim().split(" ");
                                                const firstName = parts[0];
                                                const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";
                                                return `${firstName} ${lastInitial && lastInitial + "."}`;
                                            })()}
                                        </span>
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                            {/* Primary */}
                                            {creator?.profile?.socialLinks?.primary?.platform &&
                                                creator?.profile?.socialLinks?.primary?.link && (
                                                    <a
                                                        href={creator.profile.socialLinks.primary.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-110 transition-transform"
                                                    >
                                                        {getSocialMediaIcon(
                                                            creator.profile.socialLinks.primary.platform
                                                        )}
                                                    </a>
                                                )}
                                            {/* Secondary */}
                                            {creator?.profile?.socialLinks?.secondary?.platform &&
                                                creator?.profile?.socialLinks?.secondary?.link && (
                                                    <a
                                                        href={creator.profile.socialLinks.secondary.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-110 transition-transform"
                                                    >
                                                        {getSocialMediaIcon(
                                                            creator.profile.socialLinks.secondary.platform
                                                        )}
                                                    </a>
                                                )}
                                            {/* Fallback */}
                                            {!creator?.profile?.socialLinks?.primary?.platform &&
                                                !creator?.profile?.socialLinks?.secondary?.platform && (
                                                    <div className="flex items-center gap-1">
                                                        <Share2 className="w-5 h-5" />
                                                        <span className="text-xs text-gray-400">N/A</span>
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                    {/* CATEGORIES + CITY */}
                                    <div className="flex items-start flex-col gap-4 text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            {Array.isArray(creator?.profile?.category) &&
                                                creator.profile.category.slice(0, 2).map((data, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs p-1 bg-gray-300 rounded-lg"
                                                    >
                                                        {data}
                                                    </span>
                                                ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex gap-1 items-center">
                                                <Image
                                                    src="/verified.png"
                                                    alt="Verified"
                                                    width={24}
                                                    height={24}
                                                />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Verified
                                                </span>
                                            </div>
                                            {creator.profile?.city && (
                                                <div className="flex gap-1 items-center">
                                                    <span className="text-sm">📍</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {creator.profile.city}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BIO */}
                                    <div>
                                        <h4 className="font-semibold">Bio</h4>
                                        <p
                                            className={`text-gray-700 dark:text-gray-200 text-sm leading-snug transition-all ${isExpanded ? "" : "line-clamp-2"
                                                }`}
                                        >
                                            {creator.profile?.aboutYourself}
                                        </p>
                                        {isLongDescription && (
                                            <button
                                                onClick={() => toggleExpand(creator._id)}
                                                className="text-blue-500 hover:underline text-xs mt-1"
                                            >
                                                {isExpanded ? "View Less" : "View More"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <Link href="/dashboard/brand/create-post" onClick={()=>handleSelecteCreatorForCampaign(creator._id)}>
                                        <Button className="bg-primary px-5 py-2 rounded-xl">
                                            Create Your Campaign
                                        </Button>
                                    </Link>

                                    <div className="flex justify-end items-center">
                                        <span className="border dark:border-gray-50 rounded-md p-3 group cursor-pointer" onClick={() => {

                                            toggleFavorite({
                                                creatorId: creator._id,
                                            })
                                        }
                                        }>
                                            <Heart
                                                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110
      ${creator.isFavorite ? "text-red-500 fill-red-500" : "text-gray-600 dark:text-gray-50 "}  ${isToggling ? "animate-pulse" : ""}`}
                                            />
                                        </span>

                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Load More */}
            <div
                ref={loadMoreRef}
                className="h-10 flex justify-center items-center mt-4"
            >
                {isFetchingNextPage ? <p>Loading more...</p> : null}
            </div>
        </div>
    );
}
