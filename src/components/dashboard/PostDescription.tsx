import { NewPostData, PostDescriptionProps } from "@/types/PostTypes";
import Image from "next/image";
import React, { useMemo } from "react";
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
} from "lucide-react";

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

const getSocialMediaIcon = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-6 h-6 text-pink-500" />;
    case "youtube":
      return <Youtube className="w-6 h-6 text-red-500" />;
    case "twitter":
    case "twitter / x":
      return <Twitter className="w-6 h-6 text-sky-500" />;
    case "facebook":
      return <Facebook className="w-6 h-6 text-blue-600" />;
    case "linkedin":
      return <Linkedin className="w-6 h-6 text-blue-700" />;
    case "newsletter":
      return <Mail className="w-6 h-6 text-gray-600" />;
    default:
      return <Share2 className="w-6 h-6 text-gray-500" />;
  }
};

/* ---------------- Component ---------------- */

const PostDescription = ({ data }: PostDescriptionProps) => {
  const router = useRouter();

  const processedData: NewPostData = useMemo(() => { return { id: data._id, campaignImage: data.campaignImage || "/images/placeholder.png", campaignTitle: data.campaignTitle, campaignDescription: data.campaignDescription, brandName: data.brandName, targetNiche: Array.isArray(data.targetNiche) ? data.targetNiche : parseJsonArray(data.targetNiche), budgetForCampaign: data.budgetForCampaign, expectedDeliverables: Array.isArray(data.expectedDeliverables) ? data.expectedDeliverables : parseJsonArray(data.expectedDeliverables), requirements: data.requirements, status: data.status || "DRAFT", deadline: data.deadline, socialPlatforms: data.socialPlatforms, applicationQuestions: data.applicationQuestions || "", createdAt: data.createdAt || "", updatedAt: data.updatedAt || "", brandId: data.brandId, }; }, [data]);

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
      <div className="flex gap-6 items-center">
        <Image
          src={processedData.campaignImage}
          alt="Campaign"
          width={120}
          height={120}
          className="rounded-full border"
        />

        <div>
          <h1 className="text-3xl font-semibold">
            {processedData.campaignTitle}
          </h1>
          <p className="text-gray-500">{processedData.brandName}</p>
        </div>
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
    </div>
  );
};

export default PostDescription;
