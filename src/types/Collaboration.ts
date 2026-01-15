export interface Video {
  _id: string;
  link: string;
  timestamp: string;
  status: "Approved" | "Declined" | "Pending" | "Waiting Approval"; // Updated to match schema
  message?: string | null; // Changed from 'reason' to 'message' to match schema
  deliverableType?: string; // NEW FIELD
}

export interface Campaign {
  _id?: string;
  campaignTitle: string;
  campaignImage: string;
  brandName: string;
  campaignDescription: string;
  targetNiche: string[];
  socialPlatforms: string; // e.g., "YouTube", "TikTok", "Instagram"
  expectedDeliverables: string[]; // e.g., ["Video", "Shorts", "Community Post"]
  budgetForCampaign: string;
  deadline: string;
  requirements: string[];
  applicationQuestions: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
}

export interface Collaboration {
  _id: string;
  brandId: string;
  campaignId: Campaign; // Changed to use Campaign interface instead of inline
  creatorId: string;
  status: "Pending" | "Offered" | "Offer Accepted" | "Shortlisted" | "Active" | "Completed" | "Rejected" | "Interested" | "Waiting Approval";
  paymentStatus: "Cancelled" | "Under Process" | "Done" | "Pending";
  videos?: Video[];
  amount: number;
  coverMessage?: string;
  creatorBudget?: string;
  requiredDocuments?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}


// export interface Collaboration {
//   _id: string;
//   brandId: string;
//   campaignId: {
//     campaignTitle: string;
//     campaignImage: string;
//     brandName: string;
//     campaignObjective: string[];
//     campaignDescription: string;
//     yourBrief: string;
//     campaignConcept: string;
//     targetNiche: string[];
//     applicationQuestions: string;
//     deadline: string;
//     budgetForCampaign: string;
//     socialPlatforms: string[];
//     requirements: string[];
//     targetAgeGroup: string[];
//     targetGender: string[];
//     targetLocation: string[];
//     targetInterests: string[];
//     contentType: string;
//     videoDuration: string;
//     catchPhrase: string;
//     preferredCreatorNiche: string[];
//     preferredCreatorDemographics: string;
//     noOfDaysForDelivery: string;
//     expectedDeliverables: string[];
//     campaignPdf:string
//     additionalInstructions: string;
//     socialMediaPlatform: string[];
//     keyMessage: string;
//     toneStyle: string;
//   };
//   creatorId: string;
//   status: string;
//   amount: number;
//   videos?: Video[];
//   createdAt: string;
//   updatedAt: string;
//   paymentStatus: string;
//   requiredDocuments:string;
// }

