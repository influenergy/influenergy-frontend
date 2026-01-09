/* eslint-disable */
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { memo, useState } from "react";
import { useRouter } from "next/navigation"; // or "next/router" for pages router
import StatusDialog from "./StatusDialog";
import { Campaign } from "@/types/PostQuestionnaire";
import { postApi } from "@/services/postServices";

export interface CampaignVideo {
  link: string;
  timestamp: string;
  status: "Pending" | "Approved" | "Declined";
  _id: string;
}

export interface CampaignData {
  _id: string;
  brandId?: string;
  brandName?: string;
  campaignTitle: string;
  campaignImage: string;
  collaborationId?: string | null;
  campaignCollaborationStatus?: "Active" | "Inactive" | string;
  collaborationData?: {
    videos: CampaignVideo[];
  };
  collaborations?: string[];
}

const CampaignCard = memo(
  ({
    campaign,
    onFindClick,
    status,
  }: {
    campaign: Campaign;
    onFindClick?: (id: string) => void;
    status: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingApps, setIsLoadingApps] = useState(false);
    const router = useRouter();

    const handleViewApplications = async () => {
      try {
        setIsLoadingApps(true);

        // const response = await postApi.getCollabByCampaignId(campaign.campaignId);

        // if (!response?.status) {
        //   throw new Error("Failed to fetch applications");
        // }

        // Navigate to dynamic route with campaign ID
        router.push(`/dashboard/brand/application-inbox/${campaign._id}`);

        // // Alternative: If you want to pass the applications data to avoid re-fetching
        // // Store in sessionStorage (better than localStorage for temporary data)
        // sessionStorage.setItem('campaignApplications', JSON.stringify({
        //   applications: response.collaborations || [],
        //   timestamp: Date.now()
        // }));

      } catch (error) {
        console.error("Error fetching applications:", error);
        // You might want to show a toast/alert here
        alert("Failed to fetch applications. Please try again.");
      } finally {
        setIsLoadingApps(false);
      }
    };

    return (
      <>
        <div className="md:w-full rounded-xl border bg-white dark:bg-gray-600 shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 text-left">
              {campaign.campaignTitle.length > 50
                ? campaign.campaignTitle.slice(0, 35) + "..."
                : campaign.campaignTitle}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {campaign.brandName}
            </p>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
            <Image
              src={campaign.campaignImage || "/images/placeholder.png"}
              alt={campaign.campaignTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-cover rounded-xl"
            />
          </div>

          {/* Campaign Details */}
          <div className="space-y-2 mb-3">
            {/* Platform & Budget */}
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                {campaign.socialPlatforms}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {campaign.budgetForCampaign}
              </span>
            </div>

            {/* Niche Tags */}
            {campaign.targetNiche && campaign.targetNiche.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {campaign.targetNiche.slice(0, 3).map((niche, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {niche}
                  </span>
                ))}
                {campaign.targetNiche.length > 3 && (
                  <span className="text-xs px-2 py-0.5 text-gray-500 dark:text-gray-400">
                    +{campaign.targetNiche.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Deadline */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
            </div>

            {/* Deliverables Count */}
            {campaign.expectedDeliverables && campaign.expectedDeliverables.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {campaign.expectedDeliverables.length} deliverable{campaign.expectedDeliverables.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Buttons */}
          {status === "Initial" && (
            <Button
              className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2"
              onClick={() => onFindClick && onFindClick(campaign?._id)}
            >
              AI Find <Sparkles className="h-5 w-5 sm:h-7 sm:w-7" />
            </Button>
          )}

          {status === "Pending" && (
            <Button
              className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2"
              onClick={handleViewApplications}
              disabled={isLoadingApps}
            >
              {isLoadingApps ? "Loading..." : "View Applications"}
            </Button>
          )}

          {status === "Shortlisted" && (
            <Button className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2">
              Send Offer
            </Button>
          )}

          {status === "Completed" && (
            <Button className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2">
              Completed Collaboration
            </Button>
          )}

          {status === "Active" && (
            <Button
              className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              Check Status
            </Button>
          )}
        </div>

        {/* {isOpen && campaign.collaborationId && (
          <StatusDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            campaign={campaign as any}
            status={status}
          />
        )} */}
      </>
    );
  }
);

CampaignCard.displayName = "CampaignCard";

export default CampaignCard;