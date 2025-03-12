import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { api } from "./api";

interface UpdateProfileData {
  fullName?: string;
  photo?: File;
}

const transformQuestionnaireData = (
  formData: CreatorQuestionnaireData,
  id: string
) => {
  // Handle gender field - if gender is "Others", use the custom gender value
  let gender = formData.gender?.toLowerCase();
  if (gender === "others" && formData["gender-other"]) {
    gender = formData["gender-other"].toLowerCase();
  }

  // Handle custom niche values and map to valid backend categories
  const primaryNicheRaw = Array.isArray(formData["primary-niche"])
    ? formData["primary-niche"].filter((niche) => niche !== "Others")
    : formData["primary-niche"]
    ? [formData["primary-niche"]]
    : [];

  const transformedData = {
    fullName: formData["full-name"],
    stageName: formData["stage-name"],
    type: formData["are-you-ugc-creator"] === "UGC" ? "UGC" : "Creator",
    dob: formData.dob,
    gender: gender,
    city: formData.country, // Using country as city for now
    languages: formData.language || ["English"], // Use selected languages or default
    category: primaryNicheRaw,

    // New fields from step 3
    aboutYourself: formData["tell-us-about-yourself"],
    audienceInfo: {
      primaryAge: formData["primary-audience-age"],
      primaryGender: formData["primary-audience-gender"],
      primaryLocation: formData["primary-audience-location"],
    },

    socialLinks: {
      primary: {
        platform: formData["primary-social-media"],
        link: formData["primary-social-media-link"],
        followers: extractNumber(formData["primary-followers"]),
      },
      secondary: formData["secondary-social-media"]
        ? {
            platform: formData["secondary-social-media"],
            link: formData["secondary-social-media-link"],
            followers: extractNumber(formData["secondary-followers"]),
          }
        : undefined,
    },
    creator: id,
    growthRate: parsePercentage(formData["growth-rate"]),
    audience: {
      audienceLocations: formData["primary-locations"],
      genderDistribution: formData["gender-distribution"],
      ageBracket: formData["top-two-audiences"],
      usBasedPercentage: parsePercentage(formData["us-based-audience"]),
    },
    averageView: extractNumber(formData["average-views"]),
    favouriteBrands: formData["favourite-brands"],
    workedWithAIConsumerApps: formData["worked-with-ai"] === "Yes",
    hasPaidCampaignExperience: formData["paid-campaigns"] === "Yes", // Updated to match new field format
    budgetVideo: formData["budget-video"],
  };

  return transformedData;
};

// Helper function to extract numbers from string formats
const extractNumber = (value?: string): number => {
  if (!value) return 0;

  // For "Less than X" format
  if (value.includes("Less than")) {
    const match = value.match(/Less than ([\d,]+)/);
    if (match && match[1]) {
      return Math.floor(parseFloat(match[1].replace(/,/g, "")) / 2); // Half of the upper limit
    }
    return 0;
  }

  // For "More than X" format
  if (value.includes("More than")) {
    const match = value.match(/More than ([\d,]+)/);
    if (match && match[1]) {
      return parseFloat(match[1].replace(/,/g, "")) * 1.5; // 1.5 times the lower limit
    }
    return 0;
  }

  // For "X - Y" format
  const rangeMatch = value.match(/([\d,]+)\s*-\s*([\d,]+)/);
  if (rangeMatch && rangeMatch.length >= 3) {
    const min = parseFloat(rangeMatch[1].replace(/,/g, ""));
    const max = parseFloat(rangeMatch[2].replace(/,/g, ""));
    return Math.floor((min + max) / 2); // Average of range
  }

  // For simple numbers (like "1-5")
  if (value.includes("-")) {
    const parts = value.split("-");
    if (parts.length === 2) {
      const min = parseInt(parts[0]);
      const max = parseInt(parts[1]);
      if (!isNaN(min) && !isNaN(max)) {
        return Math.floor((min + max) / 2);
      }
    }
  }

  // Try to extract any numeric value
  const numMatch = value.match(/(\d+)/);
  if (numMatch && numMatch[1]) {
    return parseInt(numMatch[1]);
  }

  return 0;
};

// Helper function to parse percentage ranges
const parsePercentage = (percentageRange?: string): number => {
  if (!percentageRange) return 0;

  // For "Less than X%" format
  if (percentageRange.includes("Less than")) {
    const match = percentageRange.match(/Less than (\d+)%/);
    if (match && match[1]) {
      return Math.floor(parseInt(match[1]) / 2); // Half of the upper limit
    }
    return 5; // Default
  }

  // For "More than X%" format
  if (percentageRange.includes("More than")) {
    const match = percentageRange.match(/More than (\d+)%/);
    if (match && match[1]) {
      return parseInt(match[1]); // Use the lower limit
    }
    return 100; // Default
  }

  // For "X% - Y%" format
  const matches = percentageRange.match(/(\d+)%\s*-\s*(\d+)%/);
  if (matches && matches.length >= 3) {
    const min = parseInt(matches[1]);
    const max = parseInt(matches[2]);
    return Math.floor((min + max) / 2); // Average of range
  }

  // Try to extract any numeric value
  const numMatch = percentageRange.match(/(\d+)/);
  if (numMatch && numMatch[1]) {
    return parseInt(numMatch[1]);
  }

  return 0;
};

export const userApi = {
  getProfile: async (id: string) => {
    const response = await api.get(`/creator/details/${id}`);
    return response.data;
  },
  updateProfile: async (data: UpdateProfileData | FormData) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/creator/update`, data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
  updateBrandProfile: async (
    id: string,
    data: {
      fullName: string;
      email: string;
      companyName: string;
      companyWebsite: string;
    }
  ) => {
    const isFormData = data instanceof FormData;
    const response = await api.patch(`/brand/update/${id}`, data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
  submitQuestionnaire: async (
    id: string,
    formData: CreatorQuestionnaireData
  ) => {
   
    const transformedData = transformQuestionnaireData(formData, id);
    

    try {
      const response = await api.post(
        "/creator/add_profile_details",
        transformedData
      );
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
};
