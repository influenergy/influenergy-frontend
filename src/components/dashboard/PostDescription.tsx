import {
  CampaignResponse,
  PostData,
  PostDescriptionProps,
} from "@/types/PostTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostDescription = ({ data }: PostDescriptionProps) => {
  // const [open, setOpen] = useState(false);
  // Function to process the data into the expected format
  const processData = (): PostData => {
    // If already in correct format
    if ("image" in data && "title" in data) {
      return data as PostData;
    }

    const campaignData = data as CampaignResponse;

    // General parser to handle weird array-wrapped JSON strings or plain strings
    const parseJsonArray = (input: string | string[]): string => {
      try {
        if (Array.isArray(input)) {
          const value = input[0];
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed.join(", ") : value;
        } else {
          const parsed = JSON.parse(input);
          return Array.isArray(parsed) ? parsed.join(", ") : input;
        }
      } catch {
        // Fallback: if not JSON, treat as CSV or return raw
        if (Array.isArray(input)) return input.join(", ");
        return input;
      }
    };

    const targetGroup = {
      age: parseJsonArray(campaignData.targetAgeGroup) || "Not specified",
      gender: parseJsonArray(campaignData.targetGender) || "Not specified",
      location: parseJsonArray(campaignData.targetLocation),
      interest: parseJsonArray(campaignData.targetInterests),
    };

    return {
      id: campaignData._id,
      image: campaignData.campaignPost,
      title: campaignData.campaignName,
      companyName: campaignData.brandName,
      campaignObjective: parseJsonArray(campaignData.campaignObjective),
      campaignDescription: campaignData.campaignDescription,
      campaignConcept: campaignData.campaignConcept,
      yourBrief: campaignData.yourBrief,
      targetGroup: targetGroup,
      contentVibe: {
        contentType: campaignData.contentType,
        durationOfVideo: campaignData.videoDuration,
        catchPhrase: campaignData.catchPhrase,
        keyMessage: campaignData.keyMessage,
        toneStyle: campaignData.toneStyle,
        creatorLookingFor: campaignData.creatorType,
      },
      idealCreatorChecklist: {
        minFollowerCount: campaignData.minimumFollowers,
        ugcCreatorOrInfluencer: campaignData.creatorInfluencer,
        preferredSocialMedia: parseJsonArray(campaignData.socialMediaPlatform),
        pastExperience: campaignData.pastExperience,
        preferredCreatorNiche: parseJsonArray(
          campaignData.preferredCreatorNiche
        ),
        preferredCreatorDemographics: campaignData.preferredCreatorDemographics,
      },
      compensation: {
        budget: campaignData.budgetForCampaign,
        expectedDeliverables: campaignData.expectedDeliverables,
        deliveryDays: campaignData.noOfDaysForDelivery,
        additionalInstructions: campaignData.additionalInstructions,
        campaignPdf: campaignData.campaignPdf,
      },
      description: campaignData.campaignDescription,
      createdAt: "", // Optionally set this from backend if needed
      requirement: {
        location: parseJsonArray(campaignData.targetLocation),
        minFollowers: campaignData.minimumFollowers,
        minEngagement: "", // Add this in CampaignResponse if needed
      },
    };
  };

  const processedData = processData();

  return (
    <div className="bg-white rounded-lg space-y-4  p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className=" relative rounded-lg overflow-hidden">
          <Image
            src={processedData.image}
            alt={processedData.title}
            width={550}
            height={550}
            className="object-cover aspect-[16/9] rounded-lg"
          />
        </div>

        <div className="w-full  space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl text-gray-900 line-clamp-2 font-bold">
              {processedData.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src={
                processedData.image ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt="Campaign Image"
              width={40}
              height={40} // Make height equal to width for a perfect circle
              className="object-cover rounded-full h-10 w-10"
            />
            <p className="text-black text-lg">
              {processedData?.companyName || ""}
            </p>
          </div>

          {/* {!processedData.companyLogo && processedData.companyName && (
            <div className="flex items-center gap-4 ">
              <p className="text-black text-lg">{processedData.companyName}</p>
            </div>
          )} */}
        </div>
      </div>
      <div>
        {processedData.campaignObjective && (
          <div className="mt-4 flex flex-col gap-4 ">
            <h4 className="text-lg font-semibold">Campaign Objective</h4>
            <p className="text-gray-600">{processedData.campaignObjective}</p>
          </div>
        )}

        {processedData.campaignDescription && (
          <div className="mt-4 flex flex-col gap-4 my-3">
            <h4 className="text-lg font-semibold">Campaign Description</h4>
            <p className="text-gray-600">{processedData.campaignDescription}</p>
          </div>
        )}
        <hr />
        {processedData.yourBrief && (
          <div className="mt-4 flex flex-col gap-4 my-3">
            <h4 className="text-lg font-semibold">Campaign Brief</h4>
            <p className="text-gray-600">{processedData.yourBrief}</p>
          </div>
        )}

        <hr />
        {processedData.campaignConcept && (
          <div className="mt-4 flex flex-col gap-4 my-3">
            <h4 className="text-lg font-semibold">Campaign Concept</h4>
            <p className="text-gray-600">{processedData.campaignConcept}</p>
          </div>
        )}
        <hr />

        {processedData.targetGroup && (
          <div className="my-7">
            <h4 className="text-2xl font-semibold flex items-center gap-2 ">
              Target Audience & Demographics
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
              <div className="mt-4">
                <p className="font-medium ">Target Audience Age</p>
                <p className="text-gray-600">
                  {Array.isArray(processedData.targetGroup.age)
                    ? processedData.targetGroup.age.join(", ")
                    : processedData.targetGroup.age}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-medium">Target Audience Gender</p>
                <p className="text-gray-600">
                  {Array.isArray(processedData.targetGroup.gender)
                    ? processedData.targetGroup.gender.join(", ")
                    : processedData.targetGroup.gender}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-medium"> Target Audience Location</p>
                <p className="text-gray-600">
                  {Array.isArray(processedData.targetGroup.location)
                    ? processedData.targetGroup.location.join(", ")
                    : processedData.targetGroup.location || "Not specified"}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-medium"> Target Audience Interests</p>
                <p className="text-gray-600">
                  {Array.isArray(processedData.targetGroup.interest)
                    ? processedData.targetGroup.interest.join(", ")
                    : processedData.targetGroup.interest || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        )}

        <hr />

        {processedData.contentVibe && (
          <div className="mt-4 py-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <p className="text-2xl">What is the Content Vibe?</p>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-semibold text-lg">Content Type</p>
                <p className="text-gray-600">
                  {processedData.contentVibe.contentType}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Duration of Video</p>
                <p className="text-gray-600">
                  {processedData.contentVibe.durationOfVideo}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Call to Action</p>
                <p className="text-gray-600">
                  {processedData.contentVibe.catchPhrase}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Key Message & Hashtags</p>
                <p className="text-gray-600">
                  {processedData.contentVibe.keyMessage}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Tone & Style</p>
                <p className="text-gray-600">
                  {processedData.contentVibe.toneStyle}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  What kind of creator are you looking for?
                </p>
                <p className="text-gray-600">
                  {processedData.contentVibe.creatorLookingFor}
                </p>
              </div>
            </div>
          </div>
        )}

        <hr />

        {processedData.idealCreatorChecklist && (
          <div className="mt-4 py-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <p className="text-2xl  ">Ideal Creator Checklist</p>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="font-semibold text-lg">Minimum Follower Count</p>
                <p className="text-gray-600">
                  {processedData.idealCreatorChecklist.minFollowerCount}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  UGC Creator or Influencer
                </p>
                <p className="text-gray-600">
                  {processedData.idealCreatorChecklist.ugcCreatorOrInfluencer}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Preferred Social Media</p>
                <p className="text-gray-600">
                  {processedData.idealCreatorChecklist.preferredSocialMedia}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Past Experience</p>
                <p className="text-gray-600">
                  {processedData.idealCreatorChecklist.pastExperience}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Preferred Creator Niche</p>
                <p className="text-gray-600">
                  {processedData.idealCreatorChecklist.preferredCreatorNiche}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  Preferred Creator Demographics
                </p>
                <p className="text-gray-600">
                  {
                    processedData.idealCreatorChecklist
                      .preferredCreatorDemographics
                  }
                </p>
              </div>
            </div>
          </div>
        )}
        <hr />

        {processedData.compensation && (
          <div className="mt-4 py-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <p className="text-2xl ">Compensation & Deliverables</p>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="font-semibold text-lg">Budget for Campaign</p>
                <p className="text-gray-600">
                  ${processedData.compensation.budget}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Expected Deliverables</p>
                <p className="text-gray-600">
                  {processedData.compensation.expectedDeliverables}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  No. Of Days for Delivery
                </p>
                <p className="text-gray-600">
                  {processedData.compensation.deliveryDays}
                </p>
              </div>
              <div>
                <p className="text-lg">Required Documents</p>
                <p className="text-gray-600">
                  {processedData.campaignPdf ? (
                    <Link
                      href={processedData.campaignPdf || "#"}
                      target="_blank"
                      className="underline italic"
                    >
                      Link
                    </Link>
                  ) : (
                    <p>Not specified</p>
                  )}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Additional Instructions</p>
                <p className="text-gray-600">
                  {processedData.compensation.additionalInstructions ||
                    "Not Available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDescription;
