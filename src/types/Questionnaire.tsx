export interface CreatorQuestionnaireData {
  // Step 1
  "are-you-ugc-creator": string;
  "full-name": string;
  "stage-name"?: string;
  dob: Date;

  // Step 2
  gender: string;
  "gender-other"?: string;
  country: string;
  language: string[];
  "primary-niche": string[];
  "primary-niche-other"?: string;

  // Step 3
  "tell-us-about-yourself": string;
  "primary-audience-age": string;
  "primary-audience-gender": string;
  "primary-audience-gender-other"?: string;
  "primary-audience-location": string;
  "primary-audience-percentage": string;
  "secondary-audience-age": string;
  "secondary-audience-gender": string;
  "secondary-audience-gender-other"?: string;
  "secondary-audience-location": string;
  "secondary-audience-percentage": string;

  // Step 4
  "growth-rate": string;
  "primary-locations": string[];
  "us-based-audience": string;

  // Step 5
  "primary-social-media": string;
  "primary-social-media-link": string;
  "primary-followers": string;
  "secondary-social-media"?: string;
  "secondary-social-media-link"?: string;
  "secondary-followers"?: string;

  // Step 6
  "top-two-audiences": string[];
  "average-views": string;
  "favourite-brands": string;
  "worked-with-ai": string;
  "paid-campaigns": string;
  "budget-video": string;
  "payment-method":string[];
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

export interface PostQuestionnaireData {
  // Step 1 - Basic Information
  "brand-name": string;
  "campaign-objective": string[];
  "campaign-description": string;
  "campaign-post": string;

  // Step 2 - Target Audience & Demographics
  "target-age-group": string[];
  "target-gender": string[];
  "target-gender-other"?: string;
  "target-location": string[];
  "target-interests": string[];
  "target-interests-other"?: string;

  // Step 4 - Brief
  "compaign-name": string;
  "your-brief": string;
  "compaign-concept": string;

  // Step 3 - Content Vibe
  "content-type": string;
  "video-duration"?: string;
  "catch-phrase": string;
  "key-message": string;
  "tone-style": string;
  "creator-type": string;

  // Step 4 - Ideal Creator Checklist
  "minimum-followers": string;
  "creator-influencer": string;
  "social-media-platform": string[];
  "past-experience": string;
  "preferred-creator-niche": string[];
  "preferred-creator-demographics": string;

  // Step 5 - Compensation & Deliverables
  "budget-for-campaign": string;
  "expected-deliverables": string;
  "no-of-days-for-delivery": string;
  "additional-instructions"?: string;
  "requirement-documents": string;
}
