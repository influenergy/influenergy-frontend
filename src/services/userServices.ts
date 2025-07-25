import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { api } from "./api";
import { transformQuestionnaireData } from "@/utils/transformQuestionnaire";

interface UpdateProfileData {
  fullName?: string;
  photo?: File;
}

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
  updateBrandProfile: async (data: {
    fullName: string;
    companyName: string;
    companyWebsite: string;
  }) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/brand/update`, data, {
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
  submitLeftStep: async (
    currentStep: number
  ) => {
    try {
      const response = await api.post(
        "/creator/submit_left_step",
        { currentStep: currentStep || 0 }
      );
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  getProfileDetails: async (userType: string) => {
    const response = await api.get(`/${userType}/account_details`);
    return response.data;
  },
  getImprovementText: async () => {
    const response = await api.get(`/ai/create-improvement-text`);
    return response.data;
  },
  deleteAccount: async (userType: string) => {
    const response = await api.delete(`/request-delete-account/${userType}`);
    return response.data;
  },
  getProfileQuestionnaire: () => api.get(`/creator/questionnaire`),
  getRecommendedPriceRange: (data: { primaryFollowers: string; secondaryFollowers?: string }) =>
    api.post(`/creator/recommended-price-range`, data),
  getRegionAnalysis: async () => {
    const response = await api.get(`/brand/get-region-analysis`);
    return response.data; // return only the data payload
  },
};
