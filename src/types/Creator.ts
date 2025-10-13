interface Creator {
  isAccountVerified: boolean;
  _id: string;
  fullName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  isAccountDeleted: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  badge?:string;
  badgePrice?:string;
  profileIcon?: string;
  profile?: {
    _id: string;
    fullName: string;
    aboutYourself: string;
    stageName: string;
    creator: string;
    type: string;
    dob: string;
    gender: string;
    city: string;
    languages: string[];
    category: string[];
    socialLinks: {
      [key: string]: {
        platform?: string;
        link?: string;
        followers?: string;
      };
    };
    audience: {
      audienceLocations: string[];
      ageBracket: string[];
      usBasedPercentage: string;
    };
    audienceInfo: {
      primaryAge: string;
      primaryGender: string;
      primaryLocation: string;
    };
    growthRate: string;
    averageView: string;
    favouriteBrands: string;
    workedWithAIConsumerApps: boolean;
    hasPaidCampaignExperience: boolean;
    budgetVideo: string;
    socialVideos: Array<{
      url: string;
      caption: string;
    }>;
    matchPercentage?: string;
    summaryMatch?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface CreatorAPIResponse {
  creatorId: string;
  similarity: number;
  creator: Creator;
  profileIcon?: string;
}

export interface FindAICampaignResponse {
  data: CreatorAPIResponse[];
}
