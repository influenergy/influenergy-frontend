// src/pages/ExploreCreators.tsx
"use client";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { userApi } from "@/services/userServices";
import {
    Search,
    SlidersHorizontal,
    X,

} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToggleFavorite } from "@/hooks/usePost";
import SkeletonCard from "@/components/Skeletons/ExploreCreatorsSkeleton";
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

type CampaignFilters = {
    sort?: string;
    platform?: string;
    followers?: string;
    niche?: string;
    search?: string;
};

type ToggleFavoriteResponse = {
    added: boolean;
    removed: boolean;
};

// 🔹 Creator inside explore list
type ExploreCreator = {
    _id: string;
    isFavorite: boolean;
    // add more fields if you have them
};

// 🔹 Each page of infinite query
type ExploreCreatorsPage = {
    creators: ExploreCreator[];
};

// 🔹 Full infinite query cache structure
type ExploreCreatorsResponse = {
    pages: ExploreCreatorsPage[];
};


// API fetch with filters
const fetchCreators = async ({
    pageParam = 1,
    filters,
    debouncedSearch
}: {
    pageParam?: number;
    filters: Record<string, string>;
    debouncedSearch: string;
}): Promise<ExploreResponse> => {
    const res = await userApi.getExploredCreators(pageParam, 12, filters, debouncedSearch);
    return res;
};

export default function ExploreCreators() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [niches, setNiches] = useState<string[]>([]);
    const [followers, setFollowers] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const searchParams = useSearchParams();
    const sortFromUrl = searchParams.get("sort") || "";
    const router = useRouter();

    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    const [filters, setFilters] = useState<CampaignFilters>({
        sort: sortFromUrl,
        platform: "",
        followers: "",
        niche: "",
        search: "",
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
        filters: filters,
        debouncedSearch: debouncedSearch, // ✅ Pass it here
        onSuccess: () => {
            console.log("Favorite toggled successfully");
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
        isLoading,      // 👈 first load only
        isFetching,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["exploreCreators", debouncedSearch, filters],
        queryFn: ({ pageParam = 1 }) => fetchCreators({ pageParam, filters, debouncedSearch }),
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


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus({ preventScroll: true });
        }
    }, [data]);


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

    // if (status === "pending") return <SkeletonCard />;
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
        <div className="relative p-6 flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold mb-2">Explore Creators</h1>
                <NewCampaignButton />
            </div>

            <div className="relative w-1/2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search by niche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
  w-full pl-10 pr-4 py-2
  border border-primary
  rounded-md
  focus:outline-none
  focus:ring-0
  focus:border-primary/95
"
                />
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
                            {/* <Button
                                onClick={() => handleSort("featured")}
                                className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filters.sort === "featured"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-300 text-gray-500"
                                    }`}
                            >
                                Featured
                            </Button> */}
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
                            <div className="overflow-auto">

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
                                    <label key={n} className="block text-md">
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

            {isFetching && !isLoading && (
                <p className="text-sm text-muted-foreground">Updating results…</p>
            )}


            {/* Creator Grid */}
            {isLoading ? (
                <SkeletonCard />
            ) : !hasCreators ? (
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
                                        //isToggling={isToggling}
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
