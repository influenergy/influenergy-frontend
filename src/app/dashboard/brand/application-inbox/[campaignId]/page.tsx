"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { postApi } from "@/services/postServices";
import { Button } from "@/components/ui/button";
import { Loader2, CircleCheckBig, CircleX, ArrowLeft } from "lucide-react";
import Image from "next/image";
import CreatorCard from "@/components/brand/CreatorCards";
import { useInitiatePayment } from "@/hooks/usePayment";
import { useAcceptOrDeclineVideo } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import ErrorState from "@/components/common/ErrorState";

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

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const campaignId = params.campaignId as string;

  const isActiveTab = searchParams.get("tab") === "active";

  const [applications, setApplications] = useState<Application[]>([]);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: handleApproveVideo, isPending: isApproving } =
    useAcceptOrDeclineVideo({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        setSuccessMessage("Video approved successfully!");
        fetchApplications();
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
        fetchApplications();
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

  const fetchApplications = async () => {
    if (!campaignId) {
      setError("No campaign ID provided");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const cachedData = sessionStorage.getItem("campaignApplications");
      if (cachedData) {
        const { applications: cachedApps, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setApplications(cachedApps);
          sessionStorage.removeItem("campaignApplications");
          setIsLoading(false);
          return;
        }
      }

      const response = await postApi.getCollabByCampaignIdForBrand(campaignId);

      if (!response?.status) {
        throw new Error("Failed to fetch applications");
      }

      setApplications(response.collaborations || []);

      if (response.campaign) {
        setCampaign(response.campaign);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [campaignId]);

  const { mutateAsync: initiatePayment, isPending } = useInitiatePayment();

  const handleBack = () => {
    router.push("/dashboard/brand/application-inbox");
  };

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

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: nextStatus } : app
        )
      );

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

      setApplications((prev) =>
        prev.map((app) =>
          app._id === collaborationId
            ? { ...app, status: "Completed" }
            : app
        )
      );

      setSuccessMessage("Collaboration completed successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to complete collaboration. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Oops! Something didn’t go as planned"
        description={error}
        fullPage
        onRetry={handleBack}
      />
    );
  }


  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-all duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>

        {campaign && (
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={campaign.campaignImage || "/images/placeholder.png"}
                alt={campaign.campaignTitle}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {campaign.campaignTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {applications.length} {isActiveTab ? "Active Collaboration" : "Application"}
                {applications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {!campaign && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isActiveTab ? "Active Collaborations" : "Campaign Applications"}
          </h1>
        )}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No {isActiveTab ? "active collaborations" : "applications"} found for this campaign.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {isActiveTab
              ? "Active collaborations will appear here once creators start working."
              : "Applications will appear here once influencers apply."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {applications.map((app) => (
            <CreatorCard
              key={app._id}
              creator={app.creatorId}
              status={app.status}
              onAction={async (nextStatus) => {
                if (nextStatus === "Payment") {
                  await handlePayNow(app);
                } else {
                  await handleStatusChange(app._id, nextStatus);
                }
              }}
              isActiveCollaboration={isActiveTab}
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

      {successMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[320px] text-center">
            <CircleCheckBig className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-medium dark:text-white">{successMessage}</p>
            <Button variant="default" className="mt-4 w-full" onClick={() => setSuccessMessage(null)}>
              OK
            </Button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[320px] text-center">
            <CircleX className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
            <Button
              variant="default"
              className="mt-4 w-full"
              onClick={() => setErrorMessage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}