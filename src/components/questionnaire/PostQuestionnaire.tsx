"use client";
import { useCallback } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CREATE_POST as questions } from "@/constants/CreatePost";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "@/lib/PostSchema";
import { Step } from "./PostSteps";
import { AnyObjectSchema } from "yup";
import PostReviewStep from "./PostReviewStep";
import { useQuestionnaireForm } from "@/hooks/useQuestionnaireForm";
import { ConfirmationDialog } from "./dialogs/ConfirmationDialog";
import { SuccessDialog } from "./dialogs/SuccessDialog";
import { StepNavigation } from "./navigation/StepNavigation";
import { ReviewNavigation } from "./navigation/ReviewNavigation";

// Define schema mapping for validation
type StepSchemas = {
  [key in keyof typeof questions]: AnyObjectSchema;
};

const schemas: StepSchemas = {
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
  step6: step6Schema,
};

const PostQuestionnaire = (): JSX.Element => {
  const router = useRouter();
  
  // Use custom hook for form handling logic
  const {
    methods,
    currentStep,
    setCurrentStep,
    steps,
    currentStepIndex,
    isSubmitting,
    isLastStep,
    isDialogOpen,
    setIsDialogOpen,
    dialogStep,
    setDialogStep,
    handleNext,
    handlePrevious,
    currentFields,
    handleSubmit,
  } = useQuestionnaireForm({ schemas });

  // Render the current step component
  const renderStepComponent = useCallback(() => {
    return <Step fields={currentFields} />;
  }, [currentFields]);

  // Handle dialog navigation
  const handleSuccessNavigation = () => {
    setIsDialogOpen(false);
    router.push("/dashboard/brand/findai");
  };

  // Conditional rendering based on current step
  return (
    <>
      {currentStep === "review" ? (
        // Review screen layout
        <div className="flex flex-col w-full">
          <FormProvider {...methods}>
            <PostReviewStep
              onBack={() => setCurrentStep(steps[steps.length - 1])}
              onEdit={(step) => setCurrentStep(steps[step - 1])}
            />
            
            {/* Navigation buttons for review step */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <ReviewNavigation
                isSubmitting={isSubmitting}
                onPrevious={() => setCurrentStep(steps[steps.length - 1])}
                onOpenConfirmation={() => setDialogStep("confirm")}
              />
              
              {/* Confirmation and Success Dialogs */}
              {dialogStep === "confirm" ? (
                <ConfirmationDialog 
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onConfirm={handleSubmit(handleNext)}
                  isSubmitting={isSubmitting}
                />
              ) : dialogStep === "success" ? (
                <SuccessDialog
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onNavigate={handleSuccessNavigation}
                />
              ) : null}
            </Dialog>
          </FormProvider>
        </div>
      ) : (
        // Regular steps layout
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleNext)}
            className="max-w-7xl w-full h-full p-2 flex flex-col items-center justify-evenly"
          >
            {/* Step title and description */}
            <div className="mb-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2">
                {questions[currentStep as keyof typeof questions]?.title}
              </h2>
              <p className="text-gray-600">
                {questions[currentStep as keyof typeof questions]?.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
            </div>

            {/* Animated step content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              {renderStepComponent()}
            </motion.div>

            {/* Step navigation buttons */}
            <StepNavigation
              currentStepIndex={currentStepIndex}
              isSubmitting={isSubmitting}
              isLastStep={isLastStep}
              onPrevious={handlePrevious}
              onSkip={() => router.push("/dashboard")}
            />
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default PostQuestionnaire;
