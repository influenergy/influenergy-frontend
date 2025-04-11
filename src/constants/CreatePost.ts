import { LucideIcon, User, Book, ChartPie, Share2, Users } from "lucide-react";
export interface Field {
  title: string;
  category:
    | "text"
    | "number"
    | "date"
    | "dropdown"
    | "email"
    | "text"
    | "textarea"
    | "multiselect"
    | "file"
    | "range";
  slug: string;
  options?: string[];
  dependsOn?: string;
}

interface Step {
  title?: string;
  description?: string;
  icon: LucideIcon;
  fields: Field[];
}

interface Questions {
  [key: string]: Step;
}

export const CREATE_POST: Questions = {
  step1: {
    title: "Basic Information",
    icon: User,
    description: "Give us the basics so we can match you better 🎯",
    fields: [
      {
        title: "Brand Name",
        slug: "brand-name",
        category: "text",
      },
      {
        title: "Campaign Objective",
        slug: "campaign-objective",
        category: "multiselect",
        options: [
          "App Installs",
          "Awareness",
          "Conversions",
          "Engagement",
          "Leads",
          "Sales",
          "Sign-ups",
          "Traffic",
          "Video Views",
        ],
      },
      {
        title: "Campaign Description",
        slug: "campaign-description",
        category: "textarea",
      },
      {
        title: "Campaign Post",
        slug: "campaign-post",
        category: "file",
      },
    ],
  },
  step2: {
    title: "Target Audience & Demographics",
    icon: Users,
    description:
      " Tell us about your ideal audience. Help us connect you with the right people.🚀",
    fields: [
      {
        title: "Target Audience Age Group",
        slug: "target-age-group",
        category: "multiselect",
        options: ["<18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      },
      {
        title: "Target Audience Gender",
        slug: "target-gender",
        category: "multiselect",
        options: [
          "Male",
          "Female",
          "Non-binary",
          "Prefer not to say",
          "Others",
        ],
      },
      {
        title: "Target Audience Location",
        slug: "target-location",
        category: "multiselect",
        options: [
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
      },
      {
        title: "Target Audience Interests & Niche",
        slug: "target-interests",
        category: "multiselect",
        options: [
          "AI",
          "Beauty & Care",
          "Business & Finance",
          "Events",
          "Fashion & Style",
          "Food & Drinks",
          "Foodie",
          "Gaming",
          "Hair",
          "Health & Wellness",
          "Homemade",
          "Home & Garden",
          "Jewellery",
          "Kids & Parenting",
          "Lifestyle",
          "Makeup",
          "Music",
          "Nutrition",
          "Outdoors & Nature",
          "Pet",
          "Photography",
          "Restaurants",
          "Skincare",
          "Sports & Fitness",
          "Tech Apps",
          "Travel",
          "Yoga",
          "Others",
        ],
      },
    ],
  },
  step3: {
    title: "What's Your Brief",
    icon: Users,
    description:
      "Tell us about your ideal audience. Help us connect you with the right people.🚀",
    fields: [
      {
        title: "Compaign Name",
        slug: "compaign-name",
        category: "text",
      },
      {
        title: "Write Your Brief",
        slug: "your-brief",
        category: "textarea",
      },
      {
        title: "Compaign Concept",
        slug: "compaign-concept",
        category: "textarea",
      },
    ],
  },

  step4: {
    title: "What’s the Content Vibe?",
    icon: Share2,
    description: "From reels to blogs, what’s your flavor?. 🎥",
    fields: [
      {
        title: "What's Your Content Type?",
        slug: "content-type",
        category: "dropdown",
        options: ["Reels", "Long form videos"],
      },
      {
        title: "Duration Of Video?",
        slug: "video-duration",
        category: "dropdown",
        options: [
          "Less than 1 minute",
          "1-5 minutes",
          "5-15 minutes",
          "15-30 minutes",
          "30-60 minutes",
          "More than 60 minutes",
        ],
      },
      {
        title: "Call to Action",
        slug: "catch-phrase",
        category: "textarea",
      },
      {
        title: "Key Message & Hashtags",
        slug: "key-message",
        category: "textarea",
      },
      {
        title: "Tone & Style?",
        slug: "tone-style",
        category: "dropdown",
        options: [
          "Casual",
          "Professional",
          "Friendly",
          "Inspirational",
          "Educational",
          "Entertaining",
          "Promotional",
          "Conversational",
          "Humorous",
          "Formal",
          "Informative",
          "Narrative",
          "Personal",
          "Storytelling",
          "Visual",
          "Interactive",
          "Innovative",
          "Authentic",
          "Bold",
          "Creative",
          "Dynamic",
          "Energetic",
          "Engaging",
          "Fresh",
          "Fun",
          "Impactful",
          "Inspiring",
          "Motivating",
          "Original",
          "Passionate",
          "Powerful",
          "Provocative",
          "Relevant",
          "Thoughtful",
          "Unique",
          "Uplifting",
          "Vibrant",
          "Youthful",
        ],
      },
      {
        title: "What kind of creator you are looking for?",
        slug: "creator-type",
        category: "dropdown",
        options: [
          "Nano (<1,000 followers)",
          "Micro (1,000 - 100,000 followers)",
          "Mid-Tier (100,000 - 500,000 followers)",
          "Macro (500,000 - 1,000,000 followers)",
          "Mega/Celebrity (1,000,000+ followers)",
        ],
      },
    ],
  },
  step5: {
    title: "Your Ideal Creator Checklist!",
    icon: ChartPie,
    description: "Define your ideal creator, and we’ll do the rest.📢",
    fields: [
      {
        title: "Minimum Follower Count",
        slug: "minimum-followers",
        category: "dropdown",
        options: [
          "Less than 1,000",
          "1,000 - 10,000",
          "10,000 - 100,000",
          "100,000 - 1,000,000",
          "More than 1,000,000",
        ],
      },
      {
        title: "UGC Creator or Influencer? ",
        slug: "creator-influencer",
        category: "dropdown",
        options: ["UGC Creator", "Influencer", "Both"],
      },
      {
        title: "Preferred Social Media Plaform",
        slug: "social-media-platform",
        category: "multiselect",
        options: [
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
        ],
      },
      {
        title: "Past Experience",
        slug: "past-experience",
        category: "dropdown",
        options: ["Yes", "No"],
      },
      {
        title: "Preferred Creator Niche",
        slug: "preferred-creator-niche",
        category: "multiselect",
        options: [
          "Beauty & Care",
          "Business & Finance",
          "Events",
          "Fashion & Style",
          "Food & Drinks",
          "Foodie",
          "Gaming",
          "Hair",
          "Health & Wellness",
          "Homemade",
          "Home & Garden",
          "Jewellery",
          "Kids & Parenting",
          "Lifestyle",
          "Makeup",
          "Music",
          "Nutrition",
          "Outdoors & Nature",
          "Pet",
          "Photography",
          "Restaurants",
          "Skincare",
          "Sports & Fitness",
          "Tech",
          "Travel",
          "Yoga",
          "Others",
        ],
      },
      {
        title: "Preferred country of the creator",
        slug: "preferred-creator-demographics",
        category: "dropdown",
        options: [
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
      },
    ],
  },
  step6: {
    title: "Compensation & Deliverables!",
    icon: Book,
    description:
      "Define your compensation & deliverables and we’ll do the rest.📝",
    fields: [
      {
        title: "Budget for Campaign",
        slug: "budget-for-campaign",
        category: "range",
      },
      {
        title: "Expected Deliverables ",
        slug: "expected-deliverables",
        category: "dropdown",
        options: ["Reels", "Long form videos"],
      },
      {
        title: "No. Of Days for Delivery",
        slug: "no-of-days-for-delivery",
        category: "dropdown",
        options: ["1-5", "5-10", "10-20", "20-50", "50 or more"],
      },
      {
        title: "Additional Instructions",
        slug: "additional-instructions",
        category: "textarea",
      },
      {
        title: "Requirement Documents",
        slug: "requirement-documents",
        category: "file",
      },
    ],
  },
};
