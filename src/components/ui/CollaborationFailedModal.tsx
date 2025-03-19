import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CollaborationFailedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CollaborationFailedModal: React.FC<
  CollaborationFailedModalProps
> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Collaboration Failed</DialogTitle>
          <DialogDescription>
            Your collaboration request failed. Kindly recharge your wallet.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            I will do it later
          </Button>
          <Button type="button" onClick={() => {
              // Implement recharge wallet logic here
            //   alert("Recharge Wallet Clicked");
              onOpenChange(false);
            }}>
            Recharge My Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
