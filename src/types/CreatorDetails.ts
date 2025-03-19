export interface UserProfile {
  creator: {
    _id: string;
    fullName: string;
    email: string;
    profileIcons?: string;
    isEmailVerified: boolean;
    createdAt: string;
    profile: Profile;
    isProfileCompleted: boolean;
  };
}

interface Profile {
  audience: Audience;
  audienceInfo: AudienceInfo;
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
  socialLinks: SocialLinks;
  growthRate: string;
  averageView: string;
  favouriteBrands: string;
  workedWithAIConsumerApps: boolean;
  hasPaidCampaignExperience: boolean;
  budgetVideo: string;
  socialVideos: string[]; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Audience {
  audienceLocations: string[];
  ageBracket: string[];
  usBasedPercentage: string;
}

interface AudienceInfo {
  primaryAge: string;
  primaryGender: string;
  primaryLocation: string;
  primaryPercentage:string;
  
  secondaryAge?: string;
  secondaryGender?: string;
  secondaryLocation?: string;
  secondaryPercentage?:string;
}

interface SocialLinks {
  primary: SocialPlatform;
  secondary: SocialPlatform;
}

interface SocialPlatform {
  platform: string;
  link: string;
  followers: string;
}
