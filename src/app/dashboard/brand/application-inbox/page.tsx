"use client";

import React, { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import { useRouter, usePathname } from "next/navigation";
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

                const response = await postApi.getCampaigns({
                    all: true,
                });
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
                title="Failed to load Collaborations"
                description={error}
                onRetry={() => window.location.reload()}
                fullPage
            />
        );
    }


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
        <div className="pt-[2%] px-[2%] dark:bg-background">
            <div className="">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold mb-2">Collaboration Manager</h1>
                        <p className="text-muted-foreground text-md">
                            Review and manage creator applications
                        </p>
                    </div>

                    <NewCampaignButton />
                </div>

                <Page />

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
