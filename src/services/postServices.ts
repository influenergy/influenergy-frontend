import { transformPostData } from "@/utils/transformQuestionnaire";
import { api } from "./api";
import { PostQuestionnaireData, CampaignQuestionnaireData, CreateCampaignPayload } from "@/types/Questionnaire";

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
  createCampaign: async (formData: CreateCampaignPayload) => {
    // const transformedData = transformPostData(formData);
    try {
      const response = await api.post("/brand/add-new-campaign", formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ad post:", error);
      throw error;
    }
  },
  updateAdPost: async (formData: PostQuestionnaireData, createNew: boolean) => {
    const transformedData = transformPostData(formData);
    transformedData.append("createNew", String(createNew));

    try {
      const response = await api.put("/brand/update-campaign", transformedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating ad post:", error);
      throw error;
    }
  }
  ,
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
  getCampaignById: async (id: string, creatorId: string, status: string = "Completed") => {
    try {
      const response = await api.get(
        `/brand/campaign/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaign with ID ${id}:`, error);
      throw error;
    }
  },

  getCollabByStatus: async (status: string) => {
    try {
      const response = await api.get(`/brand/collab/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching getCollabByStatus :", error);
      throw error;
    }
  },
  getCollabByCampaignId: async (campaignId: string) => {
    try {
      const response = await api.get(`/creator/collab/campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching getCollabByStatus :", error);
      throw error;
    }
  },

  getCollabByCampaignIdForBrand: async (campaignId: string) => {
    try {
      const response = await api.get(`/brand/collab/campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching getCollabByStatus :", error);
      throw error;
    }
  },

  findAIMatch: async (campaignId: string, creatorId: string) => {
    try {
      const response = creatorId ? await api.get(`/brand/ai-find/${campaignId}?creatorId=${creatorId}`) : await api.get(`/brand/ai-find/${campaignId}`);
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
  getAllCampaigns: async () => {
    try {
      const response = await api.get(`/creator/getAllCampaign`);
      return response.data;
    } catch (error) {
      console.error("Error copying campaign:", error);
      throw error;
    }
  },
  copyCampaign: async (id: string, newName: string) => {
    try {
      const response = await api.post(`/brand/copy-campaign/${id}`, {
        newName,
      });
      return response.data;
    } catch (error) {
      console.error("Error copying campaign:", error);
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
  getCreatorProfileById: async (id: string) => {
    try {
      const response = await api.get(`/creator/profile/${id}`);

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
    payload: {
      brandId: string;
      // amount: number;
      coverMessage?: string;
      creatorBudget?: string;
      // portfolioLink?: string;
    }
  ) => {
    try {
      const response = await api.post(
        `/creator/create-collaboration/${campaignId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error creating collaboration:", error);
      throw error;
    }
  },
  inviteForCollaboration: async (
    campaignId: string,
    payload: {
      creatorId: string;
      coverMessage?: string;
      creatorBudget?: string;
      // portfolioLink?: string;
    }
  ) => {
    try {
      const response = await api.post(
        `/brand/collaboration-invite/${campaignId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error creating collaboration:", error);
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
      console.error("Error fetching acceptOrDeclineCollaboration :", error);
      throw error;
    }
  },
  changeCollaborationStatus: async (
    collaborationId: string,
    status: string
  ) => {
    try {
      const response = await api.put(
        `/brand/collaboration-status/${collaborationId}/${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching changeCollaborationStatus :", error);
      throw error;
    }
  },
  changeCampaignStatus: async (
    campaignId: string,
    status: string
  ) => {
    try {
      const response = await api.put(
        `/brand/campaign-status/${campaignId}/${status}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching changeCampaignStatus :", error);
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
  getCollaborationHistory: async () => {
    const response = await api.get(`/brand/collaborations-history`);
    return response.data; // return only the data payload
  },
  toggleFavoriteCreator: async (creatorId: string) => {
    const response = await api.post(`/brand/favorite/${creatorId}`)
    return response.data
  },
  deleteCollab: async (collabId: string) => {
    const response = await api.delete(`/brand/collab/${collabId}`)
    return response.data
  },

  // Get collaboration by ID (including campaign details)
  getCollaborationById: async (collaborationId: string) => {
    try {
      const response = await api.get(`/creator/collaboration/${collaborationId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching collaboration:", error);
      throw error;
    }
  },

  // Upload multiple videos with deliverable types
  uploadCollaborationVideos: async (
    collaborationId: string,
    deliverable: { link: string; deliverableType: string }
  ) => {
    try {
      const response = await api.put(
        `/creator/collaboration/add-video/${collaborationId}`,
        { deliverable }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading videos:", error);
      throw error;
    }
  },

  completeCollaboration: async (
    collaborationId: string,
  ) => {
    try {
      const response = await api.put(
        `/brand/complete-collaboration/${collaborationId}`,
      );
      
      return response.data;
    } catch (error) {
      console.error("Error uploading videos:", error);
      throw error;
    }
  },

  // uploadSingleDeliverable: async (
  //   collaborationId: string,
  //   deliverable: { link: string; deliverableType: string }
  // ) => {
  //   const response = await fetch(
  //     `/api/collaborations/${collaborationId}/deliverable`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Add auth headers if needed
  //       },
  //       body: JSON.stringify(deliverable),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Failed to upload deliverable");
  //   }

  //   return response.json();
  // },
};
