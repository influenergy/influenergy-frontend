"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { CREATE_POST as questions } from "@/constants/CreatePost";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
// import { setCredentials, User } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema
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

const PostQuestionnaire = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<
    keyof typeof questions | "review"
  >("step1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
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
        setIsSubmitting(true);

        if (user && user._id) {
          // Use the transformed data directly without FormData
          await postApi.createAdPost(
            updatedData as PostQuestionnaireData
          );

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
    currentFields,
    formData,
    currentStepIndex,
    steps,
    router,
    toast,
    trigger,
    getValues,
    dispatch,
    currentStep,
    user,
  ]);
 
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

              <Button
                className="ml-auto p-6   bg-primary text-white rounded-lg"
                type="submit"
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
                Lets Create Your Profile
              </h2>
              <p className="text-gray-600">
                In order to match you with the right brands, we need a few more
                details
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
