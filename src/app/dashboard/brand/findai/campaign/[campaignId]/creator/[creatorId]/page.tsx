"use client";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { CollaborationConfirmationModal } from "@/components/ui/CollaborationConfirmationModal";
import { CollaborationSuccessModal } from "@/components/ui/CollaborationSuccessModal";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCampaignProfileDetails } from "@/hooks/useFindAi";
import { CollaborationFailedModal } from "@/components/ui/CollaborationFailedModal";
import { useInitiatePayment } from "@/hooks/usePayment";
import { toast } from "@/hooks/use-toast";
import { useGetAISummary } from "@/hooks/useQueryCampaigns";

const CreatorHeader = lazy(() => import("@/components/creator/CreatorHeader"));
const CreatorProfile = lazy(
  () => import("@/components/creator/CreatorProfile")
);
const CreatorAudience = lazy(
  () => import("@/components/creator/CreatorAudience")
);
const CreatorSocialMedia = lazy(
  () => import("@/components/creator/CreatorSocialMedia")
);
const AudienceDetails = lazy(
  () => import("@/components/creator/AudienceDetails")
);
const AudienceInsights = lazy(
  () => import("@/components/creator/AudienceInsights")
);
const ContentEngagement = lazy(
  () => import("@/components/creator/ContentEngagement")
);
const TrendingVideos = lazy(
  () => import("@/components/creator/TrendingVideos")
);
const MatchReason = lazy(() => import("@/components/creator/MatchReason"));

// Loading component
const SectionLoader = () => (
  <div className="w-full flex justify-center items-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const CreatorDetailsPage = () => {
  const { campaignId, creatorId } = useParams();
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const similarity = searchParams.get("similarity");

  // Use React Query hook to fetch creator data
  const {
    data: creator,
    isLoading,
    error,
  } = useCampaignProfileDetails(creatorId as string);

  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch,
  } = useGetAISummary(
    Array.isArray(creatorId) ? creatorId[0] : (creatorId as string),
    Array.isArray(campaignId) ? campaignId[0] : (campaignId as string)
  );

  const { mutateAsync: initiatePayment, isPending } = useInitiatePayment();

  const handleCollaborate = async () => {
    try {
      const response = await initiatePayment({
        campaignId: campaignId as string,
        amount: creator?.profile?.budgetVideo || "0",
        creatorId: creatorId as string,
        similarity: similarity || "",
      });

      // Redirect to Stripe checkout
      if (response?.url) {
        window.location.href = response.url;
        router.replace(response.url);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setFailedModalOpen(true);
    }
  };

  useEffect(() => {
    const paymentStatus = window.location.search?.split("?payment=")[1];

    if (paymentStatus === "done") {
      setSuccessModalOpen(true);
      setAlreadyPaid(true);
      toast({
        title: "Payment Successful",
        description: "You have successfully paid for the collaboration.",
      });
    } else if (paymentStatus === "failed") {
      setFailedModalOpen(true);
      // window.history.replaceState({}, document.title, window.location.pathname);
      toast({
        title: "Payment Failed",
        description: "Your payment for the collaboration has failed.",
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading creator details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500">
            Failed to load creator details. Please try again.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Creator not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Suspense fallback={<SectionLoader />}>
        <CreatorHeader creator={creator} />
      </Suspense>

      <div>
        <Suspense fallback={<SectionLoader />}>
          <CreatorProfile creator={creator} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <CreatorAudience creator={creator} />
        </Suspense>
      </div>

      <Suspense fallback={<SectionLoader />}>
        <CreatorSocialMedia creator={creator} />
      </Suspense>

      <div>
        <Suspense fallback={<SectionLoader />}>
          <AudienceDetails creator={creator} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AudienceInsights creator={creator} />
        </Suspense>
      </div>

      <Suspense fallback={<SectionLoader />}>
        <ContentEngagement creator={creator} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TrendingVideos
          creatorId={Array.isArray(creatorId) ? creatorId[0] : creatorId}
        />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <MatchReason
          value={similarity || ""}
          summary={summary?.data}
          isSummaryLoading={isSummaryLoading}
          summaryError={summaryError}
          refetch={refetch}
        />
      </Suspense>

      {/* Collaborate Button - Fixed to bottom on mobile */}
      {!alreadyPaid && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg md:static md:shadow-none md:border-0 md:bg-transparent md:p-0 md:mt-8 z-10">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white py-6"
            disabled={isPending}
            onClick={handleCollaborate}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Collaborate With This Creator For $${
                creator?.profile?.budgetVideo || 0
              }`
            )}
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      <CollaborationConfirmationModal
        isOpen={confirmationModalOpen}
        onOpenChange={setConfirmationModalOpen}
        onConfirm={handleCollaborate}
        budget={creator?.profile?.budgetVideo || 0}
        isPending={isPending}
      />

      {/* Success Modal */}
      <CollaborationSuccessModal isOpen={successModalOpen} />

      {/* Failed Modal */}
      <CollaborationFailedModal isOpen={failedModalOpen} />

      {/* Spacer for fixed button on mobile */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default CreatorDetailsPage;
