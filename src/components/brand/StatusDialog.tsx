import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function StatusDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null; // Ensure the dialog is only rendered when open

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Check Status
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0"></div>
            <p className="text-gray-700">Collaboration Request accepted</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex-shrink-0"></div>
            <p className="text-gray-700">Uploaded Video</p>
            <Button className="ml-auto bg-purple-500 text-white">
              View Video
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex-shrink-0"></div>
            <p className="text-gray-700">Approve or Request Changes</p>
            <Button className="bg-purple-500 text-white">Approve</Button>
            <Button className="bg-gray-200 text-gray-700">
              Request Changes
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0"></div>
            <p className="text-gray-700">Collaboration Completed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
