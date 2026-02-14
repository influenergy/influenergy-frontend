"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search, Briefcase, CheckCircle2, XCircle, X } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter } from "next/navigation";
import NewCampaignButton from "@/components/brand/NewCampaignButton";
import CampaignSkeleton from "@/components/Skeletons/CampaignSkeleton";
import ErrorState from "@/components/common/ErrorState";
import CampaignCard from "@/components/brand/CampaignCard";
import { useQueryClient } from "@tanstack/react-query";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store";

interface Campaign {
    _id: string;
    campaignImage: string;
    campaignTitle: string
    campaignDescription: string;
    brandName: string;
    targetNiche: string[];
    budgetForCampaign: string;
    expectedDeliverables: string[];
    applicationQuestions?: string;
    status: string;
    brandId: string;
    createdAt: string;
    updatedAt: string;
}

interface Modal {
    open: boolean;
    type: 'success' | 'error';
    message: string;
}


const LIMIT = 6;
const ALL_NICHES = "ALL";

const MyCampaignsPage = () => {
    const user = useAppSelector((state) => state.auth.user);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNiche, setSelectedNiche] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const router = useRouter();

    const queryClient = useQueryClient();


    const [modal, setModal] = useState<Modal>({
        open: false,
        type: 'success',
        message: ''
    });


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500); // ⏳ 500ms debounce

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
        queryKey: [
            "campaigns",
            user?._id,
            debouncedSearch,
            selectedNiche
        ],
        enabled: !!user?._id,
        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            const res = await postApi.getCampaigns({
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
                nextPage: res.hasMore
                    ? (pageParam as number) + 1
                    : undefined,
            };
        },

        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 1000 * 60 * 2,
    });


    // const campaigns =
    //     data?.pages.flatMap((page) => page.campaigns) ?? [];

    /* Infinite scroll */
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



    const handleCampaignAction = async (status: string, campaignId: string) => {
        if (status === "PUBLISHED") {
            router.push(`/dashboard/brand/posts/${campaignId}`);
            return;
        }

        const newStatus = status === "CLOSED" ? "UNPUBLISHED" : "PUBLISHED";

        try {
            setUpdatingId(campaignId);
            setUpdatingStatus(newStatus);

            // 🔥 OPTIMISTIC UI UPDATE
            queryClient.setQueryData(
                ["campaigns", user?._id, debouncedSearch, selectedNiche],
                (oldData: any) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any) => ({
                            ...page,
                            campaigns: page.campaigns.map((campaign: any) =>
                                campaign._id === campaignId
                                    ? { ...campaign, status: newStatus }
                                    : campaign
                            ),
                        })),
                    };
                }
            );


            // 🔁 API call
            await postApi.changeCampaignStatus(campaignId, newStatus);

            setModal({
                open: true,
                type: "success",
                message:
                    newStatus === "PUBLISHED"
                        ? "Campaign published successfully!"
                        : "Campaign unpublished successfully!",
            });
        } catch (error: any) {
            // ❌ ROLLBACK on error
            queryClient.invalidateQueries({
                queryKey: ["campaigns"],
            });

            setModal({
                open: true,
                type: "error",
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to update campaign. Please try again.",
            });
        } finally {
            setUpdatingId(null);
            setUpdatingStatus(null);
        }
    };


    const closeModal = () => {
        setModal({
            open: false,
            type: 'success',
            message: ''
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <CampaignSkeleton />
        );
    }


    // Error state
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


    const filteredCampaigns = data?.pages.flatMap((page) => page.campaigns) ?? [];


    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            {/* Status Modal */}
            {modal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            {modal.type === 'success' ? (
                                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                            ) : (
                                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                    <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {modal.type === 'success' ? 'Success!' : 'Error'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {modal.message}
                            </p>

                            <button
                                onClick={closeModal}
                                className={`w-full py-3 rounded-lg font-medium transition-colors bg-primary text-white hover:bg-primary/90`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-semibold mb-2">My Campaigns</h1>
                        <p className="text-muted-foreground text-md">
                            View all active campaigns on the platform
                        </p>
                    </div>

                    <NewCampaignButton />
                </div>

                <div className="mb-6 flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border rounded-md"
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

                {/* Empty State */}
                {/* Campaign Section */}
                {filteredCampaigns.length === 0 ? (
                    <div className="flex flex-col items-center gap-7 py-12">
                        <Briefcase className="text-primary h-10 w-10" />
                        <div className="text-center">
                            <h2 className="text-lg font-medium mb-2">
                                {searchQuery ? "No campaigns found" : `You haven't created any campaigns yet for ${selectedNiche}`}
                            </h2>
                            <p className="text-muted-foreground mb-6 text-md">
                                {searchQuery
                                    ? "Try adjusting your search"
                                    : "Start your first campaign"
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCampaigns
                            .filter(
                                (campaign): campaign is Campaign =>
                                    Boolean(campaign && campaign._id)
                            )
                            .map((campaign) => (
                                <CampaignCard
                                    key={campaign._id}
                                    campaign={campaign}
                                    isUpdating={updatingId === campaign._id}
                                    onActionClick={handleCampaignAction}
                                    user="brand"
                                />
                            ))}

                    </div>
                )}

                {isFetchingNextPage && (
                    <div className="flex justify-center py-6">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                )}

                <div ref={loadMoreRef} />
            </div>
        </div>
    );
};

export default MyCampaignsPage;