import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { api } from "./api";

interface UpdateProfileData {
  fullName?: string;
  photo?: File;
}

const transformQuestionnaireData = (
  formData: CreatorQuestionnaireData,
  id: string
) => {
  // Handle gender field - if gender is "Others", use the custom gender value
  let gender = formData.gender?.toLowerCase();
  if (gender === "others" && formData["gender-other"]) {
    gender = formData["gender-other"].toLowerCase();
  }

  // Handle custom niche values and map to valid backend categories
  const primaryNicheRaw = Array.isArray(formData["primary-niche"])
    ? formData["primary-niche"].filter((niche) => niche !== "Others")
    : formData["primary-niche"]
    ? [formData["primary-niche"]]
    : [];

  const transformedData = {
    fullName: formData["full-name"],
    stageName: formData["stage-name"],
    type: formData["are-you-ugc-creator"] === "UGC" ? "UGC" : "Creator",
    dob: formData.dob,
    gender: gender,
    city: formData.country, 
    languages: formData.language || ["English"],
    category: primaryNicheRaw,
    
    aboutYourself: formData["tell-us-about-yourself"],
    audienceInfo: {
      primaryPercentage:formData["primary-audience-percentage"] || "",
      primaryAge: formData["primary-audience-age"],
      primaryGender:
        formData["primary-audience-gender"] == "Others"
          ? formData["primary-audience-gender-other"]
          : formData["primary-audience-gender"],
      primaryLocation: formData["primary-audience-location"],
      secondaryPercentage:formData["secondary-audience-percentage"],
      secondaryAge: formData["secondary-audience-age"],
      secondaryGender:
        formData["secondary-audience-gender"] == "Others"
          ? formData["secondary-audience-gender-other"]
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
  };

  return transformedData;
};

export const userApi = {
  getProfile: async (id: string) => {
    const response = await api.get(`/creator/details/${id}`);
    return response.data;
  },
  updateProfile: async (
    data: UpdateProfileData | FormData,
    userType: string
  ) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/${userType}/update`, data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
  updateBrandProfile: async (
    id: string,
    data: {
      fullName: string;
      companyName: string;
      companyWebsite: string;
    }
  ) => {
    const isFormData = data instanceof FormData;
    const response = await api.patch(`/brand/update/${id}`, data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
  submitQuestionnaire: async (
    id: string,
    formData: CreatorQuestionnaireData
  ) => {
    const transformedData = transformQuestionnaireData(formData, id);
    // console.log("transformedData", transformedData);
    try {
      const response = await api.post(
        "/creator/add_profile_details",
        transformedData
      );
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
};
