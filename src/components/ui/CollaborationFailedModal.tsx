import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CollaborationFailedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CollaborationFailedModal: React.FC<
  CollaborationFailedModalProps
> = ({ isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Collaboration Failed</DialogTitle>
          <DialogDescription>
            Your collaboration request failed. Kindly retry after some time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href="/dashboard/brand/findai">
            <Button
              type="button"
              variant="secondary"
             
            >
              Close
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
