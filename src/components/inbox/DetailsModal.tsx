import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="max-w-4xl grid grid-cols-2 gap-6">
        <DialogHeader className="col-span-2">
          <DialogTitle>
            We are seeking a passionate Fitness Black Female Influencer
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Image and Campaign Info */}
        <div className="row-start-2 col-start-1">
          <div className="flex items-start gap-4">
            <Image
              src="https://avatar.iran.liara.run/public/boy"
              alt="User Image"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4 col-start-2 row-start-2">
          {/* Campaign Info */}
          <div>
              <p className="text-sm font-medium">Nike</p>
              <p className="text-sm text-gray-600">
                Campaign Objective: Awareness | Engagement | Sales
              </p>
          </div>

          {/* Campaign Description */}
          <div>
            <h3 className="text-sm font-semibold">Campaign Description</h3>
            <p className="text-sm text-gray-600">
              Someone who shares our values of promoting health, fitness, and
              inclusivity. An individual with a strong social media presence and
              engaged audience.
            </p>
          </div>

          {/* Campaign Concept */}
          <div>
            <h3 className="text-sm font-semibold">Campaign Concept</h3>
            <p className="text-sm text-gray-600">
              Target Group: 18 to 35 Years | Target Gender: Male - 40%, Women -
              60% <br />
              Target Location: USA | Target Interest & Niche: Fitness | Beauty
            </p>
          </div>

          {/* Content Vibe */}
          <div>
            <h3 className="text-sm font-semibold">Whats the Content Vibe?</h3>
            <p className="text-sm text-gray-600">
              Content Type: Good | Duration of Video: 2 mins | Catch Phrase:
              Catch Phrase will come here
            </p>
          </div>

          {/* Ideal Creator Checklist */}
          <div>
            <h3 className="text-sm font-semibold">Ideal Creator Checklist</h3>
            <p className="text-sm text-gray-600">
              Preferred Creator Niche: Fitness | Beauty
            </p>
            <p className="text-sm text-gray-600">
              Preferred Creator Demographics: India
            </p>
          </div>

          {/* Compensation & Deliverables */}
          <div>
            <h3 className="text-sm font-semibold">
              Compensation & Deliverables
            </h3>
            <p className="text-sm text-gray-600">
              No. Of Days for Delivery: 10 Days
            </p>
            <p className="text-sm text-gray-600">
              Deliverables: Videos, Assets
            </p>
          </div>
           {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-4 col-span-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Reject
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition">
            Accept
          </button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
