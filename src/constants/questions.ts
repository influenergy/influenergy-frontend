export interface Field {
  title: string;
  category: "text" | "number" | "date" | "dropdown" | "email";
  slug: string;
  options?: string[];
}

interface QuestionStep {
  title: string;
  description: string;
  fields: Field[];
}

interface Questions {
  [key: string]: QuestionStep;
}

export const CREATOR_QUESTIONS: Questions = {
  step1: {
    title: "Lets Create Your Profile",
    description:
      "In order to match you with the right brands, we need a few more details",
    fields: [
      {
        title: "Gender",
        slug: "gender",
        category: "dropdown",
        options: ["Male", "Female", "Non-binary", "Prefer not to say"],
      },
      {
        title: "Your City",
        slug: "city",
        category: "dropdown",
        options: [
          "New York",
          "Los Angeles",
          "Delhi",
          "Mumbai",
          "London",
          "Sydney",
        ],
      },
      {
        title: "Date of Birth",
        slug: "dateOfBirth",
        category: "date",
      },
      {
        title: "Phone Number",
        slug: "phoneNumber",
        category: "number",
      },
    ],
  },
  step2: {
    title: "Select Your Preferred Categories",
    description: "This helps fine tune your brand matches",
    fields: [
      {
        title: "Categories",
        slug: "categories",
        category: "dropdown",
        options: [
          "Fashion & Apparel",
          "Beauty & Skincare",
          "Health & Wellness",
          "Food & Beverage",
          "Technology & Electronics",
          "Travel & Hospitality",
          "Education & E-learning",
          "Entertainment & Media",
          "Others",
        ],
      },
    ],
  },
  step3: {
    title: "We Would Love to Know More About You",
    description: "This helps fine tune your brand matches",
    fields: [
      {
        title: "What type of content do you enjoy creating the most?",
        slug: "contentType",
        category: "text",
      },
      {
        title: "What tools and platforms do you use for content creation?",
        slug: "toolsAndPlatforms",
        category: "text",
      },
      {
        title: "What is your target audience?",
        slug: "targetAudience",
        category: "text",
      },
      {
        title: "What are your content creation goals?",
        slug: "contentGoals",
        category: "text",
      },
    ],
  }
};

export const BRAND_QUESTIONS: Questions = {
  step1: {
    title: "Lets Create Your Profile",
    description:
      "In order to match you with the right brands, we need a few more details",
    fields: [
      {
        title: "Name",
        slug: "name",
        category: "text",
      },
      {
        title: "Email",
        slug: "email",
        category: "email",
      },
      {
        title: "Company Website",
        slug: "companyWebsite",
        category: "text",
      },
      {
        title: "No Of Employess",
        slug: "noOfEmployees",
        category: "number",
      },
      {
        title: "Budget For Campaign",
        slug: "budgetForCampaign",
        category: "number",
      },
      {
        title: "How did you hear about this",
        slug: "howDidYouHearAboutThis",
        category: "text",
      },
    ],
  },
};
