import { api } from "./api";
import { PostQuestionnaireData } from "@/types/Questionnaire";

const transformPostData = (formData: PostQuestionnaireData) => {
  // Create FormData object to handle file upload
  const formDataToSend = new FormData();

  // Transform the field names to match backend schema
  const regularData = {
    campaignName: formData["compaign-name"],
    brandName: formData["brand-name"],
    campaignObjective: formData["campaign-objective"],
    campaignDescription: formData["campaign-description"],
    targetAgeGroup: formData["target-age-group"],
    targetGender:
      formData["target-gender"] === "Others"
        ? formData["target-gender-other"]
        : formData["target-gender"],
    targetLocation: formData["target-location"],
    targetInterests: formData["target-interests"],
    contentType: formData["content-type"],
    videoDuration: formData["video-duration"],
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
  };

  // Append regular data - handle arrays properly
  Object.entries(regularData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Convert array to string for FormData
      formDataToSend.append(key, JSON.stringify(value));
    } else {
      formDataToSend.append(key, value || "");
    }
  });

  return formDataToSend;
};

export const postApi = {
  createAdPost: async (formData: PostQuestionnaireData) => {
    const transformedData = transformPostData(formData);
    try {
      const response = await api.post("/brand/add-campaign", transformedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ad post:", error);
      throw error;
    }
  },

  getCampaigns: async () => {
    try {
      const response = await api.get("/brand/get-campaigns");
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },

  // Get a single campaign by ID
  getCampaignById: async (id: string) => {
    try {
      const response = await api.get(`/brand/campaign/${id}`);
      return response.data.campaign;
    } catch (error) {
      console.error(`Error fetching campaign with ID ${id}:`, error);
      throw error;
    }
  },
};
