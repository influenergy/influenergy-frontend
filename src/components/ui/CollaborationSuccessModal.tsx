import React from "react";
import { Button } from "@/components/ui/button";

interface CollaborationSuccessModalProps {
  isOpen: boolean;
}

export const CollaborationSuccessModal: React.FC<
  CollaborationSuccessModalProps
> = ({ isOpen }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Collaboration Request Sent
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Your collaboration request has been sent to the creator. Kindly wait
          up to 48 hours. Check status under active collaboration.
        </p>
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={() => {
              window.location.href = "/dashboard/brand/findai";
            }}
          >
            Go To Pending Collaboration
          </Button>
        </div>
      </div>
    </div>
  );
};
