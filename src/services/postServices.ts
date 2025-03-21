import { transformPostData } from "@/utils/transformQuestionnaire";
import { api } from "./api";
import { PostQuestionnaireData } from "@/types/Questionnaire";



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
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaign with ID ${id}:`, error);
      throw error;
    }
  },
  getActiveCollaboration: async (id: string) => {
    try {
      const response = await api.get(`/brand/active-collaboration/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },
  getPendingCollaboration: async (id: string) => {
    try {
      const response = await api.get(`/brand/pending-collaboration/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },
  getCompletedCollaboration: async (id: string) => {
    try {
      const response = await api.get(`/brand/completed-collaboration/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },
  findAIMatch: async (vectorId: string) => {
    try {
      const response = await api.get(`/brand/ai-find/${vectorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },
  profileCardDetails: async (id: string) => {
    try {
      const response = await api.get(`/creator/details/${id}`);

      // Check if data exists and has the expected structure
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from API");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error fetching creator details:", error);
      throw error;
    }
  },
  getVideoPost: async () => {
    try {
      const response = await api.get(`/creator/social-videos`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  uploadVideoPost: async (data: FormData) => {
    try {
      const response = await api.post(`/creator/add_social_video`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading post:", error);
      throw error;
    }
  },
};
