
export interface PostData {
    id: string;
    image: string;
    title: string;
    companyLogo?: string;
    companyName?: string;
    campaignObjective?: string;
    campaignDescription?: string;
    targetGroup?: string;
    contentVibe?: {
      contentType?: string;
      durationOfVideo?: string;
      catchPhrase?: string;
      keyMessage?: string;
      toneStyle?: string;
      creatorLookingFor?: string;
    };
    idealCreatorChecklist?: {
      minFollowerCount?: string;
      ugcCreatorOrInfluencer?: string;
      preferredSocialMedia?: string;
      pastExperience?: string;
      preferredCreatorNiche?: string;
      preferredCreatorDemographics?: string;
    };
    compensation?: {
      budget?: string;
      expectedDeliverables?: string;
      deliveryDays?: string;
      additionalInstructions?: string;
    };
    description: string;
    createdAt: string;
    requirement: {
      location: string;
      minFollowers: string;
      minEngagement: string;
    };
  }
  
  
  export interface CampaignResponse {
    status: boolean;
    message: string;
    _id: string;
    campaignName: string;
    campaignPost: string;
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
  }
  
  export interface PostDescriptionProps {
    data: PostData | CampaignResponse;
  }