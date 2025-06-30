"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CREATE_POST as questions } from "@/constants/CreatePost";
import { motion } from "framer-motion";
import Image from "next/image";
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
  step6Schema,
} from "@/lib/PostSchema";
import { Step } from "./PostSteps";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { AnyObjectSchema } from "yup";
import { Field } from "@/constants/questions";
import { selectUser, useAppSelector } from "@/store";
import { MoveLeft, MoveRight } from "lucide-react";
import PostReviewStep from "./PostReviewStep";
import { postApi } from "@/services/postServices";

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

const PostQuestionnaire = ({
  mode = "create",
  defaultValues = {},
  onClose,
}: {
  mode?: "create" | "edit";
  defaultValues?: Partial<PostQuestionnaireData>;
  onClose?: () => void;
}) => {
  console.log(defaultValues, " defaultValues in PostQuestionnaire");
  const [currentStep, setCurrentStep] = useState<
    keyof typeof questions | "review"
  >("step1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Renamed state
  const [dialogStep, setDialogStep] = useState<"confirm" | "success" | null>(
    null
  ); // Added state for dialog step
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

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues, mode]);




  const methods = useForm<PostQuestionnaireData>({
    resolver: yupResolver(currentSchema),
    mode: "onBlur",
    defaultValues: mode === "edit" ? defaultValues : formData,
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

      if (isLastStep && mode === "edit") {
        // await postApi.updateAdPost(postId, updatedData);
        setDialogStep("success");
        return;
      }
      if (currentStepIndex === steps.length - 1) {
        setCurrentStep("review");
      } else if (currentStep !== "review") {
        setCurrentStep(steps[currentStepIndex + 1]);
      } else {
        setIsSubmitting(true);

        if (user && user._id) {
          // Use the transformed data directly without FormData
          await postApi.createAdPost(updatedData as PostQuestionnaireData);

          // Set dialog step to success
          setDialogStep("success");
          // Keep the dialog open
          setIsDialogOpen(true);
        } else {
          toast({
            title: "Please login first",
            description: "You need to be logged in to create a campaign.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Form validation/submission error:", error);
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
    } finally {
      setIsSubmitting(false);
    }
  }, [currentFields, formData, trigger, getValues, isLastStep, mode, currentStepIndex, steps, currentStep, user, toast]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  }, [currentStepIndex, steps]);

  const renderStepComponent = useCallback(() => {
    return <Step fields={currentFields} mode={mode} />;
  }, [currentFields, mode]);

  return (
    <>
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
                className="p-6  rounded-lg border-primary text-primary"
                type="button"
                disabled={isSubmitting}
              >
                Previous
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="ml-auto p-6 bg-primary text-white rounded-lg"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setDialogStep("confirm")} // Set step on trigger click
                  >
                    {!isSubmitting ? "Complete Campaign" : "Submitting..."}
                  </Button>
                </DialogTrigger>
                {/* Apply styling similar to DeleteModal */}
                <DialogContent className="sm:max-w-sm bg-white rounded-lg p-6">
                  {dialogStep === "confirm" && (
                    <>
                      <DialogHeader className="flex flex-col items-center gap-4 text-center">
                        <DialogTitle className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                          <Image
                            src="/images/icons/message.png" // Confirmation Icon
                            width={40}
                            height={40}
                            alt="Confirmation"
                          />
                        </DialogTitle>
                        <DialogDescription className="text-base text-black">
                          Once all details are submitted, edits will no longer
                          be possible.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <Button
                          variant={"outline"}
                          className="border-primary border text-primary px-6" // Adjusted styling
                          size="lg"
                          onClick={() => setIsDialogOpen(false)}
                          type="button"
                        >
                          No
                        </Button>
                        <Button
                          className="bg-primary text-white px-6" // Adjusted styling
                          size="lg"
                          onClick={handleSubmit(handleNext)}
                          disabled={isSubmitting}
                          type="button"
                        >
                          {isSubmitting ? "Submitting..." : "Yes"}
                        </Button>
                      </div>
                    </>
                  )}
                  {dialogStep === "success" && (
                    <>
                      <DialogHeader className="flex flex-col items-center gap-4 text-center">
                        <DialogTitle className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                          <Image
                            src="/images/icons/window.png" // Success Icon
                            width={40}
                            height={40}
                            alt="Success"
                          />
                        </DialogTitle>
                        <DialogDescription className="text-base text-black">
                          Your post is successfully created. Go to AI find tab
                          to match your post with creators.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <Button
                          className="bg-primary text-white px-6 w-full" // Adjusted styling
                          size="lg"
                          onClick={() => {
                            setIsDialogOpen(false);
                            router.push("/dashboard/brand/findai"); // Navigate on click
                          }}
                          type="button"
                        >
                          Take me to AI Find
                        </Button>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </FormProvider>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleNext)}
            className="max-w-7xl w-full h-full p-2 flex flex-col items-center justify-evenly"
          >
            <div className="md:mb-8 flex flex-col items-center">
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

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              {renderStepComponent()}
            </motion.div>

            <div className="md:mt-8 flex justify-center items-center w-full gap-4 ">
              {currentStepIndex > 0 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="p-6  rounded-lg flex items-center justify-center gap-2 text-primary border-primary text-lg"
                  type="button"
                >
                  <MoveLeft size={20} />
                  Previous
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="p-6  rounded-lg flex items-center justify-center gap-2 text-primary border-primary text-lg"
                  type="button"
                  onClick={() => router.push("/dashboard")}
                >
                  Skip
                </Button>
              )}
              <Button
                className="p-6  bg-primary text-lg  rounded-lg flex items-center justify-center gap-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isLastStep
                  ? isSubmitting
                    ? "Submitting..."
                    : "Submit"
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
