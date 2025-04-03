import React from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

interface StepNavigationProps {
  currentStepIndex: number;
  isSubmitting: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onSkip?: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStepIndex,
  isSubmitting,
  isLastStep,
  onPrevious,
  onSkip,
}) => {
  return (
    <div className="mt-8 flex justify-center items-center w-full gap-4">
      {currentStepIndex > 0 ? (
        <Button
          variant="outline"
          onClick={onPrevious}
          className="p-6 rounded-lg flex items-center justify-center gap-2 text-primary border-primary text-lg"
          type="button"
        >
          <MoveLeft size={20} />
          Previous
        </Button>
      ) : (
        <Button
          variant="outline"
          className="p-6 rounded-lg flex items-center justify-center gap-2 text-primary border-primary text-lg"
          type="button"
          onClick={onSkip}
        >
          Skip
        </Button>
      )}
      <Button
        className="p-6 bg-primary text-lg rounded-lg flex items-center justify-center gap-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isLastStep ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
        <MoveRight size={20} />
      </Button>
    </div>
  );
};
