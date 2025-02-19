import * as yup from "yup";

export const socialSchema = yup.object({
  instagram: yup
    .string()
    .matches(
      /^https?:\/\/(www\.)?instagram\.com\/[^\/]+\/?$/,
      "Invalid Instagram URL"
    )
    .required("Instagram is required"),
  snapchat: yup
    .string()
    .matches(
      /^https?:\/\/(www\.)?snapchat\.com\/add\/[^\/]+\/?$/,
      "Invalid Snapchat URL"
    )
    .required("Snapchat is required"),
  tiktok: yup
    .string()
    .matches(
      /^https?:\/\/(www\.)?tiktok\.com\/[^\/]+\/?$/,
      "Invalid TikTok URL"
    )
    .required("TikTok is required"),
});

