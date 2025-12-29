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
import { ChevronsLeft, Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2, CircleCheckBig, DollarSign, Calendar } from "lucide-react";
import { postApi } from "@/services/postServices";

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

const isRemoteImage = (src?: string) => {
  return !!src && src.startsWith("http");
};


const PostDescription = ({ data, collaborations, role }: PostDescriptionProps) => {
  const [coverMessage, setCoverMessage] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");


  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isCreator = role === "CREATOR";

  const getMidAmount = (budget?: string) => {
    if (!budget) return 0;

    // Handle "1200+"
    if (budget.includes("+")) {
      return Number(budget.replace(/[^0-9]/g, ""));
    }

    const numbers = budget.match(/\d+/g)?.map(Number);
    if (!numbers || numbers.length < 2) return 0;

    const [min, max] = numbers;
    return Math.round((min + max) / 2);
  };


  const handleSubmit = async () => {
    const payload = {
      brandId: data.brandId,
      amount: Number(getMidAmount(data.budgetForCampaign)),
      ...(coverMessage && { coverMessage }),
      ...(portfolioLink && { portfolioLink }),
    };

    try {
      setLoading(true);
      setError("");

      const res = await postApi.createCollaboration(
        data._id, // campaignId
        payload
      );

      // Axios already throws on non-2xx
      if (!res?.status) {
        throw new Error(res?.message || "Something went wrong");
      }

      setShowSuccess(true); // ✅ success modal
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };



  const processedData: NewPostData = useMemo(() => {
    return {
      id: data._id,
      campaignImage: data.campaignImage || "/images/placeholder.png",
      campaignTitle: data.campaignTitle,
      campaignDescription: data.campaignDescription,
      brandName: data.brandName,
      targetNiche: Array.isArray(data.targetNiche) ? data.targetNiche : parseJsonArray(data.targetNiche),
      budgetForCampaign: data.budgetForCampaign,
      expectedDeliverables: Array.isArray(data.expectedDeliverables)
        ? data.expectedDeliverables
        : parseJsonArray(data.expectedDeliverables),
      requirements: data.requirements,
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

      <div
        className="
    flex flex-col gap-10 rounded-2xl
    border border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900
    p-10
  "
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Campaign Details
          </p>
        </div>

        {/* Image + Title */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={processedData.campaignImage || "/images/placeholder.png"}
              alt="Campaign Image"
              className="w-36 h-36 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="w-full space-y-1">
            <h3 className="text-3xl font-medium text-gray-900 dark:text-gray-100">
              {processedData.campaignTitle}
            </h3>
            <h3 className="text-lg text-gray-600 dark:text-gray-400">
              {processedData.brandName}
            </h3>
          </div>
        </div>

        {/* Description */}
        <section className="flex flex-col gap-3">
          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
            Campaign Description
          </h4>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {processedData.campaignDescription}
          </p>
        </section>

        {/* Target Niche */}
        {processedData.targetNiche?.length > 0 && (
          <section className="flex flex-col gap-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
              Target Niche
            </h4>

            <div className="flex flex-wrap gap-2">
              {processedData.targetNiche.map((niche, idx) => (
                <span
                  key={idx}
                  className="
              px-4 py-2 rounded-lg text-sm font-semibold
              bg-gray-100 text-gray-800
              dark:bg-gray-800 dark:text-gray-200
              border border-gray-200 dark:border-gray-700
            "
                >
                  {niche}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Campaign Meta */}
        <section className="flex flex-col gap-4 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Budget Range
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {processedData.budgetForCampaign}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Application Deadline
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Open for a month
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        {processedData.requirements && processedData.requirements?.length > 0 && (
          <section className="flex flex-col gap-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
              Requirements
            </h4>

            <ul className="space-y-2">
              {processedData.requirements.map((req: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <CircleCheckBig className="text-green-600 dark:text-green-500 mt-1" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {isCreator && (
          <>
            <hr className="border-gray-200 dark:border-gray-700" />

            <section className="space-y-6">
              <h3 className="text-xl font-semibold">Apply to this Campaign</h3>

              {/* Cover Message */}
              <textarea
                rows={4}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Write a short message..."
              />

              {/* Portfolio */}
              <input
                type="url"
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Portfolio link (optional)"
              />

              <button className="w-full rounded-md bg-[#7544DB] py-3 text-white">
                Submit Application
              </button>
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

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl py-10 px-10 w-[100%] max-w-xl text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Application submitted successfully!
            </p>
            <p className="text-sm text-gray-500 mb-4">
              The brand will review your application.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-md bg-[#7544DB] py-2 text-sm font-medium text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
          {error}
        </div>
      )}


    </div>

  );
};

export default PostDescription;



{/* <div className="flex flex-col gap-2">
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
            </div> */}