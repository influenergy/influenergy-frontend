{
  /* eslint-disable */
}
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { memo, useState } from "react";
import StatusDialog from "./StatusDialog";

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
  campaignName: string;
  campaignPost: string;
  collaborationId?: string | null;
  campaignCollaborationStatus?: "Active" | "Inactive" | string;
  collaborationData?: {
    videos: CampaignVideo[];
  };
} 
const CampaignCard = memo(
  ({
    campaign,
    onFindClick,
    status,
  }: {
    campaign: CampaignData;
    onFindClick?: (id: string) => void;
    status: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="md:w-full rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2">
          <div className="mb-3">
            <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
              {campaign.campaignName.length > 50
                ? campaign.campaignName.slice(0, 35) + "..."
                : campaign.campaignName}
            </h3>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
            <Image
              src={campaign.campaignPost || "/images/placeholder.png"}
              alt={campaign.campaignName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-cover rounded-xl"
            />
          </div>
          {/* buttons */}

          {status === "Initial" && (
            <Button
              className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2"
              onClick={() => onFindClick && onFindClick(campaign._id)}
            >
              AI Find <Sparkles className="h-5 w-5 sm:h-7 sm:w-7" />
            </Button>
          )}

          {status === "Pending" && (
            <Button className="bg-primary w-full text-sm p-5 flex items-center justify-center gap-2">
              Pending Collaboration
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
        {isOpen && campaign.collaborationId && (
          <StatusDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            campaign={campaign as any}
            status={status}
          />
        )}
      </>
    );
  }
);

CampaignCard.displayName = "CampaignCard";

export default CampaignCard;
