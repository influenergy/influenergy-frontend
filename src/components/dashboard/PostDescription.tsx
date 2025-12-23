import {
  NewCampaignResponse,
  NewPostData,
  PostDescriptionProps,
  CreatorProfile,
} from "@/types/PostTypes";
import Image from "next/image";
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

// Helper function to safely parse arrays
const parseJsonArray = (input?: string | string[]): string[] => {
  try {
    if (Array.isArray(input)) {
      return input;
    }
    if (typeof input === "string") {
      return JSON.parse(input || "[]");
    }
    return [];
  } catch {
    if (typeof input === "string") {
      return [input];
    }
    return [];
  }
};

// Helper function to get social media icon based on platform name
const getSocialMediaIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "youtube":
    case "youtube reel":
      return <Youtube className="w-5 h-5" />;
    case "twitter":
    case "twitter / x":
      return <Twitter className="w-5 h-5" />;
    case "facebook":
      return <Facebook className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "newsletter":
      return <Mail className="w-5 h-5" />;
    case "pinterest":
    case "tiktok":
    case "twitch":
    default:
      return <Share2 className="w-5 h-5" />;
  }
};

const PostDescription = ({ data, collaborations }: PostDescriptionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const processedData: NewPostData = useMemo(() => {
    return {
      id: data._id,
      image: data.campaignPost || "/images/placeholder.png",
      title: data.campaignTitle,
      campaignDescription: data.campaignDescription,
      targetNiche: Array.isArray(data.targetNiche) ? data.targetNiche : parseJsonArray(data.targetNiche),
      budgetForCampaign: data.budgetForCampaign,
      expectedDeliverables: Array.isArray(data.expectedDeliverables) 
        ? data.expectedDeliverables 
        : parseJsonArray(data.expectedDeliverables),
      status: data.status || "DRAFT",
      applicationQuestions: data.applicationQuestions || "",
      createdAt: data.createdAt || "",
      updatedAt: data.updatedAt || "",
      brandId: data.brandId,
    };
  }, [data]);

  const defaultValues = useMemo(() => {
    return {
      _id: data._id,
      brandId: data.brandId,
      "campaign-title": data.campaignTitle,
      "campaign-description": data.campaignDescription,
      "target-niche": Array.isArray(data.targetNiche) ? data.targetNiche : parseJsonArray(data.targetNiche),
      "budget-for-campaign": data.budgetForCampaign,
      "expected-deliverables": Array.isArray(data.expectedDeliverables) 
        ? data.expectedDeliverables 
        : parseJsonArray(data.expectedDeliverables),
      status: data.status,
      "application-questions": data.applicationQuestions || "",
    };
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 relative space-y-4 mb-4 md:mb-8 lg:mb-10 dark:bg-background">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white duration-200 flex items-center gap-1"
      >
        <ChevronsLeft className="h-5 w-5" />
        Back
      </button>

      {collaborations.length > 0 && (
        <div className="flex flex-col gap-10 pb-10">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl font-semibold">Creator Details</p>
          </div>
          <div className="flex flex-col gap-4">
            {collaborations?.map((item) => {
              const creator = item.creatorId;
              const name = creator?.fullName || "Creator";
              const avatar = creator?.profileIcon || "/user1.jpg";
              // const isVerified = creator?.isAccountVerified;
              const city = creator?.profile?.city;

              return (
                <div
                  key={item._id}
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

                    <div className="flex items-start flex-col flex-1 justify-between text-sm text-gray-500">
                      <div className="flex gap-2 flex-wrap">
                        {Array.isArray(creator?.profile?.category) &&
                          creator.profile.category.length > 0 &&
                          creator.profile.category.map(
                            (categoryItem, idx) =>
                              idx <= 1 && (
                                <span
                                  key={idx}
                                  className="text-xs p-1 bg-gray-300 rounded-lg text-black"
                                >
                                  {categoryItem}
                                </span>
                              )
                          )}
                      </div>
                      {/* {isVerified && (
                        <div className="flex gap-2 items-center mt-1">
                          <div className="flex gap-1 items-center">
                            <Image
                              src="/verified.png"
                              alt="Verified"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Verified
                            </span>
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
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-10">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold">Campaign Details</p>
          {collaborations.length === 0 && (
            <Button
              className="bg-primary px-5 py-2 rounded-xl"
              onClick={() => setOpen(true)}
            >
              Edit Brief
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative rounded-xl overflow-hidden lg:w-[550px] lg:h-[310px]">
            <Image
              src={processedData.image || "/images/placeholder.png"}
              alt={processedData.title}
              width={550}
              height={310}
              className="object-cover aspect-[16/9] rounded-lg"
            />
          </div>

          <div className="w-full space-y-4">
            <h3 className="text-xl font-bold">{processedData.title}</h3>
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-lg font-normal text-gray-500">
                Campaign Description
              </h1>
              <p className="text-black text-lg dark:text-white">
                {processedData.campaignDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex gap-4 items-center">
          <section className="flex flex-col gap-2">
            <h4 className="text-lg text-gray-500">Campaign Status</h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                processedData.status === "PUBLISHED"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : processedData.status === "DRAFT"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              {processedData.status}
            </span>
          </section>
        </div>

        <hr />

        {/* Target Niche Section */}
        {processedData.targetNiche && processedData.targetNiche.length > 0 && (
          <section className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Target Niche</h4>
            <div className="flex flex-wrap gap-2">
              {processedData.targetNiche.map((niche, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-semibold"
                >
                  {niche}
                </span>
              ))}
            </div>
          </section>
        )}

        <hr />

        {/* Campaign Details Section */}
        <section className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold">Budget & Deliverables</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg text-gray-500 font-normal">
                Budget for Campaign
              </h4>
              <p className="font-semibold text-lg">${processedData.budgetForCampaign}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg text-gray-500 font-normal">
                Expected Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {processedData.expectedDeliverables &&
                  processedData.expectedDeliverables.map((deliverable, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-semibold"
                    >
                      {deliverable}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Questions Section */}
        {processedData.applicationQuestions && (
          <>
            <hr />
            <section className="flex flex-col gap-4">
              <h4 className="text-xl font-semibold">Application Questions</h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {processedData.applicationQuestions}
              </p>
            </section>
          </>
        )}
      </div>

      {/* Edit Dialog */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-4xl w-full max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Campaign Brief</DialogTitle>
          </DialogHeader>
          <PostQuestionnaire
            mode="edit"
            defaultValues={defaultValues}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default PostDescription;