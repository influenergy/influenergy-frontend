// src/pages/ExploreCreators.tsx
"use client";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { userApi } from "@/services/userServices";
import Image from "next/image";
import {
    Instagram,
    Youtube,
    Twitter,
    Facebook,
    Linkedin,
    Mail,
    Share2,
    Heart,
    SlidersHorizontal,
    X,

} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToggleFavorite } from "@/hooks/usePost";
import Link from "next/link";
import SkeletonCard from "@/components/Skeletons/ExploreCreatorsSkeleton";
import TikTokIcon from "@/components/icons/tiktok";
import NewCampaignButton from "@/components/brand/NewCampaignButton";
import InviteCreatorModal from "@/components/brand/InviteCreatorModal";

// Filters data
const FollowerRanges = [
    "Less than 1,000",
    "1,000 - 10,000",
    "10,000 - 100,000",
    "100,000 - 1,000,000",
    "More than 1,000,000",
];

const Platforms = ["Facebook", "Instagram", "LinkedIn", "Newsletter", "Pinterest", "TikTok", "Twitch", "Twitter / X", "Youtube", "Youtube Shorts"];
const Niches = ["AI", "Beauty & Care", "Business & Finance", "Events", "Fashion & Style", "Food & Drinks", "Foodie", "Gaming", "Hair", "Health & Wellness", "Homemade", "Home & Garden", "Jewelry", "Kids & Parenting", "Lifestyle", "Makeup", "Music", "Nutrition", "Outdoors & Nature", "Pet", "Photography", "Restaurants", "Skincare", "Sports & Fitness", "Tech", "Travel", "Yoga"];


const Levels = [
    {
        key: "level_1",
        title: "Level 1 - Rising Creator",
        img: "/bronze-award.svg",
        text: "Unlocked instantly when you join the program.",
        price: "50"
    },
    {
        key: "level_2",
        title: "Level 2 - Active Creator",
        img: "/gold-award.svg",
        text: "Unlock after completing 3 successful collaborations.",
        price: "100"
    },
    {
        key: "level_3",
        title: "Level 3 - Pro Creator",
        img: "/award.svg",
        text: "Unlock after completing 10 successful collaborations.",
        price: "150"
    },
];

// Social media icon resolver
const getSocialMediaIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
        case "instagram":
            return <Instagram className="w-5 h-5" />;
        case "youtube":
        case "youtube reel":
            return <Youtube className="w-5 h-5" />;
        case "twitter":
        case "twitter / x":
            return <Twitter className="w-5 h-5" />;
        case "facebook":
            return <Facebook className="w-5 h-5" />;
        case "linkedin":
            return <Linkedin className="w-5 h-5" />;
        case "newsletter":
            return <Mail className="w-5 h-5" />;
        case "tiktok":
            return <TikTokIcon />;
        default:
            return <Share2 className="w-5 h-5" />;
    }
};

type Creator = {
    _id: string;
    fullName: string;
    profileIcon?: string;
    badge?: string;
    isFavorite: boolean;
    badgePrice?: string;
    profile?: {
        category?: string[];
        aboutYourself: string;
        city: string;
        fullName: string;
        _id: string;
        socialLinks: {
            primary: { platform: string; link: string; followers: string };
            secondary: { platform: string; link: string; followers: string };
        };
        budget: string;
    };
};

type ExploreResponse = {
    page: number;
    total: number;
    totalPages: number;
    creators: Creator[];
};

// API fetch with filters
const fetchCreators = async ({
    pageParam = 1,
    filters,
}: {
    pageParam?: number;
    filters: Record<string, string>;
}): Promise<ExploreResponse> => {
    const res = await userApi.getExploredCreators(pageParam, 12, filters);
    return res;
};

export default function ExploreCreators() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [niches, setNiches] = useState<string[]>([]);
    const [followers, setFollowers] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        sort: "", // "recentlyCollaborated" | "favorites"
        platform: "",
        followers: "",
        niche: "",
    });
    const togglePlatform = (p: string) => {
        setPlatforms((prev) =>
            prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
        );
    };

    const [inviteModal, setInviteModal] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

    const toggleNiche = (n: string) => {
        setNiches((prev) =>
            prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
        );
    };

    const toggleFollowers = (n: string) => {
        setFollowers((prev) =>
            prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
        );
        // console.log(followers, 'followers')
    };

    const clearFilters = () => {
        setPlatforms([]);
        setNiches([]);
        setFollowers([]);
    };
    const queryClient = useQueryClient();

    const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exploreCreators", filters] });
        },
    });

    const toggleBio = (id: string) => {
        const willExpand = !expanded[id];
        if (willExpand) {
            setActiveCardId(id);
            setTimeout(() => {
                setExpanded((prev) => ({ ...prev, [id]: true }));
            }, 150);
        } else {
            setExpanded((prev) => ({ ...prev, [id]: false }));
            setTimeout(() => {
                setActiveCardId((current) => (current === id ? null : current));
            }, 150);
        }
    };

    // Infinite query with filters
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["exploreCreators", filters],
        queryFn: ({ pageParam = 1 }) => fetchCreators({ pageParam, filters }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: ExploreResponse) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });

    // infinite scroll
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
        const node = loadMoreRef.current;
        if (node) observer.observe(node);
        return () => {
            if (node) observer.unobserve(node);
        };
    }, [fetchNextPage, hasNextPage]);

    // filter handlers
    const handleSort = (sort: string) => {
        if (sort === filters.sort) {
            setFilters((prev) => ({ ...prev, sort: "" }))
        }
        else setFilters((prev) => ({ ...prev, sort }));
        refetch();
    };

    if (status === "pending") return <SkeletonCard />;
    if (status === "error") return <p>Failed to load creators</p>;

    const handleSelecteCreatorForCampaign = (creatorId: string) => {
        setSelectedCreator(creatorId);
        setInviteModal(true);
    };

    // console.log(data,'data')
    const selectedFiltersCount = platforms.length + niches.length + followers.length;


    return (
        <div className="relative p-6">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">Explore Creators</h1>
                <NewCampaignButton />
            </div>

            {/* Filter Options */}
            <div className="my-4 space-y-3">
                <div className="lg:flex gap-3 items-center">
                    <div className="relative inline-flex items-center mb-2 lg:mb-0">
                        <Button onClick={() => setIsOpen(true)}>
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter
                        </Button>
                        {selectedFiltersCount > 0 && (
                            <Badge
                                variant="secondary"
                                className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] leading-none"
                            >
                                {selectedFiltersCount}
                            </Badge>
                        )}
                    </div>

                    <div className="flex gap-3 items-center pl-3 border-l-2">
                        <p>Sort:</p>
                        <div className="flex gap-3 md:space-x-0 md:space-y-0 items-center flex-wrap">
                            <Button
                                onClick={() => handleSort("recentlyCollaborated")}
                                className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filters.sort === "recentlyCollaborated"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-300 text-gray-500"
                                    }`}
                            >
                                Recently Collaborated
                            </Button>
                            <Button
                                onClick={() => handleSort("favorites")}
                                className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filters.sort === "favorites"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-300 text-gray-500"
                                    }`}
                            >
                                Favorites
                            </Button>
                            <Button
                                onClick={() => handleSort("featured")}
                                className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filters.sort === "featured"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-300 text-gray-500"
                                    }`}
                            >
                                Featured
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <>
                    {/* Overlay to capture outside clicks */}
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-0 left-0 w-72 bg-white shadow-lg z-50 p-4 overflow-y-auto dark:text-black rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filter</h2>
                            <button onClick={() => setIsOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Platforms */}
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">Select Platform</h3>
                            <div className="h-40 overflow-auto">

                                {Platforms.map((p) => (
                                    <label key={p} className="block">
                                        <input
                                            type="checkbox"
                                            checked={platforms.includes(p)}
                                            onChange={() => togglePlatform(p)}
                                            className="mr-2"
                                        />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Followers range */}
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">Range of Followers</h3>
                            {FollowerRanges.map((p) => (
                                <label key={p} className="block">
                                    <input
                                        type="checkbox"
                                        checked={followers.includes(p)}
                                        onChange={() => toggleFollowers(p)}
                                        className="mr-2"
                                    />
                                    {p}
                                </label>
                            ))}
                        </div>

                        {/* Niches */}
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">Select Niche</h3>
                            <div className="h-40 overflow-auto">

                                {Niches.map((n) => (
                                    <label key={n} className="block">
                                        <input
                                            type="checkbox"
                                            checked={niches.includes(n)}
                                            onChange={() => toggleNiche(n)}
                                            className="mr-2"
                                        />
                                        {n}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Clear Filter
                            </button>
                            <button
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        platform: platforms.join(","), // send comma-separated
                                        niche: niches.join(","),
                                        followers: followers.join("&"),
                                    });
                                    setIsOpen(false);
                                    refetch();
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Creator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.pages.flatMap((page) =>
                    page.creators.map((creator: Creator) => {
                        const isLongDescription =
                            (creator.profile?.aboutYourself?.length || 0) > 120;
                        const isExpanded = expanded[creator._id] || false;
                        const isActive = activeCardId === creator._id;
                        const someActive = !!activeCardId;
                        const badge = creator.badge
                        const level = Levels.filter(l => l.key === badge)[0]
                        const badgePrice = creator.badgePrice || ""
                        // console.log(badgePrice, 'badgePrice')
                        return (
                            <Card
                                key={creator._id}
                                className={`flex flex-col items-stretch p-2 pt-0  gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow transition-all duration-300 ${isActive
                                    ? "scale-105 ring-2 ring-primary z-20"
                                    : someActive
                                        ? "opacity-40"
                                        : "hover:scale-105"
                                    }`}
                            >
                                <div className="relative w-full p-2">
                                    <Image
                                        width={300}
                                        height={200}
                                        src={creator.profileIcon || "/default-avatar.png"}
                                        alt={creator.fullName}
                                        className="w-full h-40 object-contain rounded-xl mb-2"
                                    />

                                    {/* Budget badge */}
                                    {creator.profile?.budget && (
                                        <span className="absolute top-1 right-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                            {badgePrice ? badgePrice : creator.profile.budget} $
                                        </span>
                                    )}
                                    {level && (
                                        <div className="absolute top-1 left-1 w-8 h-8">
                                            <Image src={level.img} alt={level.text} fill
                                                className="object-contain" />
                                        </div>
                                    )}
                                </div>

                                {/* IMAGE */}

                                {/* CONTENT */}
                                <div className="flex flex-col gap-3">
                                    {/* NAME + SOCIALS */}
                                    <div className="flex w-full justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                                            {creator.fullName}
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

                                    <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>
                                            {creator.profile?.socialLinks?.primary?.followers} followers
                                        </span>
                                        {creator.profile?.socialLinks?.secondary?.followers && creator.profile?.socialLinks?.secondary?.link && (
                                            <span>
                                                {creator.profile.socialLinks.secondary.followers} followers
                                            </span>
                                        )}
                                    </div>

                                    {/* CATEGORIES */}
                                    <div className="flex gap-2 flex-wrap">
                                        {Array.isArray(creator?.profile?.category) &&
                                            creator.profile.category.slice(0, 2).map((c, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs p-1 bg-gray-300 rounded-lg dark:text-black"
                                                >
                                                    {c}
                                                </span>
                                            ))}
                                    </div>

                                    {badge && <div className="flex gap-2 flex-wrap items-center">
                                        <div className="w-5 h-5 relative">

                                            <Image src={level.img} alt={level.text} fill
                                                className="object-contain" />
                                        </div>

                                        <p>{level.title.split("-")[1]}</p>
                                    </div>}

                                    {/* BIO */}
                                    <div>
                                        <h4 className="font-semibold">Bio</h4>
                                        <p
                                            className={`text-gray-700 dark:text-gray-200 text-sm leading-snug ${isExpanded ? "" : "line-clamp-2"
                                                }`}
                                        >
                                            {creator.profile?.aboutYourself}
                                        </p>
                                        {isLongDescription && (
                                            <button
                                                onClick={() => toggleBio(creator._id)}
                                                className="text-blue-500 hover:underline text-xs mt-1"
                                            >
                                                {isExpanded ? "View Less" : "View More"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center justify-between mt-auto">

                                    <Button className="bg-primary px-5 py-2 rounded-xl" onClick={() =>
                                        handleSelecteCreatorForCampaign(creator._id)}>
                                        Invite for a Campaign
                                    </Button>

                                    <span
                                        className="border rounded-md p-3 cursor-pointer"
                                        onClick={() =>
                                            toggleFavorite({ creatorId: creator._id })
                                        }
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${creator.isFavorite
                                                ? "text-red-500 fill-red-500"
                                                : "text-gray-600"
                                                } ${isToggling ? "animate-pulse" : ""}`}
                                        />
                                    </span>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Load More */}
            <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-4">
                {isFetchingNextPage && <p>Loading more...</p>}
            </div>

            {inviteModal && selectedCreator && (
                <InviteCreatorModal
                    creatorId={selectedCreator}
                    onClose={() => setInviteModal(false)}
                />

            )}

        </div>
    );
}
