import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useAcceptOrDeclineCollaboration } from "@/hooks/usePost";
import { Collaboration } from "@/types/Collaboration";
import { Button } from "../ui/button";

interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: string;
  data: Collaboration;
}

export default function DetailsModal({
  open,
  onOpenChange,
  status,
  data,
}: DetailsModalProps) {
  const campaign = data?.campaignId || {};
  const collaborationId = data?._id;

  const { mutate: acceptCollaboration, isPending: isAccepting } =
    useAcceptOrDeclineCollaboration(collaborationId, "Active", {
      onSuccess: () => onOpenChange(false),
    });
  const { mutate: declineCollaboration, isPending: declineLoading } =
    useAcceptOrDeclineCollaboration(collaborationId, "Cancelled", {
      onSuccess: () => onOpenChange(false),
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-screen flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogClose />
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-20">
          <div className="bg-white rounded-lg space-y-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Section */}
              <div className=" relative rounded-lg overflow-hidden">
                <Image
                  src={
                    campaign.campaignPost ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="Campaign Image"
                  width={550}
                  height={550}
                  className="object-cover aspect-[16/9] rounded-lg"
                />
              </div>

              {/* Content Section */}
              <div className="w-full space-y-4">
                {/* Title and Brand */}
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl text-gray-900 line-clamp-2 font-bold">
                    {campaign.campaignName || "Campaign Name"}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src={
                      campaign.campaignPost ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="Campaign Image"
                    width={40}
                    height={40} // Make height equal to width for a perfect circle
                    className="object-cover rounded-full h-10 w-10"
                  />
                  <p className="text-black text-lg">
                    {campaign.brandName || "Brand"}
                  </p>
                </div>

                {/* Campaign Objective */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Campaign Objective</h4>
                  <p className="text-gray-600">
                    {campaign.campaignObjective
                      ? campaign.campaignObjective
                          .toString()
                          .replace(/[\[\]"]/g, "")
                      : "Awareness  Engagement Sales"}
                  </p>
                </div>

                {/* Campaign Description */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">
                    Campaign Description
                  </h4>
                  <p className="text-gray-600">
                    {campaign.campaignDescription || "No description available"}
                  </p>
                </div>

                <hr />

                {/* Campaign Description */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Campaign Brief</h4>
                  <p className="text-gray-600">
                    {campaign.yourBrief || "No brief provided"}
                  </p>
                </div>

                <hr />

                {/* Target Group */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Campaign Concept</h4>
                  <p className="text-gray-600">
                    {campaign.campaignConcept || "No campaign concept provided"}
                  </p>
                  <hr />
                  <div className="flex items-center gap-5">
                    <p className="text-gray-600">
                      Target Audience Age:{" "}
                      {campaign?.targetAgeGroup && campaign.targetAgeGroup
                        ? Array.isArray(campaign.targetAgeGroup)
                          ? (campaign.targetAgeGroup as string[])
                              .map((age) =>
                                age.toString().replace(/[\[\]"]/g, "")
                              )
                              .join(", ")
                          : (campaign.targetAgeGroup as string)
                              .toString()
                              .replace(/[\[\]"]/g, "")
                        : ""}
                    </p>
                    {"•"}
                    <p className="text-gray-600">
                      {" "}
                      Target Audience Gender:{" "}
                      {(campaign?.targetGender &&
                        campaign.targetGender
                          .toString()
                          .replace(/[\[\]"]/g, "")) ||
                        "Not specified"}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <p className="text-gray-600">
                      Target Location:{" "}
                      {campaign.targetLocation
                        ? campaign.targetLocation
                            .map((loc) => loc.replace(/[\[\]"]/g, ""))
                            .join(", ")
                        : "Not specified"}
                    </p>
                    {"•"}
                    <p className="text-gray-600">
                      Target Audience Interests:{" "}
                      {campaign.targetInterests
                        ? campaign.targetInterests
                            .map((int) => int.replace(/[\[\]"]/g, ""))
                            .join(", ")
                        : "Not specified"}
                    </p>
                  </div>
                  <hr />
                </div>

                {/* Content Vibe */}
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
                      <p>Content Type</p>
                      <p className="text-gray-600">
                        {campaign.contentType || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p>Duration of Video</p>
                      <p className="text-gray-600">
                        {campaign.videoDuration || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p>Call to Action</p>
                      <p className="text-gray-600">
                        {campaign.catchPhrase || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ideal Creator Checklist */}
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
                    Ideal Creator Checklist
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-2 px-6">
                    <div>
                      <p>Preferred Creator Niche</p>
                      <p className="text-gray-600">
                        {campaign.preferredCreatorNiche
                          ? campaign.preferredCreatorNiche
                              .map((niche) => niche.replace(/[\[\]"]/g, ""))
                              .join(", ")
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p>Preferred Creator Demographics</p>
                      <p className="text-gray-600">
                        {campaign.preferredCreatorDemographics ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compensation & Deliverables */}
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
                      <p>No. Of Days for Delivery</p>
                      <p className="text-gray-600">
                        {campaign.noOfDaysForDelivery || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p>Expected Deliverables</p>
                      <p className="text-gray-600">
                        {campaign.expectedDeliverables || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p>Budget</p>
                      <p className="text-gray-600">
                        ${data?.budget || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Action Buttons */}
        {status == "Pending" && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-10">
            <Button
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition"
              onClick={() => acceptCollaboration()}
              disabled={isAccepting || declineLoading}
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </Button>
            <Button
              className="px-4 py-2 text-sm font-medium text-white border border-primary rounded-lg transition"
              onClick={() => declineCollaboration()}
              disabled={declineLoading || isAccepting}
            >
              {declineLoading ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
