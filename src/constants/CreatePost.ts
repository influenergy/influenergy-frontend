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
    | "multiselect";
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
        title: "Compaign Name",
        slug: "compaign-name",
        category: "text",
      },
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
          "Awareness",
          "Engagement",
          "Sales",
          "Traffic",
          "Leads",
          "Sign-ups",
          "App Installs",
          "Video Views",
          "Conversions",
        ],
      },
      {
        title: "Campaign Description",
        slug: "campaign-description",
        category: "text",
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
        title: "Target Age Group",
        slug: "target-age-group",
        category: "text",
      },
      {
        title: "Target Gender",
        slug: "target-gender",
        category: "dropdown",
        options: ["Male", "Female", "Non-binary", "Prefer not to say","Others"],
      },
      {
        title: "Target Location",
        slug: "target-location",
        category: "multiselect",
        options: [
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
      },
      {
        title: "Target Interests & Niche",
        slug: "target-interests",
        category: "multiselect",
        options: [
          "AI Consumer App",
          "Auto & Vehicles",
          "Beauty & Fashion",
          "Business & Marketing",
          "Crypto & Blockchain",
          "Finance & Business",
          "Fitness",
          "Food & Beverages (CPG)",
          "Health Supplement",
          "Home & DIY",
          "Lifestyle",
          "Music & Entertainment",
          "Other",
          "Parenting & Family",
          "Pets",
          "Science & Education",
          "Sustainability & Environment",
          "Tech Gadgets",
          "Travel & Adventure",
          "Video Gaming",
          "Others",
        ],
      },
    ],
  },
  step3: {
    title: "What’s the Content Vibe?",
    icon: Share2,
    description: "From reels to blogs, what’s your flavor?. 🎥",
    fields: [
      {
        title: "Content Type?",
        slug: "content-type",
        category: "dropdown",
        options: ["Reels"],
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
        title: "Catch Phrase",
        slug: "catch-phrase",
        category: "text",
      },
      {
        title: "Key Message & Hashtags",
        slug: "key-message",
        category: "text",
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
          "Small",
          "Celebrity",
          "Influencer",
          "UGC",
          "Professional",
          "Amateur",
        ],
      },
    ],
  },
  step4: {
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
        options: ["UGC Creator", "Influencer"],
      },
      {
        title: "Preferred Social Media Plaform",
        slug: "social-media-platform",
        category: "dropdown",
        options: [
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
          "Arts",
          "Beauty",
          "Education",
          "Automotive",
          "Fashion",
          "Technology",
          "Fitness",
          "Gaming",
          "Lifestyle",
          "Music",
          "Sports",
          "Travel",
        ],
      },
      {
        title: "Preferred Creator Demographics ",
        slug: "preferred-creator-demographics",
        category: "dropdown",
        options: [
          "United States",
          "Canada",
          "Mexico",
          "France",
          "Germany",
          "Japan",
          "China",
          "India",
          "Australia",
        ],
      },
    ],
  },
  step5: {
    title: "Compensation & Deliverables!",
    icon: Book,
    description:
      "Define your compensation & deliverables and we’ll do the rest.📝",
    fields: [
      {
        title: "Budget for Campaign",
        slug: "budget-for-campaign",
        category: "text",
      },
      {
        title: "Expected Deliverables ",
        slug: "expected-deliverables",
        category: "dropdown",
        options: [
          "Videos",
          "Blog Posts",
          "Social Media Posts",
          "Product Reviews",
          "Live Streams",
          "Podcasts",
          "Interviews",
          "Webinars",
          "E-books",
          "Case Studies",
          "Infographics",
          "Newsletters",
          "Press Releases",
        ],
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
        category: "text",
      },
    ],
  },
};
