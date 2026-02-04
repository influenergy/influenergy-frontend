// src/pages/ExploreCreators.tsx
"use client";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { userApi } from "@/services/userServices";
import {
    SlidersHorizontal,
    X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToggleFavorite } from "@/hooks/usePost";
import SkeletonCard from "@/components/Skeletons/ExploreCreatorsSkeleton";
import TikTokIcon from "@/components/icons/tiktok";
import NewCampaignButton from "@/components/brand/NewCampaignButton";
import InviteCreatorModal from "@/components/brand/InviteCreatorModal";
import ExploreCreatorCard from "@/components/brand/ExploreCreatorCard";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useFindAiCampaign } from "@/hooks/useFindAi";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

// Filters data
const FollowerRanges = [
    "Less than 1,000",
    "1,000 - 10,000",
    "10,000 - 100,000",
    "100,000 - 1,000,000",
    "More than 1,000,000",
];

const Platforms = ["Instagram", "TikTok", "Youtube",];

const Niches = ["AI",
    "Lifestyle & Vlogging",
    "Fashion & Beauty",
    "Health, Fitness & Wellness",
    "Food & Beverages",
    "Technology & Gadgets",
    "Gaming & Esports",
    "Finance & Business",
    "Education & Learning",
    "Travel & Hospitality",
    "Entertainment & Media",
    "Home, Decor & DIY",
    "Parenting & Family",
    "Automobile & Mobility",
    "Sports & Outdoor",
    "Pets & Animals",
    "E-commerce & Product Reviews",
    "Sustainability & Social Impact",
    "B2B & Professional Content",
    "Others",];

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
        budgetVideo?: string;
    };
};

type CreatorAPIResponse = {
    creatorId: string;
    similarity: number;
    creator: Creator;
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

    const searchParams = useSearchParams();
    const sortFromUrl = searchParams.get("sort") || "";
    const campaignId = searchParams.get("698333b7c66629f52be61b95") || "";
    const router = useRouter();

    const [filters, setFilters] = useState({
        sort: sortFromUrl,
        platform: "",
        followers: "",
        niche: "",
    });

    // Fetch AI-matched creators if campaignId is present
    const {
        data: aiCreatorsData,
        isLoading: isLoadingAI,
        isError: isErrorAI,
    } = useFindAiCampaign(
        campaignId as string,
        localStorage.getItem("selected-creator-campaign") || "",
    );

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
    };

    const clearFilters = () => {
        setPlatforms([]);
        setNiches([]);
        setFollowers([]);
    };

    const queryClient = useQueryClient();

    const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite({
        filters: filters,
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
        enabled: !campaignId, // Only fetch regular creators if no campaignId
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
        const newSort = sort === filters.sort ? "" : sort;

        setFilters((prev) => ({ ...prev, sort: newSort }));

        if (newSort) {
            router.replace(`/dashboard/brand/explore?sort=${newSort}`);
        } else {
            router.replace(`/dashboard/brand/explore`);
        }

        refetch();
    };

    const handleSelecteCreatorForCampaign = (creatorId: string) => {
        setSelectedCreator(creatorId);
        setInviteModal(true);
    };

    const selectedFiltersCount = platforms.length + niches.length + followers.length;

    // Extract AI creators data
    const matchedCreators: CreatorAPIResponse[] = aiCreatorsData?.data?.matchedCreators || [];
    const favCreators: CreatorAPIResponse[] = aiCreatorsData?.data?.favoriteCreators || [];
    const selectedCreatorData: CreatorAPIResponse = aiCreatorsData?.data?.selectedCreator || null;
    const featuredCreators: CreatorAPIResponse[] = aiCreatorsData?.data?.featuredCreators || [];

    // Show loading state
    if (campaignId && isLoadingAI) return <SkeletonCard />;
    if (!campaignId && status === "pending") return <SkeletonCard />;
    if (status === "error" || (campaignId && isErrorAI)) return <p>Failed to load creators</p>;

    // Check if we have creators to show
    const hasCreators = campaignId
        ? matchedCreators.length > 0
        : data?.pages?.some((page) => page.creators && page.creators.length > 0);

    // Render AI Creator Card
    const renderAICreatorCard = (data: CreatorAPIResponse, showMatchPercentage = true) => {
        const badge = data?.creator?.badge;
        const level = Levels.find((l) => l.key === badge);

        return (
            <div
                key={data?.creatorId}
                className="bg-white dark:bg-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
                <div className="relative w-full pt-[60%]">
                    <Image
                        src={data?.creator?.profileIcon || "/images/placeholder.png"}
                        alt={data?.creator?.fullName}
                        fill
                        className="absolute top-0 left-0 object-cover"
                    />
                    {badge && level && (
                        <div className="absolute top-1 left-1 w-10 h-10">
                            <Image src={level.img} alt={level.text} fill className="object-contain" />
                        </div>
                    )}
                    {showMatchPercentage && (
                        <div className="absolute top-0 right-1 bg-primary px-2 rounded-xl">
                            <span className="text-sm text-white">
                                Matched {Math.round(data?.similarity * 100)}%
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col p-3 sm:p-4 flex-grow dark:bg-gray-300">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-col justify-start items-start w-1/2">
                            <div className="flex items-center gap-1 w-full">
                                <p className="text-sm sm:text-base font-semibold truncate max-w-[90%] dark:text-black">
                                    {data?.creator?.fullName}
                                </p>
                                <MdVerified className="text-blue-500 h-4 w-4 flex-shrink-0" />
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm truncate w-full dark:text-black">
                                {data?.creator?.profile?.category?.[0] || "No category"}
                            </p>
                        </div>

                        <div className="flex flex-col items-end w-1/2">
                            <p className="text-gray-800 font-semibold text-right text-xs sm:text-sm dark:text-black">
                                {data?.creator?.profile?.socialLinks?.primary?.followers || "0"}
                            </p>
                            <p className="text-xs sm:text-sm dark:text-black">Followers</p>
                        </div>
                    </div>

                    <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full" />

                    <div className="flex items-center mt-2 space-x-2 min-h-[1.5rem]">
                        {data?.creator?.profile?.socialLinks?.primary?.platform && (
                            <Link
                                className="text-xs text-primary truncate max-w-[45%]"
                                href={data?.creator?.profile?.socialLinks?.primary?.link || "#"}
                                title={data?.creator?.profile?.socialLinks?.primary?.platform}
                            >
                                {data?.creator?.profile?.socialLinks?.primary?.platform}
                            </Link>
                        )}

                        {data?.creator?.profile?.socialLinks?.primary?.platform &&
                            data?.creator?.profile?.socialLinks?.secondary?.platform && (
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                            )}

                        {data?.creator?.profile?.socialLinks?.secondary?.platform && (
                            <Link
                                className="text-xs text-primary truncate max-w-[45%]"
                                href={data?.creator?.profile?.socialLinks?.secondary?.link || "#"}
                                title={data?.creator?.profile?.socialLinks?.secondary?.platform}
                            >
                                {data?.creator?.profile?.socialLinks?.secondary?.platform}
                            </Link>
                        )}
                    </div>
                </div>

                <div className="p-3 sm:p-4 pt-0 mt-auto dark:bg-gray-300">
                    <div className="mt-3 sm:mt-4 flex justify-between items-center">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-black">Price Per Video</p>
                        <p className="text-sm sm:text-lg font-bold dark:text-black">
                            ${" "}
                            {data?.creator?.badge
                                ? data?.creator?.badgePrice
                                : data?.creator?.profile?.budgetVideo || "N/A"}
                        </p>
                    </div>
                    <Link
                        href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${
                            data?.creatorId
                        }?similarity=${(data?.similarity * 100).toFixed(2) || 10}`}
                        className="block mt-2 sm:mt-3"
                    >
                        <Button
                            variant="outline"
                            className="w-full bg-primary text-white border border-primary hover:text-primary dark:hover:bg-gray-300 hover:bg-white text-xs sm:text-sm py-1 sm:py-2"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="relative p-6">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">
                    {campaignId ? "AI-Matched Creators" : "AI-Find"}
                </h1>
                <NewCampaignButton />
            </div>

            {/* Filter Options - Only show if not using AI match */}
            {!campaignId && (
                <div>
                    {/* Add your filter UI here */}
                </div>
            )}

            {/* AI-Matched Creators Sections */}
            {campaignId && (
                <>
                    {/* Selected Creator */}
                    {selectedCreatorData?.creatorId && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Selected Creator</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {renderAICreatorCard(selectedCreatorData, false)}
                            </div>
                        </div>
                    )}

                    {/* Favorite Creators */}
                    {favCreators.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 border rounded-lg p-2 w-fit">
                                Favorite Creators
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {favCreators.map((creator) => renderAICreatorCard(creator))}
                            </div>
                        </div>
                    )}

                    {/* Featured Creators */}
                    {featuredCreators.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 border rounded-lg p-2 w-fit">
                                Featured Creators
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {featuredCreators.map((creator) => renderAICreatorCard(creator))}
                            </div>
                        </div>
                    )}

                    {/* Matched Creators */}
                    <h2 className="text-2xl font-bold mb-4 border rounded-lg p-2 w-fit">
                        All Matched Creators
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {matchedCreators.map((creator) => renderAICreatorCard(creator))}
                    </div>
                </>
            )}

            {/* Regular Creator Grid - Only show if not using AI match */}
            {!campaignId && (
                <>
                    {!hasCreators ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-lg font-semibold text-gray-700">No creators found</p>
                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                Try adjusting your filters or removing some selections to see more creators.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data?.pages.flatMap((page) =>
                                page.creators
                                    ? page.creators.map((creator: Creator) => {
                                          const isExpanded = expanded[creator._id] || false;
                                          const badge = creator.badge;
                                          const level = Levels.find((l) => l.key === badge);
                                          const badgePrice = creator.badgePrice || "";

                                          return (
                                              <ExploreCreatorCard
                                                  key={creator._id}
                                                  creator={creator}
                                                  isExpanded={isExpanded}
                                                  isActive={activeCardId === creator._id}
                                                  someActive={!!activeCardId}
                                                  level={level}
                                                  badgePrice={badgePrice}
                                                  isToggling={isToggling}
                                                  onToggleBio={() => toggleBio(creator._id)}
                                                  onToggleFavorite={() =>
                                                      toggleFavorite({ creatorId: creator._id })
                                                  }
                                                  onInvite={() =>
                                                      handleSelecteCreatorForCampaign(creator._id)
                                                  }
                                              />
                                          );
                                      })
                                    : null
                            )}
                        </div>
                    )}

                    {/* Load More */}
                    <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-4">
                        {isFetchingNextPage && <p>Loading more...</p>}
                    </div>
                </>
            )}

            {inviteModal && selectedCreator && (
                <InviteCreatorModal
                    creatorId={selectedCreator}
                    onClose={() => setInviteModal(false)}
                />
            )}
        </div>
    );
}