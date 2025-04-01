import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../services/paymentServices";

interface PaymentData {
  campaignId: string;
  amount: string;
  creatorId: string;
  similarity: string;
}

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (data: PaymentData) => {
      return await paymentApi.initiatePayment(
        data.campaignId,
        data.amount,
        data.creatorId,
        data.similarity
      );
    },
  });
};
