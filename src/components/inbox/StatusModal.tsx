import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAddVideoUrl } from "@/hooks/usePost";

export default function StatusModal({
  open,
  onOpenChange,
  collaborationId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborationId: string;
}) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const addVideoMutation = useAddVideoUrl(videoUrl, collaborationId);

  const handleSubmitVideo = async () => {
    try {
      await addVideoMutation.mutateAsync();
      setIsConfirmationOpen(false);
      setVideoUrl("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting video:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between my-4">
            <p className="font-semibold">Your Status</p>
            <p className="font-semibold text-primary">Get Help?</p>
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Status Steps - Vertical Progressive */}
        <div className="relative pb-4">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 border-2 border-dashed"></div>

          {/* Step 1 - Active */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center z-10">
              <Image
                src={"/images/Inbox/collab.svg"}
                alt={""}
                width={20}
                height={20}
              />
            </div>
            <p className="font-medium text-primary mb-1">
              Collaboration Request
            </p>
          </div>

          {/* Step 2 - Current */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center z-10">
              <Image
                src={"/images/Inbox/videos.svg"}
                alt={""}
                width={20}
                height={20}
              />
            </div>
            <div>
              <p className="font-medium mb-2">Upload Video</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                <input
                  type="text"
                  placeholder="Paste your Google drive link here"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <button
                  onClick={() => setIsConfirmationOpen(true)}
                  className="w-full p-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
                >
                  Send Video Link to Brand
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 - Inactive */}
          <div className="relative mb-8 pl-12">
            <div className="absolute left-0 w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center z-10">
              <Image
                src={"/images/Inbox/video.svg"}
                alt={""}
                width={20}
                height={20}
              />
            </div>
            <div className="">
              <p className="font-medium text-gray-500">
                Video accepted by Brand
              </p>
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

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-sm text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
              <Image
                src="/images/AIFind/film.png"
                width={50}
                height={50}
                alt="logo"
              />
            </div>
            <p className="mt-4 text-md">
              Are you sure you want to submit this video link? After submitting,
              brands will be able to view the video and either approve or ask
              for a redo.
            </p>
            <div className="mt-6 flex gap-4 w-full">
              <button
                onClick={handleSubmitVideo}
                disabled={addVideoMutation.isPending}
                className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
              >
                {addVideoMutation.isPending ? "Submitting..." : "Yes"}
              </button>
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="w-full px-2 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
