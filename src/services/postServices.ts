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
      const response = await api.get(`/creator/social-videos`);
      return response.data;
    } catch (error) {
      console.error("Error uploading post:", error);
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
  addVideoUrl: async (data: string, collaborationId: string) => {
    try {
      const response = await api.put(
        `/creator/collaboration/add-video/${collaborationId}`,
        { videoUrl: data }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading post:", error);
      throw error;
    }
  },
  createCollaboration: async (
    campaignId: string,
    creatorId: string,
    amount: string
  ) => {
    try {
      const response = await api.post(
        `/brand/create-collaboration/${campaignId}`,
        {
          creatorId,
          amount,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaign with ID ${campaignId}:`, error);
      throw error;
    }
  },
  getCollaborationByStatus: async (status: string) => {
    try {
      const response = await api.get(`/creator/collaboration/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching getCollaborationByStatus :", error);
      throw error;
    }
  },
  acceptOrDeclineCollaboration: async (
    collaborationId: string,
    status: string
  ) => {
    try {
      const response = await api.put(
        `/creator/collaboration-status/${collaborationId}/${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching getCollaborationByStatus :", error);
      throw error;
    }
  },
  acceptOrDeclineVideo: async (
    collaborationId: string,
    videoId: string,
    status: string,
    message?: string
  ) => {
    try {
      const response = await api.put(
        `/brand/collaboration-video/status/${collaborationId}/${videoId}`,
        {
          status,
          message: message || "",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching acceptOrDeclineVideo :", error);
      throw error;
    }
  },

  paymentCollect: async (
    collaborationId: string,
    payload: {
      fullName: string;
      email: string;
      selectedMethod: string;
      paymentDetail: string;
    }
  ) => {
    try {
      const response = await api.put(
        `/creator/collaboration/get-payment/${collaborationId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  getAISummary: async (creatorId: string, campaignId: string) => {
    try {
      const response = await api.get(
        `/ai/create-text/${creatorId}/${campaignId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};
