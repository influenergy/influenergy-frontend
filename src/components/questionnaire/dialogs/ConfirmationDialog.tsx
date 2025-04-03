import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-white rounded-lg p-6">
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <DialogTitle className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <Image
              src="/images/icons/message.png"
              width={40}
              height={40}
              alt="Confirmation"
            />
          </DialogTitle>
          <DialogDescription className="text-base text-black">
            Once all details are submitted, edits will no longer be possible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant={"outline"}
            className="border-primary border text-primary px-6"
            size="lg"
            onClick={onClose}
            type="button"
          >
            No
          </Button>
          <Button
            className="bg-primary text-white px-6"
            size="lg"
            onClick={onConfirm}
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? "Submitting..." : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
