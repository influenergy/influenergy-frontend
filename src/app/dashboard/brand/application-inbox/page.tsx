"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Target, Package, Loader2, Megaphone, Calendar, Search, Briefcase, CircleCheckBig, CircleX, Clock } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NewCampaignButton from "@/components/brand/NewCampaignButton";

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
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
    const [applications, setApplications] = useState<any[]>([]);
    const [loadingApps, setLoadingApps] = useState(false);


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


    useEffect(() => {
        if (!selectedCampaignId) {
            setApplications([]);
            return;
        }

        const fetchApplications = async () => {
            try {
                setLoadingApps(true);

                const response = await postApi.getCollabByCampaignId(selectedCampaignId);
                // or better naming:
                // getCollaborationsByCampaignId(selectedCampaignId)

                if (!response?.status) {
                    throw new Error("Failed to fetch applications");
                }
                console.log("text-->", response.collaborations);

                setApplications(response.collaborations || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingApps(false);
            }
        };

        fetchApplications();
    }, [selectedCampaignId]);


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

    const handleCampaignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignId(e.target.value);
    };    

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

                    <NewCampaignButton />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Select Campaign
                    </label>

                    <select
                        value={selectedCampaignId}
                        onChange={handleCampaignSelect}
                        className="w-full max-w-md px-4 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">-- Select a campaign --</option>

                        {campaigns.map((campaign) => (
                            <option key={campaign._id} value={campaign._id}>
                                {campaign.campaignTitle}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Applications Section */}
                {loadingApps ? (
                    <p className="text-sm text-muted-foreground mt-4">
                        Loading applications...
                    </p>
                ) : applications.length > 0 ? (
                    <div className="mt-6 space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                onClick={() =>
                                    router.push(`/dashboard/brand/creators/${app.creatorId._id}`)
                                }
                                className="
  flex justify-between gap-6
  border rounded-lg p-5
  bg-white dark:bg-background
  border-border
  shadow-sm dark:shadow-none
  cursor-pointer
  hover:shadow-md hover:border-primary/40
  dark:hover:bg-muted/50
  transition
"
                            >

                                {/* Left section */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {app.creatorId.fullName}
                                    </h3>


                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>
                                            {app.creatorId.profile?.socialLinks?.primary?.followers || 0} followers
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {app.creatorId.profile?.category?.[0] || "N/A"}
                                        </span>
                                    </div>

                                    {app.coverMessage && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {app.coverMessage}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {/* Shortlist */}
                                        <button
                                            className="
            flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            rounded-md
            bg-blue-600 text-white
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition
        "
                                        >
                                            <Clock className="w-4 h-4" />
                                            Shortlist
                                        </button>

                                        {/* Send Offer */}
                                        <button
                                            className="
            flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            rounded-md
            bg-primary text-white
            hover:bg-primary/90
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
            transition
        "
                                        >
                                            <CircleCheckBig className="w-4 h-4" />
                                            Send Offer
                                        </button>

                                        {/* Reject */}
                                        <button
                                            className="
            flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            rounded-md
            bg-red-600 text-white
            hover:bg-red-700
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            transition
        "
                                        >
                                            <CircleX className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>

                                </div>

                                {/* Right section */}
                                <div className="flex flex-col items-end justify-between">
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full ${app.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : app.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 flex flex-col items-center justify-center text-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                            <Briefcase className="w-6 h-6 text-primary" />
                        </div>

                        <p className="text-sm font-medium text-foreground">
                            No applications yet
                        </p>

                        <p className="text-sm text-muted-foreground max-w-sm">
                            Creators haven’t applied to this campaign yet.
                            Once they do, their applications will appear here.
                        </p>
                    </div>

                )}


            </div>
        </div>
    );
};

export default MyCampaignsPage;
