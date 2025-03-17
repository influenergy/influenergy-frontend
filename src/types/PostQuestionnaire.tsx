export interface Requirement {
    location: string;
    minFollowers: string;
    minEngagement: string;
  }
  
  export interface Campaign {
    _id: string;
    campaignName: string;
    brandId: string;
    brandName: string;
    campaignObjective: string[];
    campaignDescription: string;
    targetAgeGroup: string;
    targetGender: string;
    targetLocation: string[];
    targetInterests: string[];
    contentType: string;
    videoDuration: string;
    catchPhrase: string;
    keyMessage: string;
    toneStyle: string;
    creatorType: string;
    minimumFollowers: string;
    creatorInfluencer: string;
    socialMediaPlatform: string;
    pastExperience: string;
    preferredCreatorNiche: string[];
    preferredCreatorDemographics: string;
    budgetForCampaign: string;
    expectedDeliverables: string;
    noOfDaysForDelivery: string;
    additionalInstructions: string;
    __v?: number;
    

    campaignPost:string;
  }
  