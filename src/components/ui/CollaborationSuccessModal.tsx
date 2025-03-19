import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CollaborationSuccessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CollaborationSuccessModal: React.FC<
  CollaborationSuccessModalProps
> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Collaboration Request Sent</DialogTitle>
          <DialogDescription>
            100$ from your wallet has been successfully deducted! Your
            collaboration request has been sent to the creator. Kindly wait up
            to 48 hours. Check status under active collaboration.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              // Implement go to pending collaboration logic here
              //   alert("Go To Pending Collaboration Clicked");
              onOpenChange(false);
              window.location.href = "/dashboard/brand/findai";
            }}
          >
            Go To Pending Collaboration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
