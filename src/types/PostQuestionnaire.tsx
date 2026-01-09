export interface Requirement {
  location: string;
  minFollowers: string;
  minEngagement: string;
}

export interface PostQuestionnaireData {
  "_id"?: string; // Optional, will be used for updates
  "brand-name": string;
  "brandId"?:string;
  "vectorId"?: string;
  "campaign-objective": string[];
  "campaign-description": string;
  "campaign-post": string;
  "target-age-group": string[];
  "target-gender": string[];
  "target-gender-other"?: string;
  "target-location": string[];
  "target-interests": string[];
  "target-interests-other"?: string;
  "compaign-name": string;
  "your-brief": string;
  // "compaign-concept": string;
  "content-type": string;
  "video-duration"?: string;
  "catch-phrase": string;
  "key-message": string;
  "tone-style": string;
  "creator-type": string;
  "minimum-followers": string;
  "creator-influencer": string;
  "social-media-platform": string[];
  "past-experience": string;
  "preferred-creator-niche": string[];
  "preferred-creator-demographics": string;
  "budget-for-campaign": string;
  "expected-deliverables": string;
  "no-of-days-for-delivery": string;
  "additional-instructions"?: string;
  "requirement-documents"?: string;
}

export interface Campaign {
  _id: string;
  campaignImage?: string;
  campaignTitle: string;
  campaignDescription: string;
  brandName: string;
  brandId: string;

  targetNiche: string[];
  budgetForCampaign: string;
  socialPlatforms: string;
  expectedDeliverables?: string[] | string;
  deadline: string;

  requirements?: string[];
  applicationQuestions?: string;

  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  createdAt?: string;
  updatedAt?: string;
}


export interface CampaignDetails {
  _id?: string;          // optional (modal doesn't really use it)
  brandId?: string;      // optional

  campaignTitle: string;
  campaignImage?: string;
  brandName: string;
  campaignDescription: string;

  targetNiche: string[];
  socialPlatforms: string;
  expectedDeliverables: string[];

  budgetForCampaign: string;
  deadline: string;

  requirements?: string[];
  applicationQuestions?: string;

  status: "DRAFT" | "PUBLISHED" | "CLOSED";
}


