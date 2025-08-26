import { Campaign } from "@/types/PostQuestionnaire";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "./Loader";
import { Card } from "../ui/card";
import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2, Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { useState } from "react";
import DetailsModal from "../inbox/DetailsModal";
import { Collaboration } from "@/types/Collaboration";
import { useToggleFavorite } from "@/hooks/usePost";

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
  campaignName: string,
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
    campaignName: "",
    campaignPost: "",
    brandName: "",
    campaignObjective: [],
    campaignDescription: "",
    yourBrief: "",
    campaignConcept: "",
    targetAgeGroup: [],
    targetGender: [],
    targetLocation: [],
    targetInterests: [],
    contentType: "",
    videoDuration: "",
    catchPhrase: "",
    preferredCreatorNiche: [],
    preferredCreatorDemographics: "",
    noOfDaysForDelivery: "",
    expectedDeliverables: "",
    campaignPdf: "",
    additionalInstructions: "",
    socialMediaPlatform: [],
    keyMessage: "",
    toneStyle: "",
  },
  creatorId: "",
  status: "",
  amount: 0,
  videos: [],
  createdAt: "",
  updatedAt: "",
  paymentStatus: "",
  requiredDocuments: "",
}
export default function CompletedCollaborationTab() {
  const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite();
  const [campaignData, setCampaignData] = useState<Collaboration>(emptyCollaboration)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const { data, isLoading, isError } = useFindAiCampaignsList("Completed");

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
    <div className="w-full px-2 sm:px-4  dark:bg-background">
      {data.campaigns.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No completed collaborations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:gap-10 dark:bg-background">
          {data.campaigns.map((campaign: CollabInterface) => {
            return (
              <div key={campaign._id} className="relative flex flex-col">
                <div className="flex ">
                  <p className="text-gray-500 dark:bg-gray-700 dark:text-gray-200 bg-white text-sm md:text-base shadow-[0_-2px_6px_rgba(0,0,0,0.1),2px_0_6px_rgba(0,0,0,0.1),-2px_0_6px_rgba(0,0,0,0.1)] rounded-t-lg p-4 md:px-10 ">
                    {campaign.campaignName}
                  </p>

                </div>
                <div className="-mt-2 shadow-[0px_10px_20px_5px_rgba(0,0,0,0.1)]  bg-white dark:bg-gray-700 py-6 px-4 flex flex-col gap-2 md:gap-6 rounded-lg">
                  <section className="flex flex-col items-start gap-2 md:gap-4">
                    <h2 className="font-semibold text-sm md:text-base">Campaign Description</h2>
                    <p className="text-gray-500 dark:text-gray-100 text-sm md:text-base font-normal">{campaign.campaignDescription}</p>
                  </section>
                  <section className="flex flex-col items-start w-full gap-2 md:gap-6">
                    <h2 className="font-semibold text-sm md:text-base border-b-2 text-primary px-2 border-primary cursor-pointer" onClick={() => {
                      const details = campaign.campaignDetails;
                      setCampaignData({
                        _id: "",
                        brandId: details?.brandId || "",
                        campaignId: {
                          campaignName: details?.campaignName || "",
                          campaignPost: details?.campaignPost || "",
                          brandName: details?.brandName || "",
                          campaignObjective: details?.campaignObjective || [],
                          campaignDescription: details?.campaignDescription || "",
                          yourBrief: details?.yourBrief || details?.additionalInstructions || "",
                          campaignConcept: details?.campaignConcept || "",
                          targetAgeGroup: details?.targetAgeGroup || [],
                          targetGender: details?.targetGender || [],
                          targetLocation: details?.targetLocation || [],
                          targetInterests: details?.targetInterests || [],
                          contentType: details?.contentType || "",
                          videoDuration: details?.videoDuration || "",
                          catchPhrase: details?.catchPhrase || "",
                          preferredCreatorNiche: details?.preferredCreatorNiche || [],
                          preferredCreatorDemographics: details?.preferredCreatorDemographics || "",
                          noOfDaysForDelivery: details?.noOfDaysForDelivery || "",
                          expectedDeliverables: details?.expectedDeliverables || "",
                          campaignPdf: details?.campaignPdf || "",
                          additionalInstructions: details?.additionalInstructions || "",
                          socialMediaPlatform: details?.socialMediaPlatform || [],
                          keyMessage: details?.keyMessage || "",
                          toneStyle: details?.toneStyle || "",
                        },
                        creatorId: "",
                        status: "",
                        amount: Number(details?.budgetForCampaign) || 0,
                        videos: [],
                        createdAt: "",
                        updatedAt: "",
                        paymentStatus: "",
                        requiredDocuments: "",
                      })
                      setIsDetailsModalOpen(true)
                    }} >View Campaign Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                      {
                        campaign.collaborations.map((collab, idx) => {
                          return (
                            <div key={idx}>
                              <Card className="flex items-stretch justify-between p-2 gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm dark:text-whit">
                                <div className="flex items-center">
                                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-600">
                                    <Image
                                      src={collab.profileIcon || "/user1.jpg"}
                                      alt={collab.creatorName}
                                      fill
                                      className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                    />
                                  </div>
                                </div>
                                <div className=" flex flex-col h-full  w-full gap-2">
                                  <div className="flex w-full justify-between">
                                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                                      {collab.creatorName}
                                    </span>

                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                      {/* Primary Social Media */}
                                      {collab?.profile?.socialLinks.primary?.platform && collab?.profile?.socialLinks.primary?.link && (
                                        <a
                                          href={collab.profile.socialLinks.primary.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                          title={`Primary: ${collab.profile.socialLinks.primary.platform}`}
                                        >
                                          {getSocialMediaIcon(collab.profile.socialLinks.primary.platform)}
                                        </a>
                                      )}

                                      {/* Secondary Social Media */}
                                      {collab?.profile?.socialLinks?.secondary?.platform && collab?.profile?.socialLinks?.secondary?.link && (
                                        <a
                                          href={collab.profile.socialLinks.secondary.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                          title={`Secondary: ${collab.profile.socialLinks.secondary.platform}`}
                                        >
                                          {getSocialMediaIcon(collab.profile.socialLinks.secondary.platform)}
                                        </a>
                                      )}

                                      {/* Fallback if no social media data */}
                                      {!collab?.profile?.socialLinks?.primary?.platform && !collab?.profile?.socialLinks?.secondary?.platform && (
                                        <div className="flex items-center gap-1" title="No social media data">
                                          <Share2 className="w-5 h-5" />
                                          <span className="text-xs text-gray-400">N/A</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-start flex-col justify-between h-full text-sm text-gray-500 dark:text-black">
                                    <div className="flex gap-2">

                                      {Array.isArray(collab?.profile?.category) && collab.profile.category.length > 0 &&
                                        collab.profile.category.map((data, idx) => (
                                          idx <= 1 && <span key={idx} className="text-xs p-1 bg-gray-300 rounded-lg">{data}</span>
                                        ))
                                      }
                                    </div>

                                  </div>
                                  <div className="flex justify-end items-center">
                                    <span className="border rounded-md p-3 cursor-pointer group dark:border-gray-300" onClick={() => {
                                    
                                      toggleFavorite({
                                        creatorId: collab.creatorId,
                                      })
                                    }
                                    }>
                                      <Heart
                                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110
      ${collab.isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}
      ${isToggling ? "animate-pulse" : ""}`}
                                      />
                                    </span>

                                  </div>
                                </div>
                              </Card>
                              {
                                collab.status === "Completed" && <div className="flex flex-col gap-4 mt-6">
                                  <h3>Status</h3>
                                  <p className="text-primary">
                                    <span className="bg-primary inline-block h-3 w-3 rounded-full mr-2" />
                                    Collaboration Complete
                                  </p>

                                </div>
                              }
                              {
                                collab.videos.length > 0 && <div className="flex flex-col gap-6 mt-6">
                                  <div className="flex flex-col gap-4">

                                    <h3>Approved Video</h3>
                                    {collab.videos.map((video, idx) => {
                                      return (
                                        <div key={idx}>
                                          <Button className="bg-primary text-white">
                                            <Link
                                              href={video.link}
                                              target="_blank"
                                            >
                                              View Video
                                            </Link>
                                          </Button>
                                        </div>
                                      )
                                    })}
                                  </div>

                                </div>
                              }

                            </div>
                          )
                        })
                      }
                    </div>
                  </section>
                </div>

              </div>)
          }
          )}
          <DetailsModal
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            status={"Completed"}
            data={campaignData}
          />
        </div>
      )}
    </div>
  );
}
