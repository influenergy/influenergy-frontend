import * as yup from "yup";

export const createCampaignSchema = yup.object({
  campaignTitle: yup.string().required().min(2),
  brandName: yup.string().required(),
  campaignDescription: yup.string().required().min(10),

  targetNiche: yup
    .array()
    .of(yup.string().required())
    .min(1)
    .required(),

  budgetForCampaign: yup.string().required(),

  expectedDeliverables: yup
    .array()
    .of(yup.string().required())
    .min(1)
    .required(),

  applicationQuestions: yup.string().optional(), // ✅ FIXED

  status: yup
    .mixed<"DRAFT" | "PUBLISHED">()
    .oneOf(["DRAFT", "PUBLISHED"])
    .required(),
});
