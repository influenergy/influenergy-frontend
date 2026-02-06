"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Collaboration } from "@/types/Collaboration";
import { Button } from "../ui/button";
import { CollaborationContractModal } from "../ui/ContractModal";
import { useState } from "react";
import {
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Share2,
  CircleCheckBig,
  DollarSign,
  Calendar,
  Loader2,
} from "lucide-react";
import { Campaign, CampaignDetails } from "@/types/PostQuestionnaire";
import TikTokIcon from "@/components/icons/tiktok";

interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: string;
  handleDecline: () => void;
  handleAccept: () => void;
  isAccepting: boolean;
  isDeclining: boolean;
  data: Collaboration;
}


const getSocialMediaIcon = (platform?: string) => {
  if (!platform) return <Share2 className="w-5 h-5" />;

  const normalized = platform.toLowerCase().trim();

  switch (normalized) {
    case "instagram":
      return <Instagram className="w-5 h-5 text-pink-500" />;

    case "youtube":
    case "youtube reel":
      return <Youtube className="w-5 h-5 text-red-500" />;

    case "twitter":
    case "twitter / x":
    case "x":
      return <Twitter className="w-5 h-5 text-black" />;

    case "newsletter":
    case "email":
      return <Mail className="w-5 h-5 text-gray-600" />;

    case "tiktok":
      return <TikTokIcon size={20} />;

    default:
      return <Share2 className="w-5 h-5 text-gray-400" />;
  }
};

export default function DetailsModal({
  open,
  onOpenChange,
  status,
  handleAccept,
  handleDecline,
  isAccepting,
  isDeclining,
  data,
}: DetailsModalProps) {
  const campaign = data.campaignId || {};
  const collaborationId = data?._id;

  const [contractModalOpen, setContractModalOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-screen flex flex-col p-0 dark:bg-background">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Campaign Details</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-6">
              <Image
                src={campaign.campaignImage || "/images/placeholder.png"}
                alt="Campaign Image"
                width={550}
                height={350}
                className="object-cover aspect-[16/9] rounded-lg"
              />

              <div className="space-y-3">
                <h2 className="text-2xl font-bold dark:text-white">
                  {campaign.campaignTitle || "Campaign Title"}
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {campaign.brandName || "Brand"}
                </p>
              </div>
            </div>

            <hr />

            {/* Description */}
            <section>
              <h3 className="font-semibold mb-1">Campaign Description</h3>
              <p className="text-gray-600">{campaign.campaignDescription}</p>
            </section>

            <hr />

            {/* Target Niche */}
            <section>
              <h3 className="font-semibold mb-2">Target Niche</h3>
              <div className="flex flex-wrap gap-2">
                {campaign.targetNiche && campaign.targetNiche.map((niche: any, i: any) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600 dark:bg-background"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </section>

            <hr />

            {/* Platforms */}
            <div className="p-4 border rounded-xl space-y-5">
              <div className="flex items-center gap-3">
                {getSocialMediaIcon(campaign.socialPlatforms)}
                <div>
                  <p className="text-xs text-gray-500 ">Platform</p>
                  <p className="font-semibold">{campaign.socialPlatforms}</p>
                </div>
              </div>

              {campaign.expectedDeliverables && campaign.expectedDeliverables.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Expected Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.expectedDeliverables.map((item: any, i: any) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/* Budget & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-xl flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="font-semibold">{campaign.budgetForCampaign}</p>
                </div>
              </div>

              <div className="p-4 border rounded-xl flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="font-semibold">{campaign.deadline}</p>
                </div>
              </div>
            </div>

            <hr />

            {/* Requirements */}
            {campaign.requirements && campaign.requirements?.length > 0 && (
              <section>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {campaign.requirements.map((req: any, i: any) => (
                    <li key={i} className="flex gap-2 text-gray-600">
                      <CircleCheckBig className="w-5 h-5 text-green-600 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Application Questions */}
            {campaign.applicationQuestions && (
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Application Questions
                </h4>
                <p className="text-gray-600">
                  {campaign.applicationQuestions}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {status === "Offered" && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">

            {/* Status text */}
            {(isAccepting || isDeclining) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isAccepting ? "Accepting offer..." : "Rejecting offer..."}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => setContractModalOpen(true)}
                disabled={isAccepting || isDeclining}
              >
                {isAccepting ? "Accepting..." : "Accept"}
              </Button>

              <Button
                variant="outline"
                onClick={handleDecline}
                disabled={isDeclining || isAccepting}
              >
                {isDeclining ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </div>
        )}


        <CollaborationContractModal
          isOpen={contractModalOpen}
          onClose={() => setContractModalOpen(false)}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
          isAccepting={isAccepting}
        />
      </DialogContent>
    </Dialog>
  );
}
