import { CampaignResponse, PostData, PostDescriptionProps } from "@/types/PostTypes";
import Image from "next/image";
import React from "react";

const PostDescription = ({ data }: PostDescriptionProps) => {
  // const [open, setOpen] = useState(false);

  // Function to process the data into the expected format
  const processData = (): PostData => {
    // If data is already in PostData format
    if ("image" in data && "title" in data) {
      return data as PostData;
    }

    // Otherwise, it's the campaign response, so map it
    const campaignData = data as CampaignResponse;

    // Try to parse JSON strings
    const parseJsonArray = (jsonStr: string | string[]): string => {
      if (Array.isArray(jsonStr)) {
        try {
          // If it's an array of JSON strings, parse the first one
          if (jsonStr.length > 0) {
            const parsed = JSON.parse(jsonStr[0]);
            return Array.isArray(parsed) ? parsed.join(", ") : jsonStr[0];
          }
          return "";
        } catch {
          // If parsing fails, it might not be a JSON string, so return the original array joined
          return jsonStr.join(", ");
        }
      }
      // Return the original string if it's not an array
      return jsonStr || "";
    };

    // Create target group text
    const targetGroup = [
      `Age: ${campaignData?.targetAgeGroup || "Not specified"}`,
      `Gender: ${campaignData.targetGender || "Not specified"}`,
      `Location: ${parseJsonArray(campaignData.targetLocation)}`,
      `Interests: ${parseJsonArray(campaignData.targetInterests)}`,
    ].join(", ");

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
        preferredSocialMedia: campaignData.socialMediaPlatform,
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
      createdAt: "", // You might want to add a createdAt field to CampaignResponse
      requirement: {
        location: parseJsonArray(campaignData.targetLocation),
        minFollowers: campaignData.minimumFollowers,
        minEngagement: "", // You might want to add a minEngagement field to CampaignResponse
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
            <div className=" relative rounded-full overflow-hidden flex items-center gap-4">
              <Image
                src={processedData.companyLogo}
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
            <div className="flex items-center gap-4">
              <p className="text-black text-lg">{processedData.companyName}</p>
            </div>
          )}
          {processedData.campaignObjective && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Campaign Objective</h4>
              <p className="text-gray-600">{processedData.campaignObjective}</p>
            </div>
          )}

          {processedData.campaignDescription && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Campaign Description</h4>
              <p className="text-gray-600">
                {processedData.campaignDescription}
              </p>
            </div>
          )}

          {processedData.targetGroup && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Target Group</h4>
              <p className="text-gray-600">{processedData.targetGroup}</p>
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
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
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
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
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
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
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
