import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";

interface CollaborationContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDecline: () => void;
  handleAccept: () => void;
  isAccepting: boolean;
  isDeclining: boolean;
}


export const CollaborationContractModal: React.FC<
  CollaborationContractModalProps
> = ({ isOpen, onClose, handleDecline, handleAccept, isAccepting, isDeclining }) => {
  const [accepted, setAccepted] = useState(false);

  const userType = useAppSelector((state) => state.auth.userType);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Accept Collaboration Contract
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Please read and accept the collaboration deal contract before proceeding.
        </p>

        <div className="mt-4">
          <a
            href={
              userType === "creator"
                ? "https://d20cf3kfv1a9jn.cloudfront.net/docs/Influenergy - Master Brand Deal Contract (Creators).pdf"
                : "https://d20cf3kfv1a9jn.cloudfront.net/docs/Influenergy - Master Brand Deal Contract (Brands).pdf"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline"
          >
            View Deal Contract
          </a>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="acceptContract"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            className="mr-2"
          />
          <label htmlFor="acceptContract" className="text-sm text-gray-700">
            I have read and accept the terms of the contract
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={handleDecline}
            disabled={isAccepting || isDeclining}
          >
            {isDeclining && (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            )}
            {isDeclining ? "Declining..." : "Decline"}
          </Button>

          <Button
            type="button"
            onClick={handleAccept}
            disabled={!accepted || isAccepting || isDeclining}
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
          >
            {isAccepting && (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            )}
            {isAccepting ? "Accepting & Proceeding..." : "Accept & Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
};
