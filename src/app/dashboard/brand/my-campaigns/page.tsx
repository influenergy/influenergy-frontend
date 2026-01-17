"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Target, Package, Loader2, Megaphone, Calendar, Search, Briefcase, CheckCircle2, XCircle, X } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NewCampaignButton from "@/components/brand/NewCampaignButton";
import CampaignSkeleton from "@/components/Skeletons/CampaignSkeleton";
import ErrorState from "@/components/common/ErrorState";

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

const MyCampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const [modal, setModal] = useState<Modal>({
        open: false,
        type: 'success',
        message: ''
    });

    const router = useRouter();
    const pathname = usePathname();


    // Fetch campaigns
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await postApi.getCampaigns();

                if (!response || !response.status) {
                    throw new Error("Failed to fetch campaigns");
                }

                setCampaigns(response.campaigns || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);


    const handleCampaignAction = async (status: string, campaignId: string) => {
        if (status === "PUBLISHED") {
            router.push(`/dashboard/brand/posts/${campaignId}`);
        } else {
            // Publish the draft campaign
            try {
                setUpdatingId(campaignId);
                setUpdatingStatus("PUBLISHED");

                await postApi.changeCampaignStatus(campaignId, "PUBLISHED");

                // Update local state
                setCampaigns(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign._id === campaignId
                            ? { ...campaign, status: "PUBLISHED" }
                            : campaign
                    )
                );

                setModal({
                    open: true,
                    type: "success",
                    message: "Campaign published successfully!",
                });
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || error?.message || "Failed to publish campaign. Please try again.";
                setModal({
                    open: true,
                    type: "error",
                    message: errorMessage,
                });
            } finally {
                setUpdatingId(null);
                setUpdatingStatus(null);
            }
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
    if (loading) {
        return (
            <div className="w-full h-full p-[2%] dark:bg-background">
                <div className="max-w-7xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="mb-6 space-y-2 animate-pulse">
                        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-80 bg-gray-200 dark:bg-gray-600 rounded" />
                    </div>

                    {/* Search Skeleton */}
                    <div className="mb-6">
                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                    </div>

                    {/* Campaign Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CampaignSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <ErrorState
                title="Failed to load campaigns"
                description={error}
                onRetry={() => window.location.reload()}
                fullPage
            />
        );
    }

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                className={`w-full py-3 rounded-lg font-medium transition-colors ${modal.type === 'success'
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
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

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>

                    
                </div>

                {/* Empty State */}
                {filteredCampaigns.length === 0 ? (
                    <div className="flex flex-col items-center gap-7 py-12">
                        <Briefcase className="text-primary h-10 w-10" />
                        <div className="text-center">
                            <h2 className="text-lg font-medium mb-2">
                                {searchQuery ? "No campaigns found" : "You Haven't Created Any Campaigns Yet"}
                            </h2>
                            <p className="text-muted-foreground mb-6 text-md">
                                {searchQuery
                                    ? "Try adjusting your search to find what you're looking for"
                                    : "Start your first campaign to attract the right creators and kick-off your brand's growth"
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Campaign Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCampaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                className="border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow dark:border-gray-700 flex flex-col"
                            >
                                <div className="flex justify-end mb-3">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${campaign.status === "PUBLISHED"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : campaign.status === "DRAFT"
                                                    ? "bg-[#FEF9C2] text-[#A65F00] dark:bg-[#FEF9C2] dark:text-[#A65F00]"
                                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                            }`}
                                    >
                                        {campaign.status}
                                    </span>
                                </div>

                                <div className="flex gap-5 mb-3">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                        {campaign.campaignImage ? (
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
                                        <h3 className="text-md font-medium mb-2 line-clamp-1 text-black dark:text-white">
                                            {campaign.campaignTitle}
                                        </h3>

                                        <h4 className="text-xs font-medium mb-2 line-clamp-1 text-[#364153] dark:text-gray-400">
                                            {campaign.brandName}
                                        </h4>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-[#364153] dark:text-gray-400">
                                    {campaign.campaignDescription}
                                </p>

                                <div className="flex items-center gap-2 text-sm mb-2 text-[#364153] dark:text-gray-400">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    {campaign.budgetForCampaign}
                                </div>

                                <div className="flex items-center gap-2 text-sm mb-2 text-[#364153] dark:text-gray-400">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {"Due: Open for a month"}
                                </div>

                                {/* Niches */}
                                {campaign.targetNiche?.length > 0 && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                        <div className="flex flex-wrap gap-1 text-[#364153]">
                                            {campaign.targetNiche.slice(0, 2).map((niche, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-sm py-1 rounded-full dark:text-gray-400"
                                                >
                                                    {niche}
                                                </span>
                                            ))}
                                            {campaign.targetNiche.length > 2 && (
                                                <span className="text-sm py-1 rounded-full dark:text-gray-400">
                                                    +{campaign.targetNiche.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Deliverables */}
                                {campaign.expectedDeliverables?.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-[#364153] dark:text-gray-400 text-muted-foreground mb-3">
                                        <Package className="w-4 h-4 flex-shrink-0 text-primary" />
                                        <span className="line-clamp-1">
                                            {campaign.expectedDeliverables.join(", ")}
                                        </span>
                                    </div>
                                )}

                                {/* Spacer to push button to bottom */}
                                <div className="flex-grow"></div>

                                {/* Footer */}
                                <div className="mt-4 pt-4">
                                    <Button
                                        className="w-full"
                                        onClick={() => handleCampaignAction(campaign.status, campaign._id)}
                                        disabled={updatingId === campaign._id}
                                    >
                                        {updatingId === campaign._id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Publishing...
                                            </>
                                        ) : (
                                            campaign.status === "PUBLISHED" ? "View Details" : "Publish"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCampaignsPage;