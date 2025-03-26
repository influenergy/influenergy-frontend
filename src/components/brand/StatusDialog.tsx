import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheck, Info } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function StatusDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between my-4">
            <p className="font-semibold">Check Status</p>
            <p className="font-semibold text-primary">Get Help?</p>
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Status Steps - Vertical Progressive */}
        <div className="relative pb-4">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 border-2 border-dashed"></div>

          {/* Step 1 - Completed */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center z-10">
              <CircleCheck className="text-primary" />
            </div>
            <p className="font-medium mb-1">Collaboration Request accepted</p>
          </div>

          {/* Step 2 - Current */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center z-10">
              <Image
                src={"/images/Inbox/videos.svg"}
                alt={""}
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Uploaded Video</p>
              <Button className="bg-primary text-white">View Video</Button>
            </div>
          </div>

          {/* Step 3 - Current */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center z-10">
              <Info className="text-primary" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button className="bg-primary text-white">Approve</Button>
                <Button className="border border-primary text-primary bg-white">
                  Request Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Step 4 - Inactive */}
          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center z-10">
              <CircleCheck />
            </div>
            <div className="">
              <p className="font-medium text-gray-500">
                Collaboration Completed
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
