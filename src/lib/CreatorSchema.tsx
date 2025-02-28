import * as yup from "yup";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";

type Schema = yup.ObjectSchema<Partial<CreatorQuestionnaireData>>;

export const step1Schema = yup.object().shape({
  "are-you-ugc-creator": yup
    .string()
    .oneOf(["Influencer", "UGC"], "Please select any option")
    .required("This field is required"),
  "full-name": yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  "stage-name": yup.string().nullable().optional(),
  dob: yup
    .date()
    .min(new Date(1900, 0, 1), "Date cannot be before 1900")
    .max(new Date(), "Date cannot be in the future")
    .required("Date of birth is required")
    .notOneOf([null], "Date of birth cannot be empty"),
}) as Schema;

export const step2Schema = yup.object().shape({
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Others"], "Please select a valid gender")
    .required("Gender is required"),
  country: yup
    .string()
    .oneOf(
      [
        "United States",
        "Canada",
        "Mexico",
        "France",
        "Germany",
        "Japan",
        "China",
        "India",
        "Australia",
        "Brazil",
      ],
      "Please select a valid country"
    )
    .required("Country is required"),

  language: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one language")
    .max(3, "Cannot select more than three languages")
    .required("Primary languages are required"),

  "primary-niche": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one niche")
    .max(3, "Cannot select more than three niches")
    .required("Primary niche is required"),
    
}) as Schema;

export const step3Schema = yup.object().shape({
  "primary-social-media": yup
    .string()
    .oneOf([
      "Instagram",
      "Facebook",
      "Twitter",
      "TikTok",
      "Snapchat",
      "YouTube",
      "Pinterest",
      "LinkedIn",
      "Reddit",
      "Tumblr",
    ])
    .required("This Field is Required"),
  "primary-social-media-link": yup
    .string()
    .url("Must be a valid URL")
    .required("This Field is Required"),
  "primary-followers": yup
    .string()
    .oneOf([
      "Less than 1,000",
      "1,000 - 10,000",
      "10,000 - 100,000",
      "100,000 - 1,000,000",
      "More than 1,000,000",
    ])
    .required("This Field is Required"),
  "secondary-social-media": yup
    .string()
    .oneOf([
      "Instagram",
      "Facebook",
      "Twitter",
      "TikTok",
      "Snapchat",
      "YouTube",
      "Pinterest",
      "LinkedIn",
      "Reddit",
      "Tumblr",
    ])
    .required("Required"),
  "secondary-social-media-link": yup
    .string()
    .url("Must be a valid URL")
    .required("This Field is Required"),
  "secondary-followers": yup
    .string()
    .oneOf([
      "Less than 1,000",
      "1,000 - 10,000",
      "10,000 - 100,000",
      "100,000 - 1,000,000",
      "More than 1,000,000",
    ])
    .required("This Field is Required"),
}) as Schema;

export const step4Schema = yup.object().shape({
  "growth-rate": yup
    .string()
    .oneOf([
      "Less than 10%",
      "10% - 20%",
      "20% - 30%",
      "30% - 40%",
      "40% - 50%",
      "50% - 60%",
      "60% - 70%",
      "70% - 80%",
      "80% - 90%",
      "90% - 100%",
      "More than 100%",
    ])
    .required("Growth rate is required"),
  "primary-locations": yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one location")
    .max(3, "Cannot select more than three locations")
    .required("Primary locations are required"),
  "us-based-audience": yup
    .string()
    .oneOf([
      "Less than 10%",
      "10% - 20%",
      "20% - 30%",
      "30% - 40%",
      "40% - 50%",
      "50% - 60%",
      "60% - 70%",
      "70% - 80%",
      "80% - 90%",
      "90% - 100%",
      "More than 100%",
    ])
    .required("US based audience percentage is required"),
  "gender-distribution": yup
    .string()
    .required("Gender distribution is required"),
}) as Schema;

export const step5Schema = yup.object().shape({
  "top-two-audiences": yup
    .string()
    .oneOf(["18-24", "25-34", "35-44", "45-54", "55-64", "65 or older"])
    .required("Age bracket is required"),
  "average-views": yup
    .string()
    .oneOf([
      "Less than 1,000",
      "1,000 - 10,000",
      "10,000 - 100,000",
      "100,000 - 1,000,000",
      "More than 1,000,000",
    ])
    .required("Average views is required"),
  "favourite-brands": yup.string().required("Favourite brands are required"),
  "worked-with-ai": yup
    .string()
    .oneOf(["Yes", "No"])
    .required("This field is required"),
  "paid-campaigns": yup.string().when("worked-with-ai", {
    is: "Yes",
    then: () =>
      yup
        .string()
        .oneOf(["1-5", "5-10", "10-20", "20-50", "50 or more"])
        .required("Number of paid campaigns is required"),
    otherwise: () => yup.string().nullable(),
  }),
}) as Schema;

export const fullSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
  ...step4Schema.fields,
  ...step5Schema.fields,
}) as Schema;
