import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CollaborationFailedModalProps {
  isOpen: boolean;
}

export const CollaborationFailedModal: React.FC<
  CollaborationFailedModalProps
> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Collaboration Failed
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Your collaboration request failed. Kindly retry after some time.
        </p>
        <div className="mt-4 flex justify-end">
          <Link href="/dashboard/brand/findai">
            <Button type="button" variant="secondary">
              Close
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
