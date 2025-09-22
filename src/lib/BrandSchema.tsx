import * as yup from "yup";

export const Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  companyWebsite: yup
  .string()
  .matches(
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
    "Please provide a valid company website URL, e.g., example.com or https://example.com"
  )
  .required("Website is required"),
  noOfEmployees: yup.string().required("Number of employees is required"),
  budgetForCampaign: yup.string().required("Budget is required"),
  howDidYouHearAboutThis: yup.string().required("Please tell us how you heard about us"),
});

export type BrandFormData = yup.InferType<typeof Schema>;
