export interface CreatorQuestionnaireData {
  // Step 1
  "are-you-ugc-creator": string;
  "full-name": string;
  "stage-name"?: string;
  dob: Date;

  // Step 2
  gender: string;
  country: string;
  "primary-niche": string;

  // Step 3
  "primary-social-media": string;
  "primary-followers": string;
  "secondary-social-media": string;
  "secondary-followers": string;

  // Step 4
  "primary-social-media-link": string;
  "secondary-social-media-link": string;

  // Step 5
  "growth-rate": string;
  "primary-locations": string[];
  "us-based-audience": string;
  "gender-distribution": string;

  // Step 6
  "top-two-audiences": string;
  "average-views": string;
  "favourite-brands": string;
  "worked-with-ai": string;
  "paid-campaigns"?: string;
}

export interface BrandQuestionnaireData {
  name: string;
  email: string;
  companyWebsite: string;
  noOfEmployees: string;
  budgetForCampaign: string;
  howDidYouHearAboutThis: string;
}

export interface QuestionnaireData {
  gender: string;
  "Your City": string;
  "Date of Birth": string;
  "Phone Number": number;
  categories: string;
  "What type of content do you enjoy creating the most?": string;
  "What tools and platforms do you use for content creation?": string;
  "What is your target audience?": string;
  "What are your content creation goals?": string;
}