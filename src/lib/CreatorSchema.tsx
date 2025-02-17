import * as yup from "yup";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";

// Helper to ensure type safety between schema and interface
type Schema = yup.ObjectSchema<Partial<CreatorQuestionnaireData>>;

export const step1Schema = yup.object().shape({
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Non-binary", "Prefer not to say"], "Please select a valid gender")
    .required("Gender is required"),
  city: yup
    .string()
    .oneOf(
      ["New York", "Los Angeles", "Delhi", "Mumbai", "London", "Sydney"],
      "Please select a valid city"
    )
    .required("City is required"),
  dateOfBirth: yup
    .date()
    .nullable()
    .test("maxDate", "Date of birth cannot be in the future", (value: Date | null | undefined) => {
      if (!value) return false;
      return (value ?? new Date(1900, 0, 1)) <= new Date();
    })
    .test("minDate", "Date of birth is too old", (value: Date | null | undefined) => {
      if (!value) return false;
      return (value ?? new Date()) >= new Date(1900, 0, 1);
    })
    .required("Date of Birth is required")
    .transform((curr, orig) => (orig && new Date(orig)) || null),
  phoneNumber: yup
    .number()
    .typeError("Phone number must be a number")
    .test(
      "len", 
      "Phone number must be between 9-10 digits",
      (val: number | undefined) => {
        if (val === undefined) return false;
        const strVal = val.toString();
        return strVal.length >= 9 && strVal.length <= 10;
      }
    )
    .required("Phone Number is required"),
}) as Schema;

export const step2Schema = yup.object().shape({
  categories: yup
    .string()
    .oneOf([
      "Fashion & Apparel",
      "Beauty & Skincare",
      "Health & Wellness",
      "Food & Beverage",
      "Technology & Electronics",
      "Travel & Hospitality",
      "Education & E-learning",
      "Entertainment & Media",
      "Others"
    ], "Please select a valid category")
    .required("Category is required"),
}) as Schema;

export const step3Schema = yup.object().shape({
  contentType: yup
    .string()
    .min(10, "Please provide more details about your content type")
    .max(500, "Content type description is too long")
    .required("Content Type is required"),
  toolsAndPlatforms: yup
    .string()
    .min(10, "Please provide more details about your tools and platforms")
    .max(500, "Tools and platforms description is too long")
    .required("Tools and Platforms are required"),
  targetAudience: yup
    .string()
    .min(10, "Please provide more details about your target audience")
    .max(500, "Target audience description is too long")
    .required("Target Audience is required"),
  contentGoals: yup
    .string()
    .min(10, "Please provide more details about your content goals")
    .max(500, "Content goals description is too long")
    .required("Content Goals are required"),
}) as Schema;

// Full schema for complete validation
export const fullSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
}) as Schema;
