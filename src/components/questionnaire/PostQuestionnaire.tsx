"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { CREATE_POST as questions } from "@/constants/CreatePost";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/PostSchema";
import { Step } from "./PostSteps";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { AnyObjectSchema } from "yup";
import { Field } from "@/constants/questions";
import { selectUser, useAppSelector } from "@/store";
import { MoveLeft, MoveRight } from "lucide-react";
import PostReviewStep from "./PostReviewStep";
import { postApi } from "@/services/postServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Image } from "@radix-ui/react-avatar";

type StepSchemas = {
  [key in keyof typeof questions]: AnyObjectSchema;
};

const schemas: StepSchemas = {
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
};

const PostQuestionnaire = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<
    keyof typeof questions | "review"
  >("step5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<PostQuestionnaireData>>({});

  const steps = Object.keys(questions) as (keyof typeof questions)[];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStep === "review";

  if (!user?._id) {
    toast({
      title: "Please login first",
      description: "You need to be logged in to complete the questionnaire.",
      variant: "destructive",
    });
    router.push("/login");
  }

  const currentFields = useMemo(
    () =>
      currentStep !== "review"
        ? questions[currentStep as keyof typeof questions].fields
        : [],
    [currentStep]
  );
  const currentSchema =
    currentStep !== "review"
      ? schemas[currentStep as keyof typeof questions]
      : schemas.step5;

  const methods = useForm<PostQuestionnaireData>({
    resolver: yupResolver(currentSchema),
    mode: "onBlur",
    defaultValues: formData,
  });

  const { handleSubmit, trigger, clearErrors, getValues } = methods;

  useEffect(() => {
    clearErrors();
  }, [currentStep, clearErrors]);

  const handleNext = useCallback(async () => {
    const { currentFields: fields, formData: prevData } = {
      currentFields,
      formData,
    };

    try {
      const stepFields = fields.map((field: Field) => field.slug) as Array<
        keyof PostQuestionnaireData
      >;

      const isValid = await trigger(stepFields);

      if (!isValid) {
        return;
      }

      const currentValues = getValues() as Partial<PostQuestionnaireData>;
      const updatedData = {
        ...prevData,
        ...currentValues,
      };
      setFormData(updatedData);

      if (currentStepIndex === steps.length - 1) {
        setCurrentStep("review");
      } else if (currentStep !== "review") {
        setCurrentStep(steps[currentStepIndex + 1]);
      } else {
        // Instead of immediately submitting, show the confirmation dialog
        setShowConfirmDialog(true);
      }
    } catch (error) {
      console.error("Form validation error:", error);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any).response?.data?.message ||
            "Please check all required fields.",
        });
      }
    }
  }, [
    currentFields,
    formData,
    currentStepIndex,
    steps,
    toast,
    trigger,
    getValues,
    currentStep,
  ]);

  const handleSubmitForm = async () => {
    try {
      setIsSubmitting(true);

      if (user && user._id) {
        // Use the transformed data directly without FormData
        await postApi.createAdPost(formData as PostQuestionnaireData);

        toast({
          title: "Success!",
          description: "Your campaign has been created successfully.",
        });
        router.push("/dashboard/brand/posts");
      } else {
        toast({
          title: "Please login first",
          description: "You need to be logged in to create a campaign.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any).response?.data?.message ||
            "Failed to create campaign. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  }, [currentStepIndex, steps]);

  const renderStepComponent = useCallback(() => {
    return <Step fields={currentFields} />;
  }, [currentFields]);

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
           
            <DialogTitle className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <Image
              src="/images/UserProfile/bin.svg"
              width={50}
              height={50}
              alt="logo"
            />
          </DialogTitle>
            <DialogDescription>
              Once all details are submitted, edits will no longer be possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmitForm}
              disabled={isSubmitting}
              className="bg-primary"
            >
              {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {currentStep === "review" ? (
        <div className="flex flex-col w-full">
          <FormProvider {...methods}>
            <PostReviewStep
              onBack={() => setCurrentStep(steps[steps.length - 1])}
              onEdit={(step) => setCurrentStep(steps[step - 1])}
            />
            <div className="my-3 flex justify-center items-center max-w-5xl mx-auto w-full gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(steps[steps.length - 1])}
                className="p-6 rounded-lg border-primary text-primary"
                type="button"
                disabled={isSubmitting}
              >
                Previous
              </Button>

              <Button
                className="ml-auto p-6 bg-primary text-white rounded-lg"
                type="button" // Changed to type="button" since we handle submission through dialog
                disabled={isSubmitting}
                onClick={handleSubmit(handleNext)}
              >
                {!isSubmitting ? "Complete Profile" : "Submitting..."}
              </Button>
            </div>
          </FormProvider>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleNext)}
            className="max-w-7xl w-full h-full p-2 flex flex-col items-center justify-evenly"
          >
            <div className="mb-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2">
                {questions[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {questions[currentStep].description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              {renderStepComponent()}
            </motion.div>

            <div className="mt-8 flex justify-center items-center w-full gap-4 ">
              {currentStepIndex > 0 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
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
                  onClick={() => router.push("/dashboard")}
                >
                  Skip
                </Button>
              )}
              <Button
                className="p-6 bg-primary text-lg rounded-lg flex items-center justify-center gap-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isLastStep
                  ? isSubmitting
                    ? "Submitting..."
                    : "Next"
                  : "Next"}
                <MoveRight size={20} />
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default PostQuestionnaire;
