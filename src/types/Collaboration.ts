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
    campaignTitle: string;
    campaignImage: string;
    brandName: string;
    campaignDescription: string;

    targetNiche: string[];
    socialPlatforms: string;          // enum in schema
    expectedDeliverables: string[];

    budgetForCampaign: string;
    deadline: string;

    requirements: string[];
    applicationQuestions: string;
    status: "DRAFT" | "PUBLISHED" | "CLOSED";
  };

  creatorId: string;
  status: string;
  amount: number;

  videos?: Video[];

  createdAt: string;
  updatedAt: string;
  paymentStatus: string;
  requiredDocuments: string;
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

