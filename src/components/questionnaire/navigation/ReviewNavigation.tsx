import React from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface ReviewNavigationProps {
  isSubmitting: boolean;
  onPrevious: () => void;
  onOpenConfirmation: () => void;
}

export const ReviewNavigation: React.FC<ReviewNavigationProps> = ({
  isSubmitting,
  onPrevious,
  onOpenConfirmation,
}) => {
  return (
    <div className="my-3 flex justify-center items-center max-w-5xl mx-auto w-full gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        className="p-6 rounded-lg border-primary text-primary"
        type="button"
        disabled={isSubmitting}
      >
        Previous
      </Button>

      <DialogTrigger asChild>
        <Button
          className="ml-auto p-6 bg-primary text-white rounded-lg"
          type="button"
          disabled={isSubmitting}
          onClick={onOpenConfirmation}
        >
          {!isSubmitting ? "Complete Campaign" : "Submitting..."}
        </Button>
      </DialogTrigger>
    </div>
  );
};
