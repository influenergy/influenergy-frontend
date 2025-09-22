import * as yup from "yup";

export const profileSchema = yup.object({
  name: yup.string().required("Name is required"),
  businessEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  companyWebsite:yup
  .string()
  .matches(
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
    "Please provide a valid company website URL, e.g., example.com or https://example.com"
  ),
  employeeCount: yup
    .number()
    .min(1)
    .positive("Must be positive")
    .integer("Must be a whole number")
    .required("Employee count is required"),
});
