export interface Video {
  link: string;
  timestamp: string;
  status: string;
  _id: string;
  reason?: string;
}

export interface Collaboration {
  _id: string;
  brandId: string;
  campaignId: {
    campaignName: string;
    campaignPost: string;
    brandName: string;
    campaignObjective: string[];
    campaignDescription: string;
    yourBrief: string;
    campaignConcept: string;
    targetAgeGroup: string[];
    targetGender: string[];
    targetLocation: string[];
    targetInterests: string[];
    contentType: string;
    videoDuration: string;
    catchPhrase: string;
    preferredCreatorNiche: string[];
    preferredCreatorDemographics: string;
    noOfDaysForDelivery: string;
    expectedDeliverables: string;
  };
  creatorId: string;
  status: string;
  amount: number;
  videos: Video[];
  createdAt: string;
  updatedAt: string;
  paymentStatus: string;
}
