"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { postApi } from "@/services/postServices";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import CreatorCard from "./CreatorCards";
import { useAcceptOrDeclineVideo } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { useInitiatePayment } from "@/hooks/usePayment";
import StatusModal from "./StatusModal";

interface CreatorProfile {
    socialLinks?: {
        primary?: {
            followers?: number;
        };
    };
    category?: string[];
}

interface Creator {
    _id: string;
    fullName: string;
    profile?: CreatorProfile;
}

interface Video {
    _id: string;
    link: string;
    timestamp: string;
    status: "Approved" | "Declined" | "Pending" | "Waiting Approval";
    message?: string | null;
    deliverableType: string;
}

interface Application {
    _id: string;
    creatorId: Creator;
    campaignId: Campaign;
    coverMessage?: string;
    videos?: Video[];
    status: "Pending" | "Shortlisted" | "Offered" | "Rejected" | "Active" | "Completed" | "Interested" | "Payment" | "Waiting Approval";
}

interface Campaign {
    _id: string;
    campaignTitle: string;
    campaignImage: string;
    budgetForCampaign: string;
    expectedDeliverables?: string[];
}

export default function ApplicationsReceived() {
    const router = useRouter();

    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
    const params = useParams();
    const searchParams = useSearchParams();
    const campaignIdFromUrl = searchParams.get("campaignId");


    const isActiveTab = true;

    // const [applications, setApplications] = useState<Application[]>([]);
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();


    const { mutateAsync: initiatePayment, isPending } = useInitiatePayment();

    const {
        data: campaigns = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ["campaigns", "Active"],
        queryFn: () => postApi.getCollabByStatus("Active"),
        select: (res) => res.campaigns || []
    });

    const {
        data: applications = [],
        isFetching: loadingApps
    } = useQuery({
        queryKey: ["applications", selectedCampaignId],
        queryFn: () =>
            postApi.getCollabByCampaignIdForBrand(selectedCampaignId, "Active"),
        enabled: !!selectedCampaignId,
        select: (res) => res.collaborations || []
    });


    useEffect(() => {
        // Priority 1: campaignId from URL
        if (campaignIdFromUrl) {
            setSelectedCampaignId(campaignIdFromUrl);
            return;
        }

        // Priority 2: fallback to first campaign
        if (campaigns.length > 0 && !selectedCampaignId) {
            setSelectedCampaignId(campaigns[0].campaignId);
        }
    }, [campaignIdFromUrl, campaigns]);


    useEffect(() => {
        if (campaignIdFromUrl && selectedCampaignId) {
            router.replace("/dashboard/brand/application-inbox?tab=active");
        }
    }, [selectedCampaignId]);




    const { mutate: handleApproveVideo, isPending: isApproving } =
        useAcceptOrDeclineVideo({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["campaigns", "Active"] });
                queryClient.invalidateQueries({ queryKey: ["applications", selectedCampaignId] });
                setSuccessMessage("Video approved successfully!");
            },
        });

    const approveVideo = (collaborationId: string, videoId: string) => {
        handleApproveVideo({
            collaborationId,
            videoId,
            status: "Approved",
            message: "Approved"
        });
    };

    const { mutate: handleDeclineVideo, isPending: isDeclining } =
        useAcceptOrDeclineVideo({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["campaigns", "Active"] });
                queryClient.invalidateQueries({ queryKey: ["applications", selectedCampaignId] });
                setSuccessMessage("Video revision requested!");
            },
        });

    const requestVideoChanges = (
        collaborationId: string,
        videoId: string,
        message: string
    ) => {
        handleDeclineVideo({
            collaborationId,
            videoId,
            status: "Declined",
            message,
        });
    };

    const handleCampaignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignId(e.target.value);
    };

    const hasSelectedCampaign = Boolean(selectedCampaignId);

    const handlePayNow = async (application: Application) => {
        try {
            setActionLoadingId(application._id);

            const response = await initiatePayment({
                campaignId: application.campaignId._id || "",
                amount: application.campaignId.budgetForCampaign || "0",
                creatorId: application.creatorId._id,
                collaborationId: application._id,
            });

            if (response?.url) {
                window.location.href = response.url;
            }
        } catch (err) {
            console.error("Payment failed:", err);
            setErrorMessage("Payment initiation failed. Please try again.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleStatusChange = async (
        applicationId: string,
        nextStatus: "Interested" | "Offered" | "Rejected" | "Payment"
    ) => {
        try {
            setActionLoadingId(applicationId);

            await postApi.changeCollaborationStatus(applicationId, nextStatus);

            queryClient.invalidateQueries({
                queryKey: ["applications", selectedCampaignId]
            });

            setSuccessMessage(`Status updated to ${nextStatus}`);
            router.push("/dashboard/brand/application-inbox");
        } catch (err: any) {
            console.error(err);
            setErrorMessage("Failed to update status. Please try again.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleCompleteCollaboration = async (collaborationId: string) => {
        try {
            setActionLoadingId(collaborationId);

            const res = await postApi.completeCollaboration(collaborationId);

            if (!res?.status) {
                throw new Error("Completion failed");
            }

            queryClient.invalidateQueries({
                queryKey: ["applications", selectedCampaignId]
            });

            setSuccessMessage("Collaboration completed successfully");
            setSelectedCampaignId("")
            router.push("/dashboard/brand/application-inbox");
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to complete collaboration. Please try again.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const selectedCampaign = campaigns.find(
        (c: any) => c.campaignId === selectedCampaignId
    );

    return (
        <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">

            {isLoading && <Loader />}

            {isError && (
                <div className="text-center py-10">
                    <p className="text-red-500">
                        Something went wrong while fetching data
                    </p>
                </div>
            )}

            <div className="max-w-7xl mx-auto">

                {applications.length > 0 && <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Select Campaign
                    </label>

                    <select
                        value={selectedCampaignId}
                        onChange={handleCampaignSelect}
                        className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {campaigns.map((campaign: any) => (
                            <option key={campaign._id} value={campaign.campaignId}>
                                {campaign.campaignTitle}
                            </option>
                        ))}
                    </select>
                </div>}


                <h3 className="mb-2 text-md font-semibold text-primary">
                    Campaign Details
                </h3>

                {selectedCampaign && (
                    <div className="mb-4 rounded-xl border-2 border-primary bg-white dark:bg-gray-900 shadow-sm">
                        <div className="flex gap-4 p-4">

                            {/* Image */}
                            <div className="w-24 h-24 rounded-md overflow-hidden border bg-gray-100 shrink-0">
                                <img
                                    src={selectedCampaign.campaignImage}
                                    alt={selectedCampaign.campaignTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">

                                {/* Top Row */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                                            {selectedCampaign.campaignTitle}
                                        </h2>
                                        <p className="text-xs text-gray-500 truncate">
                                            {selectedCampaign.brandName}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {selectedCampaign.campaignDescription}
                                </p>

                                {/* Meta */}
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500">Budget:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {selectedCampaign.budgetForCampaign}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500">Platform:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {selectedCampaign.socialPlatforms}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500">Deadline:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {selectedCampaign.deadline}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500">Created:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {new Date(selectedCampaign.campaignCreatedAt).toLocaleDateString("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Campaign Cards - Only show when NOT loading */}
                {!isLoading && (
                    <>
                        {applications.length === 0 ? (
                            /* CAMPAIGN SELECTED BUT NO DATA */
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border">
                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                                    No active collaborations yet
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm">
                                    Active collaborations will appear here once creators accept offers and start working on campaign deliverables.
                                </p>
                            </div>
                        ) : !hasSelectedCampaign ? (
                            /* NO CAMPAIGN SELECTED */
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border">
                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                                    Select a campaign to view collaborations
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm">
                                    Choose a campaign from the dropdown above to see applications or active collaborations.
                                </p>
                            </div>
                        ) : (
                            /* DATA EXISTS */
                            <div className="mt-6 space-y-3">
                                <p className="text-md font-semibold text-primary">
                                    Creator Applications
                                </p>
                                {applications.map((app: Application) => (
                                    <CreatorCard
                                        key={app._id}
                                        creator={app.creatorId}
                                        status={app.status}
                                        coverMessage={app.coverMessage}
                                        onAction={async (nextStatus) => {
                                            if (nextStatus === "Payment") {
                                                await handlePayNow(app);
                                            } else {
                                                await handleStatusChange(app._id, nextStatus);
                                            }
                                        }}
                                        isActiveCollaboration={true}
                                        videos={isActiveTab ? app.videos : undefined}
                                        collaborationId={app._id}
                                        expectedDeliverables={app?.campaignId?.expectedDeliverables || []}
                                        onApproveVideo={approveVideo}
                                        onRequestChanges={requestVideoChanges}
                                        isProcessing={
                                            isApproving ||
                                            isDeclining ||
                                            actionLoadingId === app._id
                                        }
                                        onCompleteCollaboration={handleCompleteCollaboration}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>

            {successMessage && (
                <StatusModal
                    type="success"
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {errorMessage && (
                <StatusModal
                    type="error"
                    message={errorMessage}
                    onClose={() => setErrorMessage(null)}
                />
            )}

        </div>
    );
}
