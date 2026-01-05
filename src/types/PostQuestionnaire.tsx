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
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  vectorId: string;
  brandName: string;
  collaborationId:string;
  campaignObjective: string[];
  campaignDescription: string;
  targetAgeGroup: string[];
  yourBrief?:string;
  campaignConcept?:string;
  targetGender: string[];
  targetLocation: string[];
  targetInterests: string[];
  contentType: string;
  campaignPdf?:string;
  videoDuration: string;
  catchPhrase: string;
  keyMessage: string;
  toneStyle: string;
  creatorType: string;
  minimumFollowers: string;
  creatorInfluencer: string;
  socialPlatforms: string[];
  pastExperience: string;
  preferredCreatorNiche: string[];
  preferredCreatorDemographics: string;
  budgetForCampaign: string;
  expectedDeliverables: string;
  noOfDaysForDelivery: string;
  additionalInstructions: string;
  campaignImage: string;
  targetNiche: string[];
  deadline: string;
  __v?: number;
}
