import { NewPostData, PostDescriptionProps } from "@/types/PostTypes";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronsLeft,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Share2,
  CircleCheckBig,
  DollarSign,
  Calendar,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { postApi } from "@/services/postServices";
import TikTokIcon from "../icons/tiktok";


/* ---------------- Helpers ---------------- */

const parseJsonArray = (input?: string | string[]): string[] => {
  try {
    if (Array.isArray(input)) return input;
    if (typeof input === "string") return JSON.parse(input || "[]");
    return [];
  } catch {
    return typeof input === "string" ? [input] : [];
  }
};

export const getSocialMediaIcon = (platform?: string) => {
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

    case "facebook":
      return <Facebook className="w-5 h-5 text-blue-600" />;

    case "linkedin":
      return <Linkedin className="w-5 h-5 text-blue-700" />;

    case "newsletter":
    case "email":
      return <Mail className="w-5 h-5 text-gray-600" />;

    case "tiktok":
      return <TikTokIcon size={20} />;

    default:
      return <Share2 className="w-5 h-5 text-gray-400" />;
  }
};


/* ---------------- Component ---------------- */

const PostDescription = ({ data, role }: PostDescriptionProps) => {
  const router = useRouter();

  const processedData: NewPostData = useMemo(() => { return { id: data._id, campaignImage: data.campaignImage || "/images/placeholder.png", campaignTitle: data.campaignTitle, campaignDescription: data.campaignDescription, brandName: data.brandName, targetNiche: Array.isArray(data.targetNiche) ? data.targetNiche : parseJsonArray(data.targetNiche), budgetForCampaign: data.budgetForCampaign, expectedDeliverables: Array.isArray(data.expectedDeliverables) ? data.expectedDeliverables : parseJsonArray(data.expectedDeliverables), requirements: data.requirements, status: data.status || "DRAFT", deadline: data.deadline, socialPlatforms: data.socialPlatforms, applicationQuestions: data.applicationQuestions || "", createdAt: data.createdAt || "", updatedAt: data.updatedAt || "", brandId: data.brandId, applied: data.applied || "" }; }, [data]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [coverMessage, setCoverMessage] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [creatorBudget, setCreatorBudget] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);


  const handleSubmit = async () => {
    if (!processedData) return;

    if (!processedData?.brandId) {
      setSubmitError("Brand ID is missing");
      return;
    }

    const payload = {
      brandId: processedData.brandId,
      // amount: Number(getMidAmount(selectedCampaign.budgetForCampaign)),
      ...(coverMessage && { coverMessage }),
      ...(creatorBudget && { creatorBudget }),
      // ...(portfolioLink && { portfolioLink }),
    };

    try {
      setSubmitLoading(true);
      setSubmitError("");

      const res = await postApi.createCollaboration(
        processedData.id,
        payload
      );

      if (!res?.status) {
        throw new Error(res?.message || "Something went wrong");
      }

      // ✅ Close apply modal
      setShowApplyModal(false);
      setCoverMessage("");
      // setPortfolioLink("");
      setCreatorBudget("");

      // ✅ Show success modal
      setShowSuccess(true);

    } catch (err: any) {
      setSubmitError(err.response?.data?.message || err.message);
    } finally {
      setSubmitLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-background rounded-xl p-8 space-y-10">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <ChevronsLeft className="w-5 h-5" />
        Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-6">
        {/* Image */}
        <div
          onClick={() => setShowImageModal(true)}
          className="cursor-pointer shrink-0"
        >
          <Image
            src={processedData.campaignImage}
            alt="Campaign"
            width={250}
            height={250}
            className="rounded-2xl border object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Title + Brand */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900">
            {processedData.campaignTitle}
          </h1>
          <p className="text-gray-500 mt-1">
            {processedData.brandName}
          </p>
        </div>

        {/* Button with spacing */}
        {!processedData.applied && role === "CREATOR" && (
          <div className="ml-3">
            <Button className="px-6 py-2 text-base">
              Apply
            </Button>
          </div>
        )}
      </div>


      {/* Description */}
      <section>
        <h3 className="font-semibold mb-1">Campaign Description</h3>
        <p className="text-gray-600">{processedData.campaignDescription}</p>
      </section>

      {/* Target Niche */}
      {processedData.targetNiche.length > 0 && (
        <section>
          <h3 className="font-semibold mb-2">Target Niche</h3>
          <div className="flex flex-wrap gap-2">
            {processedData.targetNiche.map((niche, i) => (
              <span
                key={i}
                className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600 dark:bg-background"
              >
                {niche}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Meta Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Budget */}
        <div className="p-4 border rounded-xl flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-primary" />
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="font-semibold">{processedData.budgetForCampaign}</p>
          </div>
        </div>

        {/* Deadline */}
        <div className="p-4 border rounded-xl flex items-center gap-4">
          <Calendar className="w-8 h-8 text-primary" />
          <div>
            <p className="text-xs text-gray-500">Deadline</p>
            <p className="font-semibold">{processedData.deadline}</p>
          </div>
        </div>

        {/* Platform + Deliverables (Grouped) */}
        <div className="p-4 border rounded-xl space-y-5">
          <div className="flex items-center gap-3">
            {getSocialMediaIcon(processedData.socialPlatforms)}
            <div>
              <p className="text-xs text-gray-500 ">Platform</p>
              <p className="font-semibold">{processedData.socialPlatforms}</p>
            </div>
          </div>

          {processedData.expectedDeliverables.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Expected Deliverables
              </p>
              <div className="flex flex-wrap gap-2">
                {processedData.expectedDeliverables.map((item, i) => (
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

      </section>

      {/* Requirements */}
      {processedData.requirements && processedData.requirements?.length > 0 && (
        <section>
          <h3 className="font-semibold mb-2">Requirements</h3>
          <ul className="space-y-2">
            {processedData.requirements.map((req, i) => (
              <li key={i} className="flex gap-2 text-gray-600">
                <CircleCheckBig className="w-5 h-5 text-green-600 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </section>
      )}

      {showApplyModal && processedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-background rounded-xl p-6 w-full max-w-lg relative">

            {/* Close */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Apply to this Campaign
            </h3>

            <hr className="mb-4 border-gray-200 dark:border-gray-700" />

            <section className="space-y-4">
              {/* Error */}
              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}

              {/* Cover Message */}
              <textarea
                rows={4}
                value={coverMessage}
                onChange={(e) => setCoverMessage(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 bg-background"
                placeholder="Write a short message..."
              />

              {/* Portfolio */}
              {/* <input
                type="string"
                value={creatorBudget}
                onChange={(e) => setCreatorBudget(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 bg-background"
                placeholder="tell your expected buget"
              /> */}

              {/* Submit */}
              <button
                disabled={submitLoading}
                onClick={handleSubmit}
                className="
                  w-full rounded-md bg-primary py-3
                  text-white font-medium
                  flex items-center justify-center gap-2
                  disabled:opacity-60
                "
              >
                {submitLoading && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Submit Application
              </button>
            </section>
          </div>
        </div>
      )}


      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-background rounded-xl py-10 px-10 w-full max-w-xl text-center">
            <p className="text-lg font-semibold mb-2">
              Application submitted successfully!
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              The brand will review your application.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-md bg-primary py-2 text-sm font-medium text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-1 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={processedData.campaignImage}
              alt="Campaign Full"
              width={600}
              height={600}
              className="rounded-xl object-contain w-full h-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default PostDescription;
