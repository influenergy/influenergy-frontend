import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
// import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAddVideoUrl } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { UploadCloud } from "lucide-react";
import { Award } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

interface Video {
  link: string;
  timestamp: string;
  status: string;
  _id: string;
  reason?: string;
}

export default function StatusModal({
  open,
  onOpenChange,
  collaborationId,
  data,
  status,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborationId: string;
  data: Video[] | [];
  status: string;
}) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const queryClient = useQueryClient();

  const addVideoMutation = useAddVideoUrl(videoUrl, collaborationId);

  const handleSubmitVideo = async () => {
    try {
      await addVideoMutation.mutateAsync();
      // Force refetch of relevant data
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["creatorVideos", collaborationId],
      });
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
            <Button
              variant="link"
              className="font-semibold text-primary bg-white"
              onClick={() =>
                (window.location.href = "mailto:support@influenergy.co")
              }
            >
              Get Help?
            </Button>
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
                src={"https://d20cf3kfv1a9jn.cloudfront.net/images/collab.svg"}
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
            <div className="absolute left-0 w-8 h-8 text-gray-400 bg-secondary rounded-full flex items-center justify-center z-10">
              {/* <Image
                src={"https://d20cf3kfv1a9jn.cloudfront.net/images/videos.svg"}
                alt={""}
                width={20}
                height={20}
              /> */}
              <UploadCloud className="text-primary" />
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
                  disabled={
                    data[0]?.status == "Pending" ||
                    data[0]?.status == "Approved"
                  }
                />
                <button
                  onClick={() => setIsConfirmationOpen(true)}
                  disabled={
                    data[0]?.status == "Pending" ||
                    data[0]?.status == "Approved"
                  }
                  className="w-full p-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
                >
                  Send Video Link to Brand
                </button>
              </div>
              {data.length > 0 && (
                <div className="mt-2">
                  <p
                    className={`text-xs italic ${data[0].status == "Pending"
                      ? "text-yellow-500"
                      : data[0].status == "Declined"
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    {data[0].status == "Pending"
                      ? "Pending Approval"
                      : data[0].status == "Declined"
                        ? data[0]?.reason ||
                        "Video modification requested . Please Check Your Email for More Details"
                        : "Approved"}{" "}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Step 3 - Inactive */}
          <div className="relative mb-8 pl-12">
            <div
              className={`absolute left-0 w-8 h-8 ${status == "Completed" ? "bg-secondary" : "bg-gray-100"
                } text-gray-400 rounded-full flex items-center justify-center z-10`}
            >
              {/* <Image
                src={"https://d20cf3kfv1a9jn.cloudfront.net/images/video.svg"}
                alt={""}
                width={20}
                height={20}
              /> */}
              <Award
                className={`${status == "Completed" ? "text-primary" : "text-gray-400"
                  }`}
              />
            </div>
            <div className="">
              <p
                className={`${status == "Completed" ? "text-primary" : "text-gray-400"
                  }`}
              >
                Video accepted by Brand
              </p>
            </div>
          </div>

          {/* Step 4 - Inactive */}
          <div className="relative pl-12 mt-10">
            <div
              className={`absolute left-0  w-8 h-8 ${status == "Completed" ? "bg-secondary" : "bg-gray-100"
                } text-gray-400 rounded-full flex items-center justify-center z-10`}
            >
              <CheckCircle
                className={`${status == "Completed" ? "text-primary" : "text-gray-400"
                  }`}
              />
            </div>
            <div className="">
              <p
                className={`${status == "Completed" ? "text-primary" : "text-gray-400"
                  }`}
              >
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
                src="https://d20cf3kfv1a9jn.cloudfront.net/images/film.png"
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
              <Button
                onClick={handleSubmitVideo}
                disabled={addVideoMutation.isPending}
                className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-md border border-primary hover:bg-white hover:text-primary transition"
              >
                {addVideoMutation.isPending ? "Submitting..." : "Yes"}
              </Button>
              <Button
                onClick={() => setIsConfirmationOpen(false)}
                className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-md hover:bg-white hover:text-primary transition"
                disabled={addVideoMutation.isPending}
              >
                No
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
