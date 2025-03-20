import * as yup from "yup";
import { PostQuestionnaireData } from "@/types/Questionnaire";

type Schema = yup.ObjectSchema<Partial<PostQuestionnaireData>>;

export const step1Schema = yup.object().shape({
  "brand-name": yup
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .required("Brand name is required"),
  "campaign-objective": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one objective")
    .required("Campaign objective is required"),
  "campaign-description": yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Campaign description is required"),
  "campaign-post": yup.string().required("Campaign post is required"),
}) as Schema;

export const step2Schema = yup.object().shape({
  "target-age-group": yup.string().required("Target age group is required"),
  "target-gender": yup
    .string()
    .oneOf(
      ["Male", "Female", "Non-binary", "Prefer not to say", "Others"],
      "Please select a valid gender"
    )
    .required("Target gender is required"),
  "target-gender-other": yup.string().when("target-gender", {
    is: (value: string) => value === "Others",
    then: (schema) => schema.required("Please specify the gender"),
    otherwise: (schema) => schema.optional(),
  }),
  "target-location": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one location")
    .required("Target location is required"),
  "target-interests": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one interest")
    .required("Target interests are required"),
}) as Schema;

export const step3Schema = yup.object().shape({
  "compaign-name": yup
    .string()
    .min(2, "Campaign name must be at least 2 characters")
    .required("Campaign name is required"),
  "your-brief": yup.string().required("Your brief is required"),
  "compaign-concept": yup.string().required("Campaign concept is required"),
}) as Schema;

export const step4Schema = yup.object().shape({
  "content-type": yup
    .string()
    .oneOf(["Reels", "Long form videos"], "Please select a valid content type")
    .required("Content type is required"),
  "video-duration": yup.string().when("content-type", {
    is: (val: string) => ["Reels", "Long form videos"].includes(val),
    then: (schema) =>
      schema
        .oneOf(
          [
            "Less than 1 minute",
            "1-5 minutes",
            "5-15 minutes",
            "15-30 minutes",
            "30-60 minutes",
            "More than 60 minutes",
          ],
          "Please select a valid duration"
        )
        .required("Video duration is required"),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  "catch-phrase": yup.string().required("Catch phrase is required"),
  "key-message": yup.string().required("Key message is required"),
  "tone-style": yup.string().required("Tone and style is required"),
  "creator-type": yup
    .string()
    .oneOf(
      [
        "Nano (<1,000 followers)",
        "Micro (1,000 - 100,000 followers)",
        "Mid-Tier (100,000 - 500,000 followers)",
        "Macro (500,000 - 1,000,000 followers)",
        "Mega/Celebrity (1,000,000+ followers)",
      ],
      "Please select a valid creator type"
    )
    .required("Creator type is required"),
}) as Schema;

export const step5Schema = yup.object().shape({
  "minimum-followers": yup
    .string()
    .oneOf(
      [
        "Less than 1,000",
        "1,000 - 10,000",
        "10,000 - 100,000",
        "100,000 - 1,000,000",
        "More than 1,000,000",
      ],
      "Please select a valid follower count"
    )
    .required("Minimum followers is required"),
  "creator-influencer": yup
    .string()
    .oneOf(
      ["UGC Creator", "Influencer", "Both"],
      "Please select a valid option"
    )
    .required("This field is required"),
  "social-media-platform": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one platform")
    .required("Social Media Platform are required"),
  "past-experience": yup
    .string()
    .oneOf(["Yes", "No"], "Please select a valid option")
    .required("This field is required"),
  "preferred-creator-niche": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one niche")
    .required("Preferred creator niche is required"),
  "preferred-creator-demographics": yup
    .string()
    .oneOf(
      [
        "Australia",
        "Brazil",
        "Canada",
        "China",
        "France",
        "Germany",
        "India",
        "Italy",
        "Japan",
        "Mexico",
        "Netherlands",
        "Russia",
        "Saudi Arabia",
        "South Korea",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "United Kingdom",
        "United States",
      ],
      "Please select a valid country"
    )
    .required("Preferred creator demographics is required"),
}) as Schema;

export const step6Schema = yup.object().shape({
  "budget-for-campaign": yup.string().required("Budget is required"),
  "expected-deliverables": yup
    .string()
    .oneOf(["Reels", "Long form videos"], "Please select a valid deliverable")
    .required("Expected deliverables is required"),
  "no-of-days-for-delivery": yup
    .string()
    .oneOf(
      ["1-5", "5-10", "10-20", "20-50", "50 or more"],
      "Please select a valid option"
    )
    .required("Delivery timeframe is required"),
  "additional-instructions": yup.string().nullable().optional(),
}) as Schema;

export const PostSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
  ...step4Schema.fields,
  ...step5Schema.fields,
  ...step6Schema.fields,
}) as Schema;
 