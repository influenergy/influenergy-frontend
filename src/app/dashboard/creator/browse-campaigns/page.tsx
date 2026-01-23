"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Target, Package, Loader2, Megaphone, Calendar, Search, Briefcase, Bookmark } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store";

import { Button } from "@/components/ui/button";
import CampaignSkeleton from "@/components/Skeletons/CampaignSkeleton";
import ErrorState from "@/components/common/ErrorState";

interface Campaign {
    _id: string;
    campaignImage: string;
    campaignTitle: string;
    campaignDescription: string;
    brandName: string;
    targetNiche: string[];
    budgetForCampaign: string;
    deadline: string;
    expectedDeliverables: string[];
    applicationQuestions?: string;
    status: string;
    brandId: string;
    applied: string;
    createdAt: string;
    updatedAt: string;
}

const MyCampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const user = useAppSelector((state) => state.auth.user);

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    const [coverMessage, setCoverMessage] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [creatorBudget, setCreatorBudget] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");



    const router = useRouter();
    const pathname = usePathname();


    // Fetch campaigns
    useEffect(() => {
        const fetchCampaigns = async () => {
            if (!user?._id) return;
            try {
                setLoading(true);
                setError(null);

                const response = await postApi.getAllCampaigns();

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

    const handleViewDetails = (campaign: Campaign) => {
        router.push(`/dashboard/creator/posts/${campaign._id}`);
    }

    const getMidAmount = (budget?: string) => {
        if (!budget) return 0;

        // Handle "1200+"
        if (budget.includes("+")) {
            return Number(budget.replace(/[^0-9]/g, ""));
        }

        const numbers = budget.match(/\d+/g)?.map(Number);
        if (!numbers || numbers.length < 2) return 0;

        const [min, max] = numbers;
        return Math.round((min + max) / 2);
    };

    const handleSubmit = async () => {
        if (!selectedCampaign) return;

        const payload = {
            brandId: selectedCampaign.brandId,
            // amount: Number(getMidAmount(selectedCampaign.budgetForCampaign)),
            ...(coverMessage && { coverMessage }),
            ...(creatorBudget && { creatorBudget }),
            // ...(portfolioLink && { portfolioLink }),
        };

        try {
            setSubmitLoading(true);
            setSubmitError("");

            const res = await postApi.createCollaboration(
                selectedCampaign._id,
                payload
            );

            if (!res?.status) {
                throw new Error(res?.message || "Something went wrong");
            }

            // ✅ FIRST: Update the campaigns state to mark this campaign as applied
            setCampaigns(prevCampaigns =>
                prevCampaigns.map(campaign =>
                    campaign._id === selectedCampaign._id
                        ? { ...campaign, applied: "true" }
                        : campaign
                )
            );

            // ✅ SECOND: Update selectedCampaign to reflect the change immediately
            setSelectedCampaign(prev => prev ? { ...prev, applied: "true" } : null);

            // ✅ Close apply modal
            setShowApplyModal(false);
            setCoverMessage("");
            // setPortfolioLink("");
            setCreatorBudget("");

            // ✅ Show success modal
            setShowSuccess(true);

        } catch (err: any) {
            setSubmitError(err.response?.data?.message || err.message);
        } finally {
            setSubmitLoading(false);
        }
    };


    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">Discover Campaigns</h1>
                        <p className="text-muted-foreground text-md">
                            Browse and apply to campaigns that match your niche
                        </p>
                    </div>

                    {/* <button
                        onClick={() => {
                            const basePath = pathname.split("/").slice(0, -1).join("/");
                            router.push(`${basePath}/create-campaign`);
                        }}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                    >
                        <span className="text-lg">+</span>
                        New Campaign
                    </button> */}
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
                            <h2 className="text-lg font-medium mb-2">You Haven’t Created Any Campaigns Yet</h2>
                            <p className="text-muted-foreground mb-6 text-md">
                                Start your first campaign to attract the right creators and kick-off your brand’s growth
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Campaign Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCampaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                // onClick={() =>
                                //     (window.location.href = `/dashboard/creator/posts/${campaign._id}`)
                                // }
                                className="border rounded-lg p-5 hover:shadow-lg transition-shadow dark:border-gray-700 flex flex-col"
                            >
                                {/* <div className="flex justify-end mb-3">
                                    <Bookmark />
                                </div> */}

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
                                    {campaign.deadline}
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
                                {campaign.expectedDeliverables && (
                                    <div className="flex items-center gap-2 text-sm text-[#364153] dark:text-gray-400 mb-3">
                                        <Package className="w-4 h-4 flex-shrink-0 text-primary" />
                                        <span className="line-clamp-1">
                                            {Array.isArray(campaign.expectedDeliverables)
                                                ? campaign.expectedDeliverables.join(", ")
                                                : campaign.expectedDeliverables}
                                        </span>
                                    </div>
                                )}


                                {/* Spacer to push button to bottom */}
                                <div className="flex-grow"></div>

                                {/* Footer */}
                                <div className="mt-4 pt-4 flex justify-between">
                                    <Button className="w-auto" onClick={() => handleViewDetails(campaign)}>
                                        View Details
                                    </Button>
                                    {campaign.applied ? (<span className="text-green-600 font-semibold">Applied</span>
                                    ) : (
                                        <Button
                                            className="w-auto"
                                            onClick={
                                                () => {
                                                    setSelectedCampaign(campaign);
                                                    setShowApplyModal(true);
                                                }
                                            }
                                        >
                                            Apply
                                        </Button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {
                showApplyModal && selectedCampaign && (
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

                                {/* Portfolio */}
                                {/* <input
                                    type="string"
                                    value={creatorBudget}
                                    onChange={(e) => setCreatorBudget(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3 bg-background"
                                    placeholder="tell your expected buget"
                                /> */}

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
                )
            }


            {
                showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white dark:bg-background rounded-xl py-10 px-10 w-full max-w-xl text-center">
                            <p className="text-lg font-semibold mb-2">
                                Application submitted successfully!
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                                The brand will review your application.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="w-full rounded-md bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default MyCampaignsPage;
