import * as yup from "yup";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";

type Schema = yup.ObjectSchema<Partial<CreatorQuestionnaireData>>;

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 85); // 85 years ago

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 5); // 5 years ago

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
    .min(minDate, "Age must be at most 85 years")
    .max(maxDate, "Age must be at least 5 years")
    .required("Date of birth is required")
    .notOneOf([null], "Date of birth cannot be empty"),
}) as Schema;

export const step2Schema = yup.object().shape({
  gender: yup.string().required("Gender is required"),
  "gender-other": yup.string().when("gender", {
    is: (value: string) => value === "Others",
    then: (schema) => schema.required("Please specify your gender"),
    otherwise: (schema) => schema.optional(),
  }),
  country: yup
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
    .required("Primary niche is required"),
}) as Schema;

export const step3Schema = yup.object().shape({
  "tell-us-about-yourself": yup.string().required("This field is required"),
}) as Schema;

export const step4Schema = yup.object().shape({
  "primary-social-media": yup
    .string()
    .oneOf([
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Newsletter",
      "Pinterest",
      "TikTok",
      "Twitch",
      "Twitter / X",
      "Youtube",
      "Youtube Reel",
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
  "secondary-social-media": yup.string(),
  "secondary-social-media-link": yup.string(),
  "secondary-followers": yup.string(),
}) as Schema;

export const step5Schema = yup.object().shape({
  "primary-audience-location": yup
    .string()
    .oneOf([
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
    ])
    .required("This field is required"),
  "primary-audience-gender": yup.string().required("This field is required"),
  "primary-audience-gender-other": yup
    .string()
    .when("primary-audience-gender", {
      is: (value: string) => value === "Others",
      then: (schema) => schema.required("Please specify the gender"),
      otherwise: (schema) => schema.optional(),
    }),
  "primary-audience-age": yup.string().required("This field is required"),
  "primary-audience-percentage": yup
    .string()
    .required("This field is required"),

  "secondary-audience-location": yup.string(),
  "secondary-audience-gender": yup.string(),
  "secondary-audience-gender-other": yup
    .string()
    .when("secondary-audience-gender", {
      is: (value: string) => value === "Others",
      then: (schema) => schema.required("Please specify the gender"),
      otherwise: (schema) => schema.optional(),
    }),
  "secondary-audience-age": yup.string(),
  "secondary-audience-percentage": yup.string(),
}) as Schema;

export const step6Schema = yup.object().shape({
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
    .min(3, "Select three location")
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
}) as Schema;

export const step7Schema = yup
  .object()
  .shape({
    "top-two-audiences": yup
      .array()
      .of(yup.string())
      .min(2, "Select at least two age brackets")
      .max(2, "Select only two age brackets")
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
    "paid-campaigns": yup
      .string()
      .oneOf(["Yes", "No", "Gifted", "Affiliate Marketing", "Other"])
      .required("This field is required"),
    "budget-video": yup.string().required("Compensation per video is required"),
  })
  .nullable() as unknown as Schema;

export const fullSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
  ...step4Schema.fields,
  ...step5Schema.fields,
  ...step6Schema.fields,
  ...step7Schema.fields,
}) as Schema;
