import Image from "next/image";
import React from "react";
// import { PenLine } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import EditPostModal from "./EditPostModal";

interface PostData {
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

interface PostDescriptionProps {
  data: PostData;
}

const PostDescription = ({ data }: PostDescriptionProps) => {
  // const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      {/* <div className="flex justify-end mb-4">
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-primary bg-secondary hover:bg-primary/50"
        >
          <PenLine className="h-4 w-4" />
          Edit
        </Button>
        <EditPostModal open={open} onOpenChange={setOpen} />
      </div> */}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-fit relative rounded-lg overflow-hidden ">
          <Image
            src={data.image}
            alt={data.title}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>

        <div className="w-full  space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl  text-gray-900 line-clamp-2">
              {data.title}
            </h3>
          </div>
          {data.companyLogo && (
            <div className=" relative rounded-full overflow-hidden flex items-center gap-4">
              <Image
                src={data.companyLogo}
                alt="Company Logo"
                height={30}
                width={30}
                className="object-cover rounded-full"
              />
              <p className="text-black text-lg">
                {data?.companyName || "Nike"}
              </p>
            </div>
          )}
          {data.campaignObjective && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Campaign Objective</h4>
              <p className="text-gray-600">{data.campaignObjective}</p>
            </div>
          )}

          {data.campaignDescription && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Campaign Description</h4>
              <p className="text-gray-600">{data.campaignDescription}</p>
            </div>
          )}

          {data.targetGroup && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Target Group</h4>
              <p className="text-gray-600">{data.targetGroup}</p>
            </div>
          )}

          {data.contentVibe && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                What is the Content Vibe?
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Content Type</p>
                  <p>{data.contentVibe.contentType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration of Video?</p>
                  <p>{data.contentVibe.durationOfVideo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Catch Phrase</p>
                  <p>{data.contentVibe.catchPhrase}</p>
                </div>
                <div>
                  <p className="text-gray-600">Key Message & Hashtags</p>
                  <p>{data.contentVibe.keyMessage}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tone & Style</p>
                  <p>{data.contentVibe.toneStyle}</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    What kind of creator are you looking for?
                  </p>
                  <p>{data.contentVibe.creatorLookingFor}</p>
                </div>
              </div>
            </div>
          )}

          {data.idealCreatorChecklist && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/2.png"
                    alt=""
                    width={18}
                    height={18}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                Your Ideal Creator Checklist
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Minimum Follower Count</p>
                  <p>{data.idealCreatorChecklist.minFollowerCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">UGC Creator or Influencer</p>
                  <p>{data.idealCreatorChecklist.ugcCreatorOrInfluencer}</p>
                </div>
                <div>
                  <p className="text-gray-600">Preferred Social Media</p>
                  <p>{data.idealCreatorChecklist.preferredSocialMedia}</p>
                </div>
                <div>
                  <p className="text-gray-600">Past Experience</p>
                  <p>{data.idealCreatorChecklist.pastExperience}</p>
                </div>
                <div>
                  <p className="text-gray-600">Preferred Creator Niche</p>
                  <p>{data.idealCreatorChecklist.preferredCreatorNiche}</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Preferred Creator Demographics
                  </p>
                  <p>
                    {data.idealCreatorChecklist.preferredCreatorDemographics}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.compensation && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <div className="relative">
                  <div className="h-5 w-5 bg-primary/40 rounded-full" />
                  <Image
                    src="/images/editpost/3.png"
                    alt=""
                    width={45}
                    height={45}
                    className="absolute top-1/2 -left-1/5 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  />
                </div>
                Compensation & Deliverables
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-2 px-6">
                <div>
                  <p className="text-gray-600">Budget for Campaign</p>
                  <p>{data.compensation.budget}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected Deliverables</p>
                  <p>{data.compensation.expectedDeliverables}</p>
                </div>
                <div>
                  <p className="text-gray-600">No. Of Days for Delivery</p>
                  <p>{data.compensation.deliveryDays}</p>
                </div>
                <div>
                  <p className="text-gray-600">Additional Instructions</p>
                  <p>{data.compensation.additionalInstructions}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
