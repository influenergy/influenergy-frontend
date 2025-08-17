export interface PostData {
  id: string;
  image: string;
  title: string;
  brandName?: string;
  companyLogo?: string;
  companyName?: string;
  campaignObjective?: string;
  campaignDescription?: string;
  campaignConcept?: string;
  campaignPost?: string;
  yourBrief?: string;
  campaignPdf?: string;
  targetGroup?: {
    age?: string[];
    gender?: string[];
    location?: string[];
    interest?: string[];
  };
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
    preferredSocialMedia?: string[]; // ✅ Fix: string[] not string
    pastExperience?: string;
    preferredCreatorNiche?: string[];
    preferredCreatorDemographics?: string;
  };
  compensation?: {
    budget?: string;
    expectedDeliverables?: string;
    deliveryDays?: string;
    additionalInstructions?: string;
    campaignPdf?: string;
  };
  description: string;
  createdAt: string;
  requirement: {
    location: string[];
    minFollowers: string;
    minEngagement: string;
  };
}

export interface CampaignResponse {
  vectorId: string;
  status: boolean;
  message: string;
  _id: string;
  campaignName: string;
  campaignPost: string;
  brandId: string;
  brandName: string;
  campaignObjective: string[];
  campaignDescription: string;
  campaignConcept: string;
  yourBrief: string;
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
  campaignPdf: string;
}

// New types for the updated API structure
export interface CreatorProfile {
  _id: string;
  fullName: string;
  profileIcon: string;
  profile: {
    bio: string;
    fullName?: string;
    aboutYourself?: string;
    stageName?: string;
    creator?: string;
    type?: string;
    dob?: string;
    gender?: string;
    city?: string;
    languages?: string[];
    category?: string[];
    socialLinks?: {
      [key: string]: {
        platform?: string;
        link?: string;
        followers?: string;
      };
    };
    audience?: {
      audienceLocations?: string[];
      ageBracket?: string[];
      usBasedPercentage?: string;
    };
    audienceInfo?: {
      primaryAge?: string;
      primaryGender?: string;
      primaryLocation?: string;
    };
    growthRate?: string;
    averageView?: string;
    favouriteBrands?: string;
    workedWithAIConsumerApps?: boolean;
    hasPaidCampaignExperience?: boolean;
    budgetVideo?: string;
    socialVideos?: Array<{
      url?: string;
      caption?: string;
    }>;
    [key: string]: unknown;
  };
}

export interface Collaboration {
  _id: string;
  status: string;
  creatorId: CreatorProfile;
}

export interface CollaborationsData {
  pending?: Collaboration[];
  ongoing?: Collaboration[];
  completed?: Collaboration[];
}

export interface NewCampaignResponse {
  campaignData: CampaignResponse;
  collaborations: CollaborationsData;
}

export interface PostDescriptionProps {
  data: CampaignResponse,
  collaborations: Collaboration[]
}
