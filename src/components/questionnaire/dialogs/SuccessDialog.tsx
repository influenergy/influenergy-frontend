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

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-white rounded-lg p-6">
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <DialogTitle className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <Image
              src="/images/icons/window.png"
              width={40}
              height={40}
              alt="Success"
            />
          </DialogTitle>
          <DialogDescription className="text-base text-black">
            Your post is successfully created. Go to AI find tab to match your
            post with creators.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            className="bg-primary text-white px-6 w-full"
            size="lg"
            onClick={onNavigate}
            type="button"
          >
            Take me to AI Find
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
