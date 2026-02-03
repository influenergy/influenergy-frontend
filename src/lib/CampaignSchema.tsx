import * as yup from "yup";

// Helper to count words
const wordCount = (value?: string) =>
  value ? value.trim().split(/\s+/).length : 0;

export const createCampaignSchema = yup.object({
  // 🔹 Campaign Title — max 10 words
  campaignTitle: yup
    .string()
    .required("Please enter a campaign title")
    .test(
      "max-10-words",
      "Campaign title should be maximum 10 words",
      (value) => wordCount(value) <= 10
    ),

  // 🔹 Brand Name — max 5 words
  brandName: yup
    .string()
    .required("Please enter your brand name")
    .test(
      "max-5-words",
      "Brand name should be maximum 5 words",
      (value) => wordCount(value) <= 5
    ),

  // 🔹 Description / Creative Brief — 150–200 words
  campaignDescription: yup
    .string()
    .required("Please provide a campaign description")
    .test(
      "max-200-words",
      "Campaign description should be maximum 200 words",
      (value) => wordCount(value) <= 200
    ),

  // 🔹 Target Niche — array of strings, 3 to 8 selections
  targetNiche: yup
    .array()
    .of(yup.string().required())
    .max(8, "You can select maximum 8 niches")
    .required("Please select target niches"),

  // 🔹 Budget — required string, no word limit
  budgetForCampaign: yup
    .string()
    .required("Please enter your campaign budget"),

  // 🔹 Social Platform — required string
  socialPlatforms: yup
    .string()
    .required("Please select a social platform"),

  // 🔹 Expected Deliverables — required string
  // ✅ This handles the case where it might be initialized as empty array
  expectedDeliverables: yup
    .string()
    .required("Please select a deliverable")
    .test(
      "not-empty",
      "Please select a deliverable",
      (value) => value !== undefined && value !== null && value !== ""
    ),

  // 🔹 Requirements — optional string, 80–120 words if provided
  requirements: yup
    .string()
    .optional()
    .test(
      "max-120-words",
      "Requirements should be maximum 120 words",
      (value) => !value || wordCount(value) <= 120
    ),

  // 🔹 Application Questions — optional string
  applicationQuestions: yup
    .string()
    .optional(),

  // 🔹 Status — must be either DRAFT or PUBLISHED
  status: yup
    .mixed<"DRAFT" | "PUBLISHED">()
    .oneOf(["DRAFT", "PUBLISHED"])
    .required("Please select campaign status"),
});

// Export the inferred type to ensure type safety
export type CampaignFormData = yup.InferType<typeof createCampaignSchema>;