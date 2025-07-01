import { PostQuestionnaireData } from "@/types/PostQuestionnaire";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";

export const transformQuestionnaireData = (
  formData: CreatorQuestionnaireData,
  id: string
) => {
  // Handle gender - include both selected and "other" if provided
  const gender = formData.gender?.toLowerCase();
  const genderList =
    gender === "others" && formData["gender-other"]
      ? [formData["gender-other"].toLowerCase()]
      : [gender];

  // Handle primary niche - include "others" custom input
  let primaryNicheRaw: string[] = [];

  if (Array.isArray(formData["primary-niche"])) {
    primaryNicheRaw = formData["primary-niche"].filter(
      (niche) => niche !== "Others"
    );
  } else if (formData["primary-niche"]) {
    primaryNicheRaw = [formData["primary-niche"]];
  }

  const transformedData = {
    fullName: formData["full-name"],
    stageName: formData["stage-name"],
    type: formData["are-you-ugc-creator"] === "UGC" ? "UGC" : "Creator",
    dob: formData.dob,
    gender: genderList.join(", "), // Combine gender + other if any
    city: formData.country,
    languages: formData.language || ["English"],
    category: primaryNicheRaw,

    aboutYourself: formData["tell-us-about-yourself"],
    audienceInfo: {
      primaryPercentage: formData["primary-audience-percentage"] || "",
      primaryAge: formData["primary-audience-age"],
      primaryGender:
        formData["primary-audience-gender"] === "Others" &&
        formData["primary-audience-gender-other"]
          ? `${formData["primary-audience-gender-other"]}`
          : formData["primary-audience-gender"],
      primaryLocation: formData["primary-audience-location"],
      secondaryPercentage: formData["secondary-audience-percentage"],
      secondaryAge: formData["secondary-audience-age"],
      secondaryGender:
        formData["secondary-audience-gender"] === "Others" &&
        formData["secondary-audience-gender-other"]
          ? `${formData["secondary-audience-gender-other"]}`
          : formData["secondary-audience-gender"],
      secondaryLocation: formData["secondary-audience-location"],
    },

    socialLinks: {
      primary: {
        platform: formData["primary-social-media"],
        link: formData["primary-social-media-link"],
        followers: formData["primary-followers"],
      },
      secondary: formData["secondary-social-media"]
        ? {
            platform: formData["secondary-social-media"],
            link: formData["secondary-social-media-link"],
            followers: formData["secondary-followers"],
          }
        : undefined,
    },

    creator: id,
    growthRate: formData["growth-rate"],
    audience: {
      audienceLocations: formData["primary-locations"],
      ageBracket: formData["top-two-audiences"],
      usBasedPercentage: formData["us-based-audience"],
    },
    averageView: formData["average-views"],
    favouriteBrands: formData["favourite-brands"],
    workedWithAIConsumerApps: formData["worked-with-ai"] === "Yes",
    hasPaidCampaignExperience: formData["paid-campaigns"] === "Yes",
    budgetVideo: formData["budget-video"],
    paymentMethod:formData['payment-method']
  };

  return transformedData;
};

export const transformPostData = (formData: PostQuestionnaireData) => {
  const formDataToSend = new FormData();

  // Merge "Others" into target-interests
  let mergedTargetInterests = formData["target-interests"] || [];
  if (mergedTargetInterests.includes("Others")) {
    mergedTargetInterests = [
      ...mergedTargetInterests.filter((i) => i !== "Others"), // remove "Others"
    ];
  }

  // Merge "Others" into target-gender
  let mergedTargetGender = formData["target-gender"] || [];
  if (mergedTargetGender.includes("Others")) {
    mergedTargetGender = [...mergedTargetGender.filter((i) => i !== "Others")];
  }

  const regularData = {
    _id: formData._id || "", // Use empty string if _id is not provided
    brandId: formData["brandId"],
    vectorId: formData["vectorId"],
    campaignName: formData["compaign-name"],
    brandName: formData["brand-name"],
    campaignObjective: formData["campaign-objective"],
    campaignDescription: formData["campaign-description"],
    targetAgeGroup: formData["target-age-group"],
    targetGender: mergedTargetGender,
    targetLocation: formData["target-location"],
    targetInterests: mergedTargetInterests,
    contentType: formData["content-type"],
    videoDuration: formData["video-duration"] || "",
    catchPhrase: formData["catch-phrase"],
    keyMessage: formData["key-message"],
    toneStyle: formData["tone-style"],
    creatorType: formData["creator-type"],
    minimumFollowers: formData["minimum-followers"],
    creatorInfluencer: formData["creator-influencer"],
    socialMediaPlatform: formData["social-media-platform"],
    pastExperience: formData["past-experience"],
    preferredCreatorNiche: formData["preferred-creator-niche"],
    preferredCreatorDemographics: formData["preferred-creator-demographics"],
    budgetForCampaign: formData["budget-for-campaign"],
    expectedDeliverables: formData["expected-deliverables"],
    noOfDaysForDelivery: formData["no-of-days-for-delivery"],
    additionalInstructions: formData["additional-instructions"] || "",
    campaignPost: formData["campaign-post"],
    campaignConcept: formData["compaign-concept"],
    yourBrief: formData["your-brief"],
  };

  Object.entries(regularData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formDataToSend.append(key, JSON.stringify(value));
    } else {
      formDataToSend.append(key, value || "");
    }
  });

  if (formData["requirement-documents"]) {
    formDataToSend.append(
      "requirementDocuments",
      formData["requirement-documents"]
    );
  }

  return formDataToSend;
};
