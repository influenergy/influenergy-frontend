import { transformPostData } from "@/utils/transformQuestionnaire";
import { api } from "./api";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface Video {
  title: string;
  image: string;
  url: string;
}

interface VideoListProps {
  videos: Video[];
}



export const postApi = {
  createAdPost: async (formData: PostQuestionnaireData) => {
    const transformedData = transformPostData(formData);

    console.log("postApi", transformedData);

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
  getCampaignByStatus: async (status: string) => {
    try {
      const response = await api.get(`/brand/campaigns/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching getCampaignByStatus :", error);
      throw error;
    }
  },
  findAIMatch: async (campaignId: string) => {
    try {
      const response = await api.get(`/brand/ai-find/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },
  getCreatorVideos: async (id: string) => {
    try {
      const response = await api.get(`/brand/social-videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching creator videos:", error);
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
      const response = await api.post(`/creator/add_social_video`);
      return response.data;
    } catch (error) {
      console.error("Error uploading post:", error);
      throw error;
    }
  },
  uploadVideoPost: async (data: VideoListProps) => {
    try {
      const response = await api.post(`/creator/add_social_video`, data);
      return response.data;
    } catch (error) {
      console.error("Error uploading post:", error);
      throw error;
    }
  },
};
