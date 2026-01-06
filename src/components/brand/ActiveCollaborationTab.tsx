import { useState } from "react";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "./Loader";
import { Card } from "../ui/card";
import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2, Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useAcceptOrDeclineVideo } from "@/hooks/usePost";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DetailsModal from "../inbox/DetailsModal";
import { Campaign } from "@/types/PostQuestionnaire";
import { Collaboration } from "@/types/Collaboration";
const getSocialMediaIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'youtube':
    case 'youtube reel':
      return <Youtube className="w-5 h-5" />;
    case 'twitter':
    case 'twitter / x':
      return <Twitter className="w-5 h-5" />;
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />;
    case 'newsletter':
      return <Mail className="w-5 h-5" />;
    case 'pinterest':
    case 'tiktok':
    case 'twitch':
    default:
      return <Share2 className="w-5 h-5" />;
  }
};

interface CollabInterface {
  _id: string,
  campaignTitle: string,
  campaignDescription: string,
  campaignId: string,
  campaignPost: string,
  collaborations: {
    collaborationId: string,
    creatorName: string,
    creatorId: string,
    isFavorite: string,
    profile: {
      socialLinks: {
        primary: {
          followers: string,
          link: string,
          platform: string,
        },
        secondary?: {
          followers: string,
          link: string,
          platform: string,
        }
      },
      category: string[]
    },
    videos: {
      link: string,
      status: string,
      message?: string | null,
      _id: string
    }[]
    profileIcon: string,
    status: string
  }[],
  campaignDetails: Campaign
}

const emptyCollaboration: Collaboration = {
  _id: "",
  brandId: "",
  campaignId: {
    campaignTitle: "",
    campaignImage: "",
    brandName: "",
    campaignDescription: "",
    targetNiche: [],
    socialPlatforms: "", // ✅ string
    expectedDeliverables: [],
    budgetForCampaign: "",
    deadline: "",
    requirements: [],
    applicationQuestions: "",
    status: "DRAFT", // ✅ valid union
  },
  creatorId: "",
  status: "",
  amount: 0,
  videos: [],
  createdAt: "",
  updatedAt: "",
  paymentStatus: "",
  requiredDocuments: "",
};


export default function ActiveCollaborationTab() {

  const { data, isLoading, isError, refetch } = useFindAiCampaignsList("Active");
  const [collabId, setCollabId] = useState("")
  const [videoId, setVideoId] = useState("")
  const [campaignData, setCampaignData] = useState<Collaboration>(emptyCollaboration)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const queryClient = useQueryClient();
  const [isRequestChangesDialogOpen, setRequestChangesDialogOpen] =
    useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const { mutate: handleApproveVideo, isPending: isApproving } =
    useAcceptOrDeclineVideo({
      onSuccess: () => {
        refetch()
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      },
    });

  const { mutate: handleDeclineVideo, isPending: isDeclining } =
    useAcceptOrDeclineVideo({
      onSuccess: () => {
        refetch()
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Something went wrong while fetching data</p>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-6 bg-background">
      {data.campaigns.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-300">
            No active collaborations available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {data.campaigns.map((campaign: CollabInterface, idx: number) => (
            <div key={campaign.campaignId + idx} className="relative flex flex-col">

              {/* Campaign Header */}
              <div className="flex">
                <p className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100
              text-sm md:text-base font-medium
              px-6 py-3 rounded-t-xl
              border border-b-0 border-gray-200 dark:border-gray-600
              shadow-sm">
                  {campaign.campaignTitle}
                </p>
              </div>

              {/* Campaign Body */}
              <div className="-mt-3 bg-white dark:bg-gray-800 
            rounded-xl border border-gray-200 dark:border-gray-600
            shadow-md px-6 py-6 flex flex-col gap-6">

                {/* Campaign Description */}
                <section className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Description */}
                  <div className="flex flex-col gap-2 max-w-3xl">
                    <h2 className="font-semibold text-base md:text-base text-gray-900 dark:text-white">
                      Campaign Description
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {campaign.campaignDescription}
                    </p>
                  </div>

                  {/* View Campaign Button */}
                  <button
                    onClick={() => {
                      const details = campaign.campaignDetails;
                      setCampaignData({
                        _id: "",
                        brandId: details?.brandId ?? "",
                        campaignId: {
                          campaignTitle: details?.campaignTitle ?? "",
                          campaignImage: details?.campaignImage ?? "",
                          brandName: details?.brandName ?? "",
                          campaignDescription: details?.campaignDescription ?? "",
                          targetNiche: Array.isArray(details?.targetNiche) ? details.targetNiche : [],
                          socialPlatforms: details?.socialPlatforms ?? "",
                          expectedDeliverables: Array.isArray(details?.expectedDeliverables)
                            ? details.expectedDeliverables
                            : typeof details?.expectedDeliverables === "string"
                              ? details.expectedDeliverables.split(",").map(i => i.trim())
                              : [],
                          budgetForCampaign: details?.budgetForCampaign ?? "",
                          deadline: details?.deadline ?? "",
                          requirements: Array.isArray(details?.requirements) ? details.requirements : [],
                          applicationQuestions: details?.applicationQuestions ?? "",
                          status:
                            details?.status === "DRAFT" ||
                              details?.status === "PUBLISHED" ||
                              details?.status === "CLOSED"
                              ? details.status
                              : "DRAFT",
                        },
                        creatorId: "",
                        status: "",
                        amount: 0,
                        videos: [],
                        createdAt: "",
                        updatedAt: "",
                        paymentStatus: "",
                        requiredDocuments: "",
                      });
                      setIsDetailsModalOpen(true);
                    }}
                    className="
      text-xs md:text-sm
      px-4 py-2
      rounded-lg
      border border-primary
      text-primary
      bg-primary/5
      hover:bg-primary hover:text-white
      transition-all duration-200
      self-start md:self-center
      whitespace-nowrap
    "
                  >
                    View Campaign
                  </button>
                </section>


                {/* View Campaign Detail */}
                <section className="flex flex-col gap-6">

                  {/* Collaborations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaign.collaborations.map((collab, idx) => (
                      <div key={idx}>

                        {/* Creator Card */}
                        <Card className="flex gap-4 p-4 rounded-xl
                      bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-600
                      shadow-sm hover:shadow-md transition">

                          {/* Image */}
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden
                        border border-gray-200 dark:border-gray-600">
                            <Image
                              src={collab.profileIcon || "/user1.jpg"}
                              alt={collab.creatorName}
                              fill
                              className="object-cover hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {collab.creatorName}
                              </span>

                              <div className="flex gap-3">
                                {collab?.profile?.socialLinks.primary?.platform &&
                                  collab?.profile?.socialLinks.primary?.link && (
                                    <a
                                      href={collab.profile.socialLinks.primary.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition"
                                    >
                                      {getSocialMediaIcon(collab.profile.socialLinks.primary.platform)}
                                    </a>
                                  )}

                                {collab?.profile?.socialLinks?.secondary?.platform &&
                                  collab?.profile?.socialLinks?.secondary?.link && (
                                    <a
                                      href={collab.profile.socialLinks.secondary.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition"
                                    >
                                      {getSocialMediaIcon(collab.profile.socialLinks.secondary.platform)}
                                    </a>
                                  )}
                              </div>
                            </div>

                            {/* Categories */}
                            <div className="flex gap-2 flex-wrap">
                              {Array.isArray(collab?.profile?.category) &&
                                collab.profile.category.slice(0, 2).map((data, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-2 py-1 rounded-full
                                bg-primary/10 text-primary font-medium"
                                  >
                                    {data}
                                  </span>
                                ))}
                            </div>

                            {/* Favorite */}
                            {/* <div className="flex justify-end">
                              <span className="border border-gray-300 dark:border-gray-600
                            rounded-lg p-2 cursor-not-allowed">
                                <Heart
                                  className={`w-5 h-5 ${collab.isFavorite
                                      ? "text-red-500 fill-red-500"
                                      : "text-gray-500"
                                    }`}
                                />
                              </span>
                            </div> */}
                          </div>
                        </Card>

                        {/* Active Status */}
                        {collab.status === "Active" && (
                          <div className="mt-4 text-green-600 flex items-center gap-2">
                            <span className="h-3 w-3 bg-green-500 rounded-full" />
                            Approved
                          </div>
                        )}

                        {/* Videos */}
                        {/* Videos */}
                        {collab.videos.length > 0 ? (
                          <div className="mt-6 p-5 rounded-xl border border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-900 flex flex-col gap-4 shadow-sm">

                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                              Video Submitted
                            </h3>

                            <div className="flex flex-wrap gap-3">
                              {collab.videos.map((video, idx) => (
                                <Button
                                  key={idx}
                                  className="bg-primary text-white hover:bg-primary/90
            transition-all duration-200 px-4 py-2 rounded-lg"
                                >
                                  <Link href={video.link} target="_blank">
                                    View Video {idx + 1}
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-6 p-5 rounded-xl border border-dashed
    border-gray-300 dark:border-gray-700
    bg-gray-100/60 dark:bg-gray-800/60
    text-center">

                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                              Creator has not submitted any videos yet
                            </p>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ))}

          <DetailsModal
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            status={"Active"}
            data={campaignData}
          />
        </div>
      )}
    </div>

  );
}
