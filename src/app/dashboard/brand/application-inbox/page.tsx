"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Target, Package, Loader2, Megaphone, Calendar, Search, Briefcase, CircleCheckBig, CircleX, Clock } from 'lucide-react';
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NewCampaignButton from "@/components/brand/NewCampaignButton";
import Page from "../findai/page";
import { CampaignManagerGridSkeleton } from "@/components/Skeletons/CampaignManagerGridSkeleton";
import ErrorState from "@/components/common/ErrorState";

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

    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const [modal, setModal] = useState<{
        open: boolean;
        type: "success" | "error";
        message: string;
    } | null>(null);



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

                setApplications(response.collaborations || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingApps(false);
            }
        };

        fetchApplications();
    }, [selectedCampaignId]);

    const handleStatus = async (status: string, collaborationId: string) => {
        try {
            setUpdatingId(collaborationId);
            setUpdatingStatus(status);

            await postApi.changeCollaborationStatus(collaborationId, status);

            setModal({
                open: true,
                type: "success",
                message:
                    status === "Offered"
                        ? "Offer sent successfully."
                        : status === "Rejected"
                            ? "Application rejected successfully."
                            : "Status updated successfully.",
            });
        } catch (error) {
            setModal({
                open: true,
                type: "error",
                message: "Something went wrong while updating the status. Please try again.",
            });
        } finally {
            setUpdatingId(null);
            setUpdatingStatus(null);
        }
    };


    // Loading state
    if (loading) {
        return (
            <div className="w-full mt-5 sm:mt-8 mb-5 md:mb-10">
                <CampaignManagerGridSkeleton count={6} />
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

    const handleCampaignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignId(e.target.value);
    };

    const statusStyles: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-700",
        Shortlisted: "bg-blue-100 text-blue-700",
        Active: "bg-green-100 text-green-700",
        Completed: "bg-purple-100 text-purple-700",
        Offered: "bg-indigo-100 text-indigo-700",
        Rejected: "bg-red-100 text-red-700",
    };


    return (
        <div className="w-full h-full p-[2%] dark:bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold mb-2">Collaboartion Manager</h1>
                        <p className="text-muted-foreground text-md">
                            Review and manage creator applications
                        </p>
                    </div>

                    <NewCampaignButton />
                </div>

                {/* <div className="mb-6">
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
                </div> */}

                <Page />

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
                                        {/* PENDING → all buttons */}
                                        {app.status === "Pending" && (
                                            <>
                                                {/* Shortlist */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatus("Shortlisted", app._id);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    Shortlist
                                                </button>

                                                {/* Send Offer */}
                                                <button
                                                    disabled={updatingId === app._id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatus("Offered", app._id);
                                                    }}
                                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
    ${updatingId === app._id ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}
    text-white transition`}
                                                >
                                                    {updatingId === app._id && updatingStatus === "Offered" ? (
                                                        <>Sending offer…</>
                                                    ) : (
                                                        <>
                                                            <CircleCheckBig className="w-4 h-4" />
                                                            Send Offer
                                                        </>
                                                    )}
                                                </button>


                                                {/* Reject */}
                                                <button
                                                    disabled={updatingId === app._id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatus("Rejected", app._id);
                                                    }}
                                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
    ${updatingId === app._id ? "bg-red-500/70 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
    text-white transition`}
                                                >
                                                    {updatingId === app._id && updatingStatus === "Rejected" ? (
                                                        <>Rejecting…</>
                                                    ) : (
                                                        <>
                                                            <CircleX className="w-4 h-4" />
                                                            Reject
                                                        </>
                                                    )}
                                                </button>

                                            </>
                                        )}

                                        {/* SHORTLISTED → only Offer + Reject */}
                                        {app.status === "Shortlisted" && (
                                            <>
                                                {/* Send Offer */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatus("Offered", app._id);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition"
                                                >
                                                    <CircleCheckBig className="w-4 h-4" />
                                                    Send Offer
                                                </button>

                                                {/* Reject */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatus("Rejected", app._id);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                                                >
                                                    <CircleX className="w-4 h-4" />
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {/* REJECTED → no buttons */}
                                        {app.status === "Rejected" && null}

                                        {/* OFFERED / ACTIVE / COMPLETED → blank for now */}
                                        {["Offered", "Active", "Completed"].includes(app.status) && null}
                                    </div>


                                </div>

                                {/* Right section */}
                                <div className="flex flex-col items-end justify-between">
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[app.status] || "bg-gray-100 text-gray-700"
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
                        {/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                            <Briefcase className="w-6 h-6 text-primary" />
                        </div>

                        <p className="text-sm font-medium text-foreground">
                            No applications yet
                        </p>

                        <p className="text-sm text-muted-foreground max-w-sm">
                            Creators haven’t applied to this campaign yet.
                            Once they do, their applications will appear here.
                        </p> */}
                    </div>

                )}


            </div>

            {modal?.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-background rounded-lg p-6 w-full max-w-sm shadow-lg">
                        <h3
                            className={`text-lg font-semibold mb-2 ${modal.type === "success" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {modal.type === "success" ? "Success" : "Error"}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                            {modal.message}
                        </p>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setModal(null)}
                                className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary/90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyCampaignsPage;
