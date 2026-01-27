"use client";

import {
  DollarSign,
  Target,
  Package,
  Calendar,
  Megaphone,
  Loader2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { postApi } from "@/services/postServices";
import { useRouter } from "next/navigation";


interface CampaignCardProps {
  campaign: any;
  isUpdating?: boolean;
  onActionClick: (status: string, campaignId: string) => void;
  actionLabel?: {
    published: string;
    draft: string;
  };
  displayStatus?: string;
  user: string;
}

const CampaignCard = ({
  campaign,
  isUpdating = false,
  onActionClick,
  actionLabel = {
    published: "View Details",
    draft: "Publish",
  },
  displayStatus,
  user,
}: CampaignCardProps) => {

  const statusToShow = displayStatus ?? campaign.status;
  const router = useRouter();

  return (
    <div className="border border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow dark:border-gray-700 flex flex-col cursor-pointer" onClick={() =>
      router.push(`/dashboard/brand/posts/${campaign._id}`)
    }>
      {/* Status + Actions */}
      <div className="flex justify-end items-center gap-2 mb-3 relative">
        <span
          className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${statusToShow === "Ongoing"
              ? "bg-green-100 text-green-700"
              : statusToShow === "PUBLISHED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-200 text-yellow-700"
            }
    `}
        >
          {statusToShow}
        </span>

        {/* 3-dot menu */}
        {(statusToShow !== "DRAFT" && statusToShow !== "UNPUBLISHED" && user !== "creator") && <div className="relative group">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>

          {/* Tooltip / Dropdown */}
          <div className="absolute right-0 top-6 z-10 hidden group-hover:block">
            <div className="bg-white border border-gray-200 rounded-md shadow-md w-32">
              <button
                onClick={() =>
                  onActionClick("CLOSED", campaign._id)
                }
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                Unpublish
              </button>
            </div>
          </div>
        </div>}
      </div>


      {/* Header */}
      <div className="flex gap-5 mb-3">
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          {campaign.campaignImage ? (
            <img
              src={campaign.campaignImage}
              alt={campaign.campaignTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-md font-medium mb-1 line-clamp-1">
            {campaign.campaignTitle}
          </h3>
          <h4 className="text-xs text-muted-foreground line-clamp-1">
            {campaign.brandName}
          </h4>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {campaign.campaignDescription}
      </p>

      {/* Budget */}
      <div className="flex items-center gap-2 text-sm mb-2 text-muted-foreground">
        <DollarSign className="w-4 h-4 text-primary" />
        {campaign.budgetForCampaign}
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm mb-2 text-muted-foreground">
        <Calendar className="w-4 h-4 text-primary" />
        {campaign.deadline}
      </div>

      {/* Niches */}
      {campaign.targetNiche?.length > 0 && (
        <div className="flex items-start gap-2 mb-3 text-sm text-muted-foreground">
          <Target className="w-4 h-4 mt-0.5 text-primary" />
          <div className="flex flex-wrap gap-1">
            {campaign.targetNiche.slice(0, 2).map((niche: string, idx: number) => (
              <span key={idx}>{niche}</span>
            ))}
            {campaign.targetNiche.length > 2 && (
              <span>+{campaign.targetNiche.length - 2}</span>
            )}
          </div>
        </div>
      )}

      {/* Deliverables */}
      {campaign.expectedDeliverables?.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Package className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">
            {campaign.expectedDeliverables.join(", ")}
          </span>
        </div>
      )}

      <div className="flex-grow" />

      {/* Footer */}
      <div className="mt-4 pt-4">
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation(); // 🚨 THIS IS THE KEY
            onActionClick(campaign.status, campaign._id);
          }}
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : campaign.status === "PUBLISHED" ? (
            actionLabel.published
          ) : (
            actionLabel.draft
          )}
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
