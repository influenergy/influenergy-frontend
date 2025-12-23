export interface NewCampaignResponse {
  _id: string;
  campaignTitle: string;
  campaignDescription: string;
  targetNiche: string[];
  budgetForCampaign: string;
  expectedDeliverables: string[];
  brandId: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  applicationQuestions?: string;
  campaignPost?: string; // Image URL
  createdAt: string;
  updatedAt: string;
}

export interface NewPostData {
  id: string;
  image?: string;
  title: string;
  campaignDescription: string;
  targetNiche: string[];
  budgetForCampaign: string;
  expectedDeliverables: string[];
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  applicationQuestions?: string;
  createdAt: string;
  updatedAt?: string;
  brandId?: string;
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
  campaignData: NewCampaignResponse;
  collaborations: CollaborationsData;
}

export interface PostDescriptionProps {
  data: NewCampaignResponse,
  collaborations: Collaboration[]
}
