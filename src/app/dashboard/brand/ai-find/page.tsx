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

    const searchParams = useSearchParams();
    const sortFromUrl = searchParams.get("sort") || "";
    const router = useRouter();

    const [filters, setFilters] = useState({
        sort: sortFromUrl, // 👈 key change
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
        filters: filters, // Pass filters here
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
        const newSort = sort === filters.sort ? "" : sort;

        setFilters((prev) => ({ ...prev, sort: newSort }));

        if (newSort) {
            router.replace(`/dashboard/brand/explore?sort=${newSort}`);
        } else {
            router.replace(`/dashboard/brand/explore`);
        }

        refetch();
    };

    if (status === "pending") return <SkeletonCard />;
    if (status === "error") return <p>Failed to load creators</p>;

    const handleSelecteCreatorForCampaign = (creatorId: string) => {
        setSelectedCreator(creatorId);
        setInviteModal(true);
    };

    const selectedFiltersCount = platforms.length + niches.length + followers.length;


    const hasCreators =
        data?.pages?.some(
            (page) => page.creators && page.creators.length > 0
        );


    return (
        <div className="relative p-6">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">AI-Find</h1>
                <NewCampaignButton />
            </div>

            {/* Filter Options */}
            

            {/* Creator Grid */}
            {!hasCreators ? (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-semibold text-gray-700">
                        No creators found
                    </p>

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

            {inviteModal && selectedCreator && (
                <InviteCreatorModal
                    creatorId={selectedCreator}
                    onClose={() => setInviteModal(false)}
                />

            )}

        </div>
    );
}
