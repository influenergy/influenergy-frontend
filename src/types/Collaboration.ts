export interface Collaboration {
  _id: string;
  brandId: string;
  campaignId: Campaign;
  creatorId: string;
  status: string;
  amount: number;
  videos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Campaign {
  _id: string;
  campaignName: string;
  campaignPost: string;
  brandId: string;
  vectorId: string;
  brandName: string;
  yourBrief: string;
  campaignConcept: string;
  campaignObjective: string[]; // parsed from JSON
  campaignDescription: string;
  targetAgeGroup: string | string[]; // parsed from JSON
  targetGender: string;
  targetLocation: string[]; // parsed from JSON
  targetInterests: string[]; // parsed from JSON
  contentType: string;
  videoDuration: string;
  catchPhrase: string;
  keyMessage: string;
  toneStyle: string;
  creatorType: string;
  minimumFollowers: string;
  creatorInfluencer: string;
  socialMediaPlatform: string[]; // parsed from JSON
  pastExperience: string;
  preferredCreatorNiche: string[]; // parsed from JSON
  preferredCreatorDemographics: string;
  budgetForCampaign: string;
  expectedDeliverables: string;
  noOfDaysForDelivery: string;
  additionalInstructions: string;
  collaborationStatus: string;
  __v: number;
}
