import {
  CampaignResponse,
  PostData,
  PostDescriptionProps,
} from "@/types/PostTypes";
import Image from "next/image";
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
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-fit relative rounded-lg overflow-hidden ">
          <Image
            src={processedData.image}
            alt={processedData.title}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>

        <div className="w-full  space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl  text-gray-900 line-clamp-2">
              {processedData.title}
            </h3>
          </div>
          {processedData.companyLogo && (
            <div className=" relative rounded-full overflow-hidden flex items-center gap-4 md:pl-8">
              <Image
                src={processedData.image}
                alt="Company Logo"
                height={30}
                width={30}
                className="object-cover rounded-full"
              />
              <p className="text-black text-lg">
                {processedData?.companyName || "Nike"}
              </p>
            </div>
          )}
          {!processedData.companyLogo && processedData.companyName && (
            <div className="flex items-center gap-4 md:pl-8">
              <p className="text-black text-lg">{processedData.companyName}</p>
            </div>
          )}
          {processedData.campaignObjective && (
            <div className="mt-4 md:pl-8">
              <h4 className="text-lg font-semibold">Campaign Objective</h4>
              <p className="text-gray-600">{processedData.campaignObjective}</p>
            </div>
          )}

          {processedData.campaignDescription && (
            <div className="mt-4 md:pl-8">
              <h4 className="text-lg font-semibold">Campaign Description</h4>
              <p className="text-gray-600">
                {processedData.campaignDescription}
              </p>
            </div>
          )}

          {processedData.targetGroup && (
            <div className="mt-4 md:pl-8 space-y-1">
              <h4 className="text-lg font-semibold">Target Group</h4>

              <p className="text-gray-600">
                <strong>Age:</strong>{" "}
                {Array.isArray(processedData.targetGroup.age)
                  ? processedData.targetGroup.age.join(", ")
                  : processedData.targetGroup.age}
              </p>

              <p className="text-gray-600">
                <strong>Gender:</strong>{" "}
                {Array.isArray(processedData.targetGroup.gender)
                  ? processedData.targetGroup.gender.join(", ")
                  : processedData.targetGroup.gender}
              </p>

              <p className="text-gray-600">
                <strong>Location:</strong>{" "}
                {Array.isArray(processedData.targetGroup.location)
                  ? processedData.targetGroup.location.join(", ")
                  : processedData.targetGroup.location || "Not specified"}
              </p>

              <p className="text-gray-600">
                <strong>Interests:</strong>{" "}
                {Array.isArray(processedData.targetGroup.interest)
                  ? processedData.targetGroup.interest.join(", ")
                  : processedData.targetGroup.interest || "Not specified"}
              </p>
            </div>
          )}

          {processedData.contentVibe && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                What is the Content Vibe?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Content Type</p>
                  <p>{processedData.contentVibe.contentType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration of Video</p>
                  <p>{processedData.contentVibe.durationOfVideo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Catch Phrase</p>
                  <p>{processedData.contentVibe.catchPhrase}</p>
                </div>
                <div>
                  <p className="text-gray-600">Key Message & Hashtags</p>
                  <p>{processedData.contentVibe.keyMessage}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tone & Style</p>
                  <p>{processedData.contentVibe.toneStyle}</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    What kind of creator are you looking for?
                  </p>
                  <p>{processedData.contentVibe.creatorLookingFor}</p>
                </div>
              </div>
            </div>
          )}

          {processedData.idealCreatorChecklist && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/2.png"
                    alt=""
                    width={18}
                    height={18}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                Ideal Creator Checklist
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Minimum Follower Count</p>
                  <p>{processedData.idealCreatorChecklist.minFollowerCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">UGC Creator or Influencer</p>
                  <p>
                    {processedData.idealCreatorChecklist.ugcCreatorOrInfluencer}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Preferred Social Media</p>
                  <p>
                    {processedData.idealCreatorChecklist.preferredSocialMedia}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Past Experience</p>
                  <p>{processedData.idealCreatorChecklist.pastExperience}</p>
                </div>
                <div>
                  <p className="text-gray-600">Preferred Creator Niche</p>
                  <p>
                    {processedData.idealCreatorChecklist.preferredCreatorNiche}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Preferred Creator Demographics
                  </p>
                  <p>
                    {
                      processedData.idealCreatorChecklist
                        .preferredCreatorDemographics
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {processedData.compensation && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/3.png"
                    alt=""
                    width={45}
                    height={45}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                Compensation & Deliverables
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Budget for Campaign</p>
                  <p>${processedData.compensation.budget}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected Deliverables</p>
                  <p>{processedData.compensation.expectedDeliverables}</p>
                </div>
                <div>
                  <p className="text-gray-600">No. Of Days for Delivery</p>
                  <p>{processedData.compensation.deliveryDays}</p>
                </div>
                <div>
                  <p className="text-gray-600">Additional Instructions</p>
                  <p>
                    {processedData.compensation.additionalInstructions ||
                      "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
