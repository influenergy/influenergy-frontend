"use client";
import { X } from "lucide-react";

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
}) {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative bg-black rounded-xl max-w-3xl">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2"
        >
          <X className="w-4 h-4" />
        </button>

        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-[500px] h-[500px] rounded-xl"
        />
      </div>
    </div>
  );
}
