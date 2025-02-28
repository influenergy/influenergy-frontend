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

// export const BRAND_QUESTIONS: Questions = {
//   step1: {
//     title: "Lets Create Your Profile",
//     description:
//       "In order to match you with the right brands, we need a few more details",
//     fields: [
//       {
//         title: "Name",
//         slug: "name",
//         category: "text",
//       },
//       {
//         title: "Email",
//         slug: "email",
//         category: "email",
//       },
//       {
//         title: "Company Website",
//         slug: "companyWebsite",
//         category: "text",
//       },
//       {
//         title: "No Of Employess",
//         slug: "noOfEmployees",
//         category: "number",
//       },
//       {
//         title: "Budget For Campaign",
//         slug: "budgetForCampaign",
//         category: "number",
//       },
//       {
//         title: "How did you hear about this",
//         slug: "howDidYouHearAboutThis",
//         category: "text",
//       },
//     ],
//   },
// };

export const CREATOR_QUESTIONS: Questions = {
  step1: {
    title: "Your Profile",
    icon: User,
    description: "Tell us a bit about yourself.",
    fields: [
      {
        title: "Do you consider yourself a UGC creator or an Influencer?",
        slug: "are-you-ugc-creator",
        category: "dropdown",
        options: ["Influencer", "UGC"],
      },
      {
        title: "What's your full name?",
        slug: "full-name",
        category: "text",
      },
      {
        title: "Enter if you have stage names",
        slug: "stage-name",
        category: "text",
      },
      {
        title: "What is your D.O.B?",
        slug: "dob",
        category: "date",
      },
    ],
  },
  step2: {
    title: "Your Audience",
    icon: Users,
    description: "Tell us a bit about your audience.",
    fields: [
      {
        title: "Choose Gender",
        slug: "gender",
        category: "dropdown",
        options: ["Male", "Female", "Others"],
      },
      {
        title: "What country do you operate out of?",
        slug: "country",
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
          "Brazil",
        ],
      },
      {
        title: "What languages do you speak?",
        slug: "language",
        category: "multiselect",
        options: [
          "English",
          "Spanish",
          "French",
          "German",
          "Japanese",
          "Chinese",
          "Hindi",
          "Arabic",
          "Portuguese",
        ],
      },
      {
        title: "What is primary niche?",
        slug: "primary-niche",
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
    ],
  },
  step3: {
    title: "Your Social Media",
    icon: Share2,
    description: "Tell us a bit about your social media presence.",
    fields: [
      {
        title: "What social media platform do you primarily operate from?",
        slug: "primary-social-media",
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
        title: "Enter your primary social media profile link",
        slug: "primary-social-media-link",
        category: "text",
        dependsOn: "primary-social-media",
      },
      {
        title: "How many followers do you have on your primary social media?",
        slug: "primary-followers",
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
        title: "What social media platforms do you operate from 2nd most?",
        slug: "secondary-social-media",
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
        title: "Enter your secondary social media profile link",
        slug: "secondary-social-media-link",
        category: "text",
        dependsOn: "secondary-social-media",
      },
      {
        title: "How many followers do you have on your secondary social media?",
        slug: "secondary-followers",
        category: "dropdown",
        options: [
          "Less than 1,000",
          "1,000 - 10,000",
          "10,000 - 100,000",
          "100,000 - 1,000,000",
          "More than 1,000,000",
        ],
      },
    ],
  },
  step4: {
    title: "Audience Insights",
    icon: ChartPie,
    description: "Tell us a bit about your audience.",
    fields: [
      {
        title: "What's the growth rate of your followers over last six months?",
        slug: "growth-rate",
        category: "dropdown",
        options: [
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
        ],
      },
      {
        title:
          "What are the top three primary geographic locations of your audience?",
        slug: "primary-locations",
        category: "multiselect",
        options: [
          "United States",
          "Canada",
          "Mexico",
          "United Kingdom",
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
        title: "What % of your audience is US based?",
        slug: "us-based-audience",
        category: "dropdown",
        options: [
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
        ],
      },
      {
        title: "What is the gender distribution of your audience?",
        slug: "gender-distribution",
        category: "text",
      },
    ],
  },
  step5: {
    title: "Content and Engagement",
    icon: Book,
    description: "Tell us a bit about your content and engagement.",
    fields: [
      {
        title: "What is the age bracket of your top two audiences?",
        slug: "top-two-audiences",
        category: "dropdown",
        options: ["5-10","11-17","18-24", "25-34", "35-44", "45-54", "55-64", "65 or older"],
      },
      {
        title: "What are the average views of your last 8 videos?",
        slug: "average-views",
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
        title: "What are your favourite brands?",
        slug: "favourite-brands",
        category: "text",
      },
      {
        title: "Have you worked with AI consumer apps before?",
        slug: "worked-with-ai",
        category: "dropdown",
        options: ["Yes", "No"],
      },
      {
        title: "If Yes, how many paid campaigns have you made?",
        slug: "paid-campaigns",
        category: "dropdown",
        options: ["1-5", "5-10", "10-20", "20-50", "50 or more"],
      },
    ],
  },
};
