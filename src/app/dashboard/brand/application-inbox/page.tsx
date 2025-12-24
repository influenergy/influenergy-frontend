"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Target, Package, Loader2, Megaphone, Calendar, Search, Briefcase } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold mb-2">Campaign Applications</h1>
                        <p className="text-muted-foreground text-md">
                            Review and manage creator applications
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="relative">
                        <h2 className="text-md text-[#0A0A0A] font-regular">Select Campaign</h2>
                    </div>
                </div>

                {/* Empty State */}
                
            </div>
        </div>
    );
};

export default MyCampaignsPage;
