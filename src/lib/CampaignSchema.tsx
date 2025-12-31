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

  socialPlatforms: yup
    .string()
    .min(1, "Select at least one platform")
    .required(),

  expectedDeliverables: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one deliverable")
    .required(),

  applicationQuestions: yup.string().optional(),

  status: yup
    .mixed<"DRAFT" | "PUBLISHED">()
    .oneOf(["DRAFT", "PUBLISHED"])
    .required(),
});
