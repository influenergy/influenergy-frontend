"use client";

import React, { useEffect, useState } from "react";
import {
    DollarSign,
    Target,
    Package,
    Loader2,
    Megaphone,
    Calendar,
    Search,
    Briefcase,
    CircleCheckBig,
} from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

import { Button } from "@/components/ui/button";
import CampaignSkeleton from "@/components/Skeletons/CampaignSkeleton";
import ErrorState from "@/components/common/ErrorState";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApplyCampaign } from "@/hooks/usePost";


const LIMIT = 6;
const ALL_NICHES = "ALL";


const MyCampaignsPage = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNiche, setSelectedNiche] = useState("");
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [coverMessage, setCoverMessage] = useState("");
    const [creatorBudget, setCreatorBudget] = useState("");

    const [submitError, setSubmitError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [brandId, setBrandId] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

    // 👇 Use the custom hook
    const { mutate: applyCampaign, isPending: submitLoading } = useApplyCampaign({
        search: debouncedSearch,
        niche: selectedNiche,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["campaigns", debouncedSearch, selectedNiche],
        enabled: !!user?._id,
        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            const res = await postApi.getAllCampaigns({
                page: pageParam as number,
                limit: LIMIT,
                search: debouncedSearch,
                niche: selectedNiche || undefined,
            });

            if (!res?.status) {
                throw new Error(res?.message || "Failed to fetch campaigns");
            }

            return {
                campaigns: res.campaigns,
                nextPage:
                    res.campaigns.length === LIMIT
                        ? (pageParam as number) + 1
                        : undefined,
            };

        },

        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 1000 * 60 * 2,
    });

    const campaigns =
        data?.pages.flatMap((page) => page.campaigns) ?? [];

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: "300px" }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);


    const handleSubmit = async () => {
        if (!selectedCampaign) return;

        if (!brandId) {
            setSubmitError("Brand ID is missing");
            return;
        }

        const payload = {
            brandId: brandId,
            ...(coverMessage && { coverMessage }),
            ...(creatorBudget && { creatorBudget }),
        };

        setSubmitError("");

        // 👇 Use the mutate function with optimistic update
        applyCampaign(
            { campaignId: selectedCampaign, payload },
            {
                onSuccess: () => {
                    // ✅ Close apply modal
                    setShowApplyModal(false);
                    setCoverMessage("");
                    setCreatorBudget("");

                    // ✅ Show success modal
                    setShowSuccess(true);
                },
                onError: (err: any) => {
                    setSubmitError(err.response?.data?.message || err.message);
                },
            }
        );
    };


    /* Loading */
    if (isLoading) {
        return (
            <div className="p-[2%]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CampaignSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    /* Error */
    if (isError) {
        return (
            <ErrorState
                title="Failed to load campaigns"
                description={(error as Error).message}
                onRetry={() => window.location.reload()}
                fullPage
            />
        );
    }

    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold mb-2">
                        Discover Campaigns
                    </h1>
                    <p className="text-muted-foreground">
                        Browse and apply to campaigns that match your niche
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6 flex flex-col md:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Niche Select */}
                    <Select
                        value={selectedNiche}
                        onValueChange={(value) =>
                            setSelectedNiche(value === ALL_NICHES ? "" : value)
                        }
                    >
                        <SelectTrigger className="w-full md:w-56">
                            <SelectValue placeholder="Select niche" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={ALL_NICHES}>All Niches</SelectItem>

                            <SelectItem value="AI">AI</SelectItem>
                            <SelectItem value="Lifestyle & Vlogging">Lifestyle & Vlogging</SelectItem>
                            <SelectItem value="Fashion & Beauty">Fashion & Beauty</SelectItem>
                            <SelectItem value="Health, Fitness & Wellness">
                                Health, Fitness & Wellness
                            </SelectItem>
                            <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                            <SelectItem value="Technology & Gadgets">Technology & Gadgets</SelectItem>
                            <SelectItem value="Gaming & Esports">Gaming & Esports</SelectItem>
                            <SelectItem value="Finance & Business">Finance & Business</SelectItem>
                            <SelectItem value="Education & Learning">Education & Learning</SelectItem>
                            <SelectItem value="Travel & Hospitality">Travel & Hospitality</SelectItem>
                            <SelectItem value="Entertainment & Media">Entertainment & Media</SelectItem>
                            <SelectItem value="Home, Decor & DIY">Home, Decor & DIY</SelectItem>
                            <SelectItem value="Parenting & Family">Parenting & Family</SelectItem>
                            <SelectItem value="Automobile & Mobility">Automobile & Mobility</SelectItem>
                            <SelectItem value="Sports & Outdoor">Sports & Outdoor</SelectItem>
                            <SelectItem value="Pets & Animals">Pets & Animals</SelectItem>
                            <SelectItem value="E-commerce & Product Reviews">
                                E-commerce & Product Reviews
                            </SelectItem>
                            <SelectItem value="Sustainability & Social Impact">
                                Sustainability & Social Impact
                            </SelectItem>
                            <SelectItem value="B2B & Professional Content">
                                B2B & Professional Content
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                {/* Empty */}
                {!isLoading && campaigns.length === 0 && (
                    <div className="flex flex-col items-center gap-6 py-12">
                        <Briefcase className="h-10 w-10 text-primary" />
                        <p className="text-muted-foreground">
                            No campaigns found
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                        <p className="text-muted-foreground mb-6 text-md">
                            Try adjusting your search to find what you're looking for
                        </p>
                    </div>
                )}

                {/* Campaign Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className="border rounded-lg p-5 flex flex-col hover:shadow-lg transition"
                        >
                            {/* Header */}
                            <div className="flex gap-4 mb-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    {campaign && campaign.campaignImage ? (
                                        <img
                                            src={campaign.campaignImage}
                                            alt={campaign.campaignTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                            <Megaphone className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium line-clamp-1">
                                        {campaign && campaign.campaignTitle}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {campaign && campaign.brandName}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {campaign && campaign.campaignDescription}
                            </p>

                            <div className="flex items-center gap-2 text-sm mb-2">
                                <DollarSign className="w-4 h-4 text-primary" />
                                {campaign && campaign.budgetForCampaign}
                            </div>

                            <div className="flex items-center gap-2 text-sm mb-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {campaign && campaign.deadline}
                            </div>

                            {campaign && campaign.targetNiche?.length > 0 && (
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="w-4 h-4 text-primary" />
                                    <span className="text-sm">
                                        {campaign.targetNiche.slice(0, 2).join(", ")}
                                        {campaign.targetNiche.length > 2 &&
                                            ` +${campaign.targetNiche.length - 2}`}
                                    </span>
                                </div>
                            )}

                            {campaign && campaign.expectedDeliverables && (
                                <div className="flex items-center gap-2 text-sm mb-3">
                                    <Package className="w-4 h-4 text-primary" />
                                    <span className="line-clamp-1">
                                        {campaign.expectedDeliverables.join(", ")}
                                    </span>
                                </div>
                            )}

                            <div className="flex-grow" />

                            <div className="flex justify-between mt-4 pt-4">
                                <Button
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/creator/posts/${campaign._id}`
                                        )
                                    }
                                >
                                    View Details
                                </Button>

                                {campaign.applied ? (
                                    <span className="text-green-600 font-semibold flex gap-1 text-sm">
                                        <CircleCheckBig/> Applied
                                    </span>
                                ) : (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCampaign(campaign._id);
                                            setBrandId(campaign.brandId);
                                            setShowApplyModal(true);
                                        }}
                                    >
                                        Apply
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={loadMoreRef} />

                {/* Bottom Loader */}
                {isFetchingNextPage && (
                    <div className="flex justify-center py-6 gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <p>Loading more...</p>
                    </div>
                )}
            </div>


            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-background rounded-xl p-6 w-full max-w-lg relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowApplyModal(false)}
                            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-semibold mb-4">
                            Apply to this Campaign
                        </h3>

                        <hr className="mb-4 border-gray-200 dark:border-gray-700" />

                        <section className="space-y-4">
                            {/* Error */}
                            {submitError && (
                                <p className="text-sm text-red-500">{submitError}</p>
                            )}

                            {/* Cover Message */}
                            <textarea
                                rows={4}
                                value={coverMessage}
                                onChange={(e) => setCoverMessage(e.target.value)}
                                className="w-full rounded-xl border px-4 py-3 bg-background"
                                placeholder="Write a short message..."
                            />

                            {/* Submit */}
                            <button
                                disabled={submitLoading}
                                onClick={handleSubmit}
                                className="
                              w-full rounded-md bg-primary py-3
                              text-white font-medium
                              flex items-center justify-center gap-2
                              disabled:opacity-60
                            "
                            >
                                {submitLoading && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                Submit Application
                            </button>
                        </section>
                    </div>
                </div>
            )}


            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-background rounded-xl py-8 px-10 w-full max-w-md text-center">
                        <p className="text-lg font-semibold mb-2">
                            Application submitted successfully!
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            The brand will review your application.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full rounded-md bg-primary py-2 text-sm font-medium text-white mt-5"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCampaignsPage;