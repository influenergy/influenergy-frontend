import {
  CampaignResponse,
  PostData,
  PostDescriptionProps,
} from "@/types/PostTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronsLeft, Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2 } from "lucide-react";
const PostQuestionnaire = dynamic(
  () => import("@/components/questionnaire/PostQuestionnaire"),
  { ssr: false }
);

// Helper function
const parseJsonArray = (input?: string | string[]): string[] => {
  try {
    if (Array.isArray(input)) {
      return JSON.parse(input[0]);
    }
    return JSON.parse(input || "[]");
  } catch {
    return Array.isArray(input) ? input : input ? [input] : [];
  }
};

// Type guard
const isCampaignResponse = (data: unknown): data is CampaignResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "_id" in data &&
    "campaignName" in data
  );
};



type CreatorBrief = {
  fullName?: string;
  email?: string;
  profileIcon?: string;
  isAccountVerified?: boolean;
  profile?: {
    socialLinks?: {
      primary?: {
        platform?: string;
        link?: string;
        followers?: string;
      };
      secondary?: {
        platform?: string;
        link?: string;
        followers?: string;
      };
    },
    category?: [string],
    city: string
  };
};
;

// Helper function to get social media icon based on platform name
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

const PostDescription = ({ data, collaborations }: PostDescriptionProps) => {
  console.log(collaborations)
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const processedData: PostData = useMemo(() => {
    if (!isCampaignResponse(data)) return data as PostData;

    const campaign = data;

    return {
      id: campaign._id,
      image: campaign?.campaignPost,
      title: campaign.campaignName,
      brandName: campaign.brandName,
      companyName: campaign.brandName,
      campaignObjective: parseJsonArray(campaign.campaignObjective).join(", "),
      campaignDescription: campaign.campaignDescription,
      campaignConcept: campaign.campaignConcept,
      yourBrief: campaign.yourBrief,
      targetGroup: {
        age: parseJsonArray(campaign.targetAgeGroup),
        gender: parseJsonArray(campaign.targetGender),
        location: parseJsonArray(campaign.targetLocation),
        interest: parseJsonArray(campaign.targetInterests),
      },
      contentVibe: {
        contentType: campaign.contentType,
        durationOfVideo: campaign.videoDuration,
        catchPhrase: campaign.catchPhrase,
        keyMessage: campaign.keyMessage,
        toneStyle: campaign.toneStyle,
        creatorLookingFor: campaign.creatorType,
      },
      idealCreatorChecklist: {
        minFollowerCount: campaign.minimumFollowers,
        ugcCreatorOrInfluencer: campaign.creatorInfluencer,
        preferredSocialMedia: parseJsonArray(campaign.socialMediaPlatform),
        pastExperience: campaign.pastExperience,
        preferredCreatorNiche: parseJsonArray(campaign.preferredCreatorNiche),
        preferredCreatorDemographics: campaign.preferredCreatorDemographics,
      },
      compensation: {
        budget: campaign.budgetForCampaign,
        expectedDeliverables: campaign.expectedDeliverables,
        deliveryDays: campaign.noOfDaysForDelivery,
        additionalInstructions: campaign.additionalInstructions,
        campaignPdf: campaign.campaignPdf,
      },
      description: campaign.campaignDescription,
      createdAt: "",
      requirement: {
        location: parseJsonArray(campaign.targetLocation),
        minFollowers: campaign.minimumFollowers,
        minEngagement: "",
      },
    };
  }, [data]);

  const defaultValues = useMemo(() => {
    if (!isCampaignResponse(data)) return {};

    return {
      "_id": data._id,
      "brandId": data.brandId,
      "vectorId": data.vectorId,
      "brand-name": data.brandName,
      "campaign-objective": parseJsonArray(data.campaignObjective),
      "campaign-description": data.campaignDescription,
      "campaign-post": data.campaignPost,

      "target-age-group": parseJsonArray(data.targetAgeGroup),
      "target-gender": parseJsonArray(data.targetGender),
      "target-location": parseJsonArray(data.targetLocation),
      "target-interests": parseJsonArray(data.targetInterests),

      "compaign-name": data.campaignName,
      "your-brief": data.yourBrief,
      // "compaign-concept": data.campaignConcept,

      "content-type": data.contentType,
      "video-duration": data.videoDuration,
      "catch-phrase": data.catchPhrase,
      "key-message": data.keyMessage,
      "tone-style": data.toneStyle,
      "creator-type": data.creatorType,

      "minimum-followers": data.minimumFollowers,
      "creator-influencer": data.creatorInfluencer,
      "social-media-platform": parseJsonArray(data.socialMediaPlatform),
      "past-experience": data.pastExperience,
      "preferred-creator-niche": parseJsonArray(data.preferredCreatorNiche),
      "preferred-creator-demographics": data.preferredCreatorDemographics,

      "budget-for-campaign": data.budgetForCampaign,
      "expected-deliverables": data.expectedDeliverables,
      "no-of-days-for-delivery": data.noOfDaysForDelivery,
      "additional-instructions": data.additionalInstructions,
      "requirement-documents": data.campaignPdf,
    };
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 relative space-y-4 mb-4 md:mb-8 lg:mb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
      >
        <ChevronsLeft className="h-5 w-5" />
        Back
      </button>

      {
        collaborations && (
          <div className="flex flex-col gap-10 pb-10">
            <div className="flex w-full items-center justify-between ">
              <p className="text-2xl font-semibold">Creator Details</p>
            </div>
            <div className="flex flex-col gap-4">
              {collaborations?.map(
                (item) => {
                  const creator = item.creatorId as unknown as CreatorBrief | undefined;
                  const name = creator?.fullName || "Creator";
                  const avatar = creator?.profileIcon || "/user1.jpg";
                  const isVerified = creator?.isAccountVerified;
                  const city = creator?.profile?.city

                  return (
                    <div
                    key={name}
                    className="flex items-stretch justify-between p-2 gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    {/* Left: Profile */}
                    <div className="flex items-stretch">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-600">
                        <Image
                          src={avatar}
                          alt={name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                      </div>
                    </div>
                  
                    {/* Right: Social + Details */}
                    <div className="flex flex-col flex-1 gap-2 h-24">
                      <div className="flex w-full justify-between">
                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                          {name}
                        </span>
                  
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                          {/* Primary Social Media */}
                          {creator?.profile?.socialLinks?.primary?.platform &&
                            creator?.profile?.socialLinks?.primary?.link && (
                              <a
                                href={creator.profile.socialLinks.primary.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                title={`Primary: ${creator.profile.socialLinks.primary.platform}`}
                              >
                                {getSocialMediaIcon(
                                  creator.profile.socialLinks.primary.platform
                                )}
                              </a>
                            )}
                  
                          {/* Secondary Social Media */}
                          {creator?.profile?.socialLinks?.secondary?.platform &&
                            creator?.profile?.socialLinks?.secondary?.link && (
                              <a
                                href={creator.profile.socialLinks.secondary.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                title={`Secondary: ${creator.profile.socialLinks.secondary.platform}`}
                              >
                                {getSocialMediaIcon(
                                  creator.profile.socialLinks.secondary.platform
                                )}
                              </a>
                            )}
                  
                          {/* Fallback */}
                          {!creator?.profile?.socialLinks?.primary?.platform &&
                            !creator?.profile?.socialLinks?.secondary?.platform && (
                              <div
                                className="flex items-center gap-1"
                                title="No social media data"
                              >
                                <Share2 className="w-5 h-5" />
                                <span className="text-xs text-gray-400">N/A</span>
                              </div>
                            )}
                        </div>
                      </div>
                  
                      <div className="flex items-start flex-col flex-1 justify-between text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex gap-2">
                          {Array.isArray(creator?.profile?.category) &&
                            creator.profile.category.length > 0 &&
                            creator.profile.category.map(
                              (data, idx) =>
                                idx <= 1 && (
                                  <span
                                    key={idx}
                                    className="text-xs p-1 bg-gray-300 rounded-lg"
                                  >
                                    {data}
                                  </span>
                                )
                            )}
                        </div>
                        {isVerified && (
                          <div className="flex gap-2">
                            <div className="flex gap-1 items-center">
                              <Image
                                src="/verified.png"
                                alt="Verified"
                                width={16}
                                height={16}
                              />
                              <span>Verified</span>
                            </div>
                            {city && (
                              <div className="flex gap-1 items-center">
                                <span className="text-sm">📍</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {city}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  );
                }
              )}
            </div>
          </div>
        )
      }



      <div className="flex flex-col gap-10 ">
        <div className="flex w-full items-center justify-between ">
          <p className="text-2xl font-semibold">Campaing Details</p>
          {!collaborations && <Button className="bg-primary px-5 py-2 rounded-xl" onClick={() => setOpen(true)}>
            Edit Brief
          </Button>}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={processedData?.image || "/images/placeholder.png"}
              alt={processedData?.title}
              width={550}
              height={550}
              className="object-cover aspect-[16/9] rounded-lg"
            />
          </div>

          <div className="w-full space-y-4">
            <h3 className="text-xl font-bold ">
              {processedData?.title}
            </h3>
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-lg font-normal text-gray-500">Campaign Description</h1>
              <p className="text-black text-lg">{processedData?.campaignDescription}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 max-w-lg">
          {processedData?.campaignObjective && (
            <section className="flex flex-col gap-2">
              <h4 className="text-lg text-gray-500">Campaign Objective</h4>
              <p className="font-semibold">{processedData?.campaignObjective}</p>
            </section>
          )}

          {processedData?.brandName && (
            <section className="flex flex-col gap-2">
              <h4 className="text-lg text-gray-500">Brand Name*</h4>
              <p className="font-semibold">{processedData?.brandName}</p>
            </section>
          )}
        </div>
        <hr />

        {processedData?.targetGroup && (
          <section className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Target Audience & Demographics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between lg:gap-0">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Target Audience Age Group</h4>
                <p className="font-semibold">
                  {Array.isArray(processedData?.targetGroup.age)
                    ? processedData?.targetGroup.age.join(", ")
                    : processedData?.targetGroup.age}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Target Audience Gender</h4>
                <p className="font-semibold">
                  {Array.isArray(processedData?.targetGroup.gender)
                    ? processedData?.targetGroup.gender.join(", ")
                    : processedData?.targetGroup.gender}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Target Audience Location</h4>
                <p className="font-semibold">
                  {Array.isArray(processedData?.targetGroup.location)
                    ? processedData?.targetGroup.location.join(", ")
                    : processedData?.targetGroup.location}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Target Audience Interests & Niche</h4>
                <p className="font-semibold">
                  {Array.isArray(processedData?.targetGroup.interest)
                    ? processedData?.targetGroup.interest.join(", ")
                    : processedData?.targetGroup.interest}
                </p>
              </div>
            </div>
          </section>
        )}

        <hr />
        {processedData?.contentVibe && (
          <section className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">What&apos;s the Content Vibe?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between lg:gap-0">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">What&apos;s Your Content Type</h4>
                <p className="font-semibold">
                  {processedData?.contentVibe.contentType}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Duration of Video</h4>
                <p className="font-semibold">
                  {processedData?.contentVibe.durationOfVideo}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Tone & Style</h4>
                <p className="font-semibold">
                  {processedData?.contentVibe.toneStyle}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Looking for creator type</h4>
                <p className="font-semibold">
                  {processedData?.contentVibe.creatorLookingFor}
                </p>
              </div>
            </div>
          </section>
        )}
        <hr />

        {processedData?.idealCreatorChecklist && (
          <section className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Your Ideal Creator Checklist!</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-4 lg:gap-0">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Minimum Follower Count</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.minFollowerCount}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">UGC Creator or Influencer</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.ugcCreatorOrInfluencer}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Preferred Social Media Platform</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.preferredSocialMedia?.join(", ")}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Past Experience</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.pastExperience}
                </p>
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-4 lg:gap-0 lg:mt-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Preferred Creator Niche</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.preferredCreatorNiche}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Preferred country of the Creator</h4>
                <p className="font-semibold">
                  {processedData?.idealCreatorChecklist.preferredCreatorDemographics}
                </p>
              </div>
            </div>
          </section>
        )}

        <hr />

        {processedData?.compensation && (
          <section className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Compensation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-4 lg:gap-0">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Budget for Campaign</h4>
                <p className="font-semibold">
                  ${processedData?.compensation.budget}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Expected Deliverables</h4>
                <p className="font-semibold">
                  {processedData?.compensation.expectedDeliverables}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">No. of Days for Delivery</h4>
                <p className="font-semibold">
                  {processedData?.compensation.deliveryDays}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-4 lg:gap-0 lg:mt-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Additional Instructions</h4>
                <p className="font-semibold">
                  {processedData?.compensation.additionalInstructions || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-gray-500 font-normal">Requirement Documents</h4>
                <p className="font-semibold">
                  {processedData?.compensation.campaignPdf ? (
                    <Link
                      href={processedData?.compensation.campaignPdf}
                      className="underline text-blue-500"
                      target="_blank"
                    >
                      View PDF
                    </Link>
                  ) : (
                    "Not Provided"
                  )}
                </p>
              </div>


            </div>
          </section>
        )}
      </div>


      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-full max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Campaign Brief</DialogTitle>
          </DialogHeader>
          <PostQuestionnaire
            mode="edit"
            defaultValues={defaultValues}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDescription;
