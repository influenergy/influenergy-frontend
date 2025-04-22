import { api } from "./api";

export const paymentApi = {
  initiatePayment: async (
    campaignId: string,
    amount: string,
    creatorId: string,
    similarity: string
  ) => {
    const response = await api.post(
      `/stripe/create-payment-session/${campaignId}`,
      {
        amount,
        creatorId,
        similarity,
      }
    );
    return response.data;
  },
};
