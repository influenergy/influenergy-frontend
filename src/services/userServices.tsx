import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { api } from "./api";

interface UpdateProfileData {
  fullName?: string;
  photo?: File;
}
// interface UpdateBrandProfileData {
//   fullName: string;
//   email: string;
//   companyName: string;
//   companyWebsite: string;
// }
const transformQuestionnaireData = (
  formData: CreatorQuestionnaireData,
  id: string
) => {
  const transformedData = {
    fullName: formData["full-name"],
    stageName: formData["stage-name"],
    type: formData["are-you-ugc-creator"] === "Yes" ? "UGC" : "Creator",
    dob: formData.dob,
    gender: formData.gender.toLowerCase(),
    city: formData.country, // Using country as city for now
    languages: ["English"], // Default language
    category: formData["primary-niche"],
    socialLinks: {
      primary: {
        platform: formData["primary-social-media"],
        link: formData["primary-social-media-link"],
        followers: parseInt(formData["primary-social-media-followers"] || "0"),
      },
      secondary: {
        platform: formData["secondary-social-media"],
        link: formData["secondary-social-media-link"],
        followers: parseInt(
          formData["secondary-social-media-followers"] || "0"
        ),
      },
    },
    creator: id,
    growthRate: parseInt(formData["growth-rate"]),
    audience: {
      audienceLocations: formData["primary-locations"],
      genderDistribution: formData["gender-distribution"],
      ageBracket: formData["top-two-audiences"],
    },
    averageView: parseInt(
      formData["average-views"].replace(/[^0-9]/g, "") || "0"
    ),
    favouriteBrands: formData["favourite-brands"],
    workedWithAIConsumerApps: formData["worked-with-ai"] === "Yes",
    paidCampaigns: formData["paid-campaigns"] || "0",
  };

  return transformedData;
};

export const userApi = {
  getProfile: async (id: string) => {
    const response = await api.get(`/creator/details/${id}`);
    return response.data;
  },
  updateProfile: async (data: UpdateProfileData | FormData) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/creator/update`, data, {
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
      email: string;
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
    const response = await api.post(
      "/creator/add_profile_details",
      transformedData
    );
    return response.data;
  },
};
