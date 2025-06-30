import {
  CampaignResponse,
  PostData,
  PostDescriptionProps,
} from "@/types/PostTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useAppDispatch } from "@/store";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
const isCampaignResponse = (data: any): data is CampaignResponse => {
  return "_id" in data && "campaignName" in data;
};

const PostDescription = ({ data }: PostDescriptionProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const processedData: PostData = useMemo(() => {
    if (!isCampaignResponse(data)) return data as PostData;

    const campaign = data;

    return {
      id: campaign._id,
      image: campaign.campaignPost,
      title: campaign.campaignName,
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
      "compaign-concept": data.campaignConcept,

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
    <div className="bg-white rounded-lg p-6 relative space-y-4">
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit Brief
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={processedData.image || "/images/placeholder.png"}
            alt={processedData.title}
            width={550}
            height={550}
            className="object-cover aspect-[16/9] rounded-lg"
          />
        </div>

        <div className="w-full space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {processedData.title}
          </h3>
          <div className="flex items-center gap-4">
            <Image
              src={processedData.image || "/images/placeholder.png"}
              alt="Campaign Image"
              width={40}
              height={40}
              className="object-cover rounded-full h-10 w-10"
            />
            <p className="text-black text-lg">{processedData.companyName}</p>
          </div>
        </div>
      </div>

      {processedData.campaignObjective && (
        <section>
          <h4 className="font-semibold text-lg">Campaign Objective</h4>
          <p className="text-gray-600">{processedData.campaignObjective}</p>
        </section>
      )}

      {processedData.campaignDescription && (
        <section>
          <h4 className="font-semibold text-lg">Campaign Description</h4>
          <p className="text-gray-600">{processedData.campaignDescription}</p>
        </section>
      )}

      {processedData.yourBrief && (
        <section>
          <h4 className="font-semibold text-lg">Campaign Brief</h4>
          <p className="text-gray-600">{processedData.yourBrief}</p>
        </section>
      )}

      {processedData.campaignConcept && (
        <section>
          <h4 className="font-semibold text-lg">Campaign Concept</h4>
          <p className="text-gray-600">{processedData.campaignConcept}</p>
        </section>
      )}

      {processedData.targetGroup && (
        <section>
          <h4 className="text-xl font-semibold">Target Audience</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Age:</strong>{" "}
              {Array.isArray(processedData.targetGroup.age)
                ? processedData.targetGroup.age.join(", ")
                : processedData.targetGroup.age}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {Array.isArray(processedData.targetGroup.gender)
                ? processedData.targetGroup.gender.join(", ")
                : processedData.targetGroup.gender}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {Array.isArray(processedData.targetGroup.location)
                ? processedData.targetGroup.location.join(", ")
                : processedData.targetGroup.location}
            </p>
            <p>
              <strong>Interests:</strong>{" "}
              {Array.isArray(processedData.targetGroup.interest)
                ? processedData.targetGroup.interest.join(", ")
                : processedData.targetGroup.interest}
            </p>
          </div>
        </section>
      )}

      {processedData.contentVibe && (
        <section>
          <h4 className="text-xl font-semibold">Content Vibe</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Content Type:</strong>{" "}
              {processedData.contentVibe.contentType}
            </p>
            <p>
              <strong>Video Duration:</strong>{" "}
              {processedData.contentVibe.durationOfVideo}
            </p>
            <p>
              <strong>Catch Phrase:</strong>{" "}
              {processedData.contentVibe.catchPhrase}
            </p>
            <p>
              <strong>Key Message:</strong>{" "}
              {processedData.contentVibe.keyMessage}
            </p>
            <p>
              <strong>Tone & Style:</strong>{" "}
              {processedData.contentVibe.toneStyle}
            </p>
            <p>
              <strong>Looking For:</strong>{" "}
              {processedData.contentVibe.creatorLookingFor}
            </p>
          </div>
        </section>
      )}

      {processedData.idealCreatorChecklist && (
        <section>
          <h4 className="text-xl font-semibold">Ideal Creator Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Min Followers:</strong>{" "}
              {processedData.idealCreatorChecklist.minFollowerCount}
            </p>
            <p>
              <strong>UGC or Influencer:</strong>{" "}
              {processedData.idealCreatorChecklist.ugcCreatorOrInfluencer}
            </p>
            <p>
              <strong>Social Media:</strong>{" "}
              {processedData.idealCreatorChecklist.preferredSocialMedia}
            </p>
            <p>
              <strong>Past Experience:</strong>{" "}
              {processedData.idealCreatorChecklist.pastExperience}
            </p>
            <p>
              <strong>Niche:</strong>{" "}
              {processedData.idealCreatorChecklist.preferredCreatorNiche}
            </p>
            <p>
              <strong>Demographics:</strong>{" "}
              {processedData.idealCreatorChecklist.preferredCreatorDemographics}
            </p>
          </div>
        </section>
      )}

      {processedData.compensation && (
        <section>
          <h4 className="text-xl font-semibold">Compensation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Budget:</strong> ${processedData.compensation.budget}
            </p>
            <p>
              <strong>Deliverables:</strong>{" "}
              {processedData.compensation.expectedDeliverables}
            </p>
            <p>
              <strong>Delivery Days:</strong>{" "}
              {processedData.compensation.deliveryDays}
            </p>
            <p>
              <strong>Instructions:</strong>{" "}
              {processedData.compensation.additionalInstructions || "N/A"}
            </p>
            <p>
              <strong>Document:</strong>{" "}
              {processedData.compensation.campaignPdf ? (
                <Link
                  href={processedData.compensation.campaignPdf}
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
        </section>
      )}

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Edit Campaign Brief</DialogTitle>
          </DialogHeader>
          <PostQuestionnaire
            mode="edit"
            postId={isCampaignResponse(data) ? data._id : data.id}
            defaultValues={defaultValues}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDescription;
