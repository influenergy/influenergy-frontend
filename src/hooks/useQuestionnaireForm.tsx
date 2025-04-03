import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { Field } from "@/constants/questions";
import { useToast } from "@/hooks/use-toast";
import { CREATE_POST as questions } from "@/constants/CreatePost";
import { useRouter } from "next/navigation";
import { AnyObjectSchema } from "yup";
import { postApi } from "@/services/postServices";
import { selectUser, useAppSelector } from "@/store";

type StepSchemas = {
  [key in keyof typeof questions]: AnyObjectSchema;
};

interface UseQuestionnaireFormProps {
  schemas: StepSchemas;
}

export const useQuestionnaireForm = ({ schemas }: UseQuestionnaireFormProps) => {
  const [currentStep, setCurrentStep] = useState<
    keyof typeof questions | "review"
  >("step1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<PostQuestionnaireData>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState<"confirm" | "success" | null>(null);

  const { toast } = useToast();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  // Define steps and current step info
  const steps = Object.keys(questions) as (keyof typeof questions)[];
  const currentStepIndex = steps.indexOf(currentStep as keyof typeof questions);
  const isLastStep = currentStep === "review";

  // Get current fields and schema
  const currentFields =
    currentStep !== "review"
      ? questions[currentStep as keyof typeof questions].fields
      : [];
      
  const currentSchema =
    currentStep !== "review"
      ? schemas[currentStep as keyof typeof questions]
      : schemas.step5;

  // Setup form with current schema
  const methods = useForm<PostQuestionnaireData>({
    resolver: yupResolver(currentSchema),
    mode: "onBlur",
    defaultValues: formData,
  });

  const { handleSubmit, trigger, clearErrors, getValues } = methods;

  // Clear errors when step changes
  useEffect(() => {
    clearErrors();
  }, [currentStep, clearErrors]);

  // Authentication check
  useEffect(() => {
    if (!user?._id) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to complete the questionnaire.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [user, toast, router]);

  // Handle next step or submission
  const handleNext = useCallback(async () => {
    try {
      // Validate fields for current step
      const stepFields = currentFields.map((field: Field) => field.slug) as Array<
        keyof PostQuestionnaireData
      >;

      const isValid = await trigger(stepFields);
      if (!isValid) return;

      // Update form data with current values
      const currentValues = getValues() as Partial<PostQuestionnaireData>;
      const updatedData = {
        ...formData,
        ...currentValues,
      };
      setFormData(updatedData);

      // Navigate to next step or review
      if (currentStepIndex === steps.length - 1) {
        setCurrentStep("review");
      } else if (currentStep !== "review") {
        setCurrentStep(steps[currentStepIndex + 1]);
      } else {
        // Handle final submission
        setIsSubmitting(true);

        if (user && user._id) {
          await postApi.createAdPost(updatedData as PostQuestionnaireData);
          setDialogStep("success");
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
  }, [
    currentStep,
    currentStepIndex,
    currentFields,
    formData,
    trigger,
    getValues,
    steps,
    toast,
    user,
  ]);

  // Handle going back to previous step
  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  }, [currentStepIndex, steps]);

  return {
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
    formData,
    handleSubmit,
    router,
  };
};
