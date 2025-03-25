import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DetailsModal({
  open,
  onOpenChange,
}: DetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-screen flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogClose />
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-20">
          <div className="bg-white rounded-lg space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="w-fit relative rounded-lg overflow-hidden">
                <Image
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="Campaign Image"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full space-y-4">
                {/* Title and Brand */}
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl text-gray-900 line-clamp-2">
                    We are seeking a passionate Fitness Black Female Influencer
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-black text-lg">Nike</p>
                </div>

                {/* Campaign Objective */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Campaign Objective</h4>
                  <p className="text-gray-600">Awareness l Engagement Sales</p>
                </div>

                {/* Campaign Description */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">
                    Campaign Description
                  </h4>
                  <p className="text-gray-600">
                    Someone who shares our values of promoting health, fitness,
                    and inclusivity. An individual with a strong social media
                    presence and engaged audience.
                  </p>
                </div>

                <hr />

                {/* Campaign Description */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Your Brief</h4>
                  <p className="text-gray-600">
                    Someone who shares our values of promoting health, fitness,
                    and inclusivity. An individual with a strong social media
                    presence and engaged audience.
                  </p>
                </div>

                <hr />

                {/* Target Group */}
                <div className="mt-4 flex flex-col gap-4">
                  <h4 className="text-lg font-semibold">Campaign Concept</h4>
                  <p className="text-gray-600">
                    Someone who shares our values of promoting health, fitness,
                    and inclusivity. An individual with a strong social media
                    presence and engaged audience.
                  </p>
                  <hr />
                  <p className="text-gray-600">
                    Age: 18 to 35 Years, Gender: Male - 40%, Women - 60%,
                    Location: USA, Interests: Fitness, Beauty
                  </p>
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
                      <p className="text-gray-600">Content Type</p>
                      <p>Good</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration of Video</p>
                      <p>2 mins</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Catch Phrase</p>
                      <p>Catch Phrase will come here</p>
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
                      <p className="text-gray-600">Preferred Creator Niche</p>
                      <p>Fitness, Beauty</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Preferred Creator Demographics
                      </p>
                      <p>India</p>
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
                      <p className="text-gray-600">No. Of Days for Delivery</p>
                      <p>10 Days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected Deliverables</p>
                      <p>Videos, Assets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-10">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition">
            Accept
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:text-white hover:bg-primary transition">
            Reject
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
