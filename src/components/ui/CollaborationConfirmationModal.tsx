import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CollaborationConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CollaborationConfirmationModal: React.FC<
  CollaborationConfirmationModalProps
> = ({ isOpen, onOpenChange, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <Image
              src="/images/AIFind/message.png"
              width={50}
              height={50}
              alt="logo"
            />
          </DialogTitle>
          <DialogDescription className="text-black text-center text-lg ">
            By confirming, $100 will be deducted from your wallet. Are you sure
            you want to continue?
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex justify-center items-center gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            No
          </Button>
          <Button type="button" onClick={onConfirm} className="w-full">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
