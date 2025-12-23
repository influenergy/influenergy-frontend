"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";


interface Campaign {
    _id: string;
    campaignTitle: string;
    campaignDescription: string;
    targetNiche: string[];
    budgetForCampaign: string;
    expectedDeliverables: string[];
    applicationQuestions?: string;
    status: string;
    brandId: string;
    createdAt: string;
    updatedAt: string;
}

const MyCampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const pathname = usePathname();


    // Fetch campaigns
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await postApi.getCampaigns();
                console.log("Campaign response:", response);

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
            <div className="w-full min-h-[400px] flex items-center justify-center dark:bg-background">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                        Loading campaigns...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full p-[2%] dark:bg-background">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-destructive mb-2">
                            Error Loading Campaigns
                        </h3>
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Campaigns</h1>
                        <p className="text-muted-foreground">
                            Manage and view all your campaigns
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            const basePath = pathname.split("/").slice(0, -1).join("/");
                            router.push(`${basePath}/create-campaign`);
                        }}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
                    >
                        <span className="text-lg">+</span>
                        New Campaign
                    </button>
                </div>

                {/* Empty State */}
                {campaigns.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-2">No Campaigns Yet</h2>
                        <p className="text-muted-foreground mb-6">
                            Create your first campaign to get started
                        </p>
                    </div>
                ) : (
                    /* Campaign Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                onClick={() =>
                                    (window.location.href = `/dashboard/brand/posts/${campaign._id}`)
                                }
                                className="border rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow dark:border-gray-700"
                            >
                                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                                    {campaign.campaignTitle}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {campaign.campaignDescription}
                                </p>

                                <div className="text-sm font-medium text-primary mb-2">
                                    {campaign.budgetForCampaign}
                                </div>

                                {/* Niches */}
                                {campaign.targetNiche?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {campaign.targetNiche.slice(0, 2).map((niche, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 bg-secondary text-black rounded-full"
                                            >
                                                {niche}
                                            </span>
                                        ))}
                                        {campaign.targetNiche.length > 2 && (
                                            <span className="text-xs px-2 py-1 bg-secondary text-black rounded-full">
                                                +{campaign.targetNiche.length - 2}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Deliverables */}
                                {campaign.expectedDeliverables?.length > 0 && (
                                    <div className="text-xs text-muted-foreground mb-3">
                                        📦 {campaign.expectedDeliverables.join(", ")}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${campaign.status === "PUBLISHED"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : campaign.status === "DRAFT"
                                                ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                            }`}
                                    >
                                        {campaign.status}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {new Date(campaign.createdAt).toLocaleDateString()}
                                    </span>
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
