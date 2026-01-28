"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { postApi } from "@/services/postServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "./Loader";
import CreatorCard from "./CreatorCards";
import { useAcceptOrDeclineVideo } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { useInitiatePayment } from "@/hooks/usePayment";
import StatusModal from "./StatusModal";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

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
  // const [loadingApps, setLoadingApps] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();

  const isActiveTab = searchParams.get("tab") === "active";

  // const [applications, setApplications] = useState<Application[]>([]);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState("All");


  const { mutateAsync: initiatePayment, isPending } = useInitiatePayment();


  const {
    data: campaigns = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["campaigns", "Waiting Approval"],
    queryFn: () => postApi.getCollabByStatus("Waiting Approval"),
    select: (res) => res.campaigns || []
  });


  const STATUS_OPTIONS = [
    "All",
    "Waiting Approval",
    "Interested",
    "Offered",
    "Offer Accepted",
    "Active",
    "Completed",
    "Rejected",
  ];


  const {
    data: applications = [],
    isFetching: loadingApps
  } = useQuery({
    queryKey: ["applications", selectedCampaignId],
    queryFn: () =>
      postApi.getCollabByCampaignIdForBrand(selectedCampaignId),
    enabled: !!selectedCampaignId,
    select: (res) => res.collaborations || []
  });


  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(campaigns[0].campaignId);
    }
  }, [campaigns, selectedCampaignId]);


  const { mutate: handleApproveVideo, isPending: isApproving } =
    useAcceptOrDeclineVideo({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
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
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
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

  // const handleCampaignSelect = (campaignId: string) => {
  //   router.push(`/dashboard/brand/application-inbox/${campaignId}`);
  // };

  const handleCampaignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampaignId(e.target.value);
  };

  const hasSelectedCampaign = Boolean(selectedCampaignId);

  const filteredApplications = applications.filter((app: Application) => {
    if (selectedStatus === "All") return true;
    return app.status === selectedStatus;
  });

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
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to complete collaboration. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

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

        {applications.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 items-end">
            {/* Campaign Selector */}
            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium mb-2">
                Select Campaign
              </label>

              <select
                value={selectedCampaignId}
                onChange={handleCampaignSelect}
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {campaigns.map((campaign: any) => (
                  <option key={campaign._id} value={campaign.campaignId}>
                    {campaign.campaignTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div className="w-[220px]">
              <label className="block text-sm font-medium mb-2">
                Filter by Status
              </label>

              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}


        {/* Campaign Cards */}
        {filteredApplications.length === 0 ? (
          /* CAMPAIGN SELECTED BUT NO DATA */
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No applications received yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Applications from creators will appear here once they apply to this campaign.</p>
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
          <div className="mt-6 space-y-4">
            {filteredApplications.map((app: Application) => (
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
                isActiveCollaboration={false}
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
