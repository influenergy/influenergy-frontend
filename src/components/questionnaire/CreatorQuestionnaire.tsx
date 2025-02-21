import { useState, useCallback, useEffect } from "react";
import { creatorApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { CREATOR_QUESTIONS as questions } from "@/constants/questions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { completeQuestionnaire } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { step1Schema, step2Schema, step3Schema } from "@/lib/CreatorSchema";
import { Step1, Step2, Step3 } from "./CreatorSteps";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { AnyObjectSchema } from "yup";
import { Field } from "@/constants/questions";

type StepSchemas = {
  [key in keyof typeof questions]: AnyObjectSchema;
};

const schemas: StepSchemas = {
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
};

const CreatorQuestionnaire = (): JSX.Element => {
  const [currentStep, setCurrentStep] =
    useState<keyof typeof questions>("step1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<CreatorQuestionnaireData>>(
    {}
  );

  const steps = Object.keys(questions) as (keyof typeof questions)[];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentFields = questions[currentStep].fields;
  const currentSchema = schemas[currentStep];

  const methods = useForm<CreatorQuestionnaireData>({
    resolver: yupResolver(currentSchema),
    mode: "onBlur",
    defaultValues: formData,
  });

  const { handleSubmit, trigger, clearErrors, getValues } = methods;

  useEffect(() => {
    clearErrors();
  }, [currentStep, clearErrors]);

  const handleNext = useCallback(
    async (data: Partial<CreatorQuestionnaireData>) => {
      const {
        currentStep: step,
        currentFields: fields,
        formData: prevData,
      } = {
        currentStep,
        currentFields,
        formData,
      };

      try {
        const stepFields = fields.map((field: Field) => field.slug) as Array<
          keyof CreatorQuestionnaireData
        >;
        const isValid = await trigger(stepFields);

        if (!isValid) {
          return;
        }

        const currentValues = getValues() as Partial<CreatorQuestionnaireData>;
        const updatedData = {
          ...prevData,
          ...currentValues,
          // Convert string date to Date object
          ...(currentValues.dateOfBirth && {
            dateOfBirth: new Date(currentValues.dateOfBirth),
          }),
        };
        setFormData(updatedData);

        if (!isLastStep) {
          setCurrentStep(steps[currentStepIndex + 1]);
        } else {
          setIsSubmitting(true);
          // Convert dateOfBirth to ISO string before sending to API
          const submitData = {
            ...updatedData,
            dateOfBirth:
              updatedData.dateOfBirth instanceof Date
                ? updatedData.dateOfBirth.toISOString()
                : updatedData.dateOfBirth,
          };
          // await creatorApi.submitQuestionnaire(
          //   submitData as CreatorQuestionnaireData
          // );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          toast({
            title: "Success!",
            description: "Your profile has been updated successfully.",
          });
          dispatch(completeQuestionnaire());
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Form validation/submission error:", error);
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Please check all required fields.",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      currentStep,
      currentFields,
      formData,
      isLastStep,
      currentStepIndex,
      steps,
      router,
      toast,
      trigger,
      getValues,
    ]
  );

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  }, [currentStepIndex, steps]);

  const renderStepComponent = useCallback(() => {
    switch (currentStep) {
      case "step1":
        return <Step1 fields={currentFields} />;
      case "step2":
        return <Step2 fields={currentFields} />;
      case "step3":
        return <Step3 fields={currentFields} />;
      default:
        return null;
    }
  }, [currentStep, currentFields]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleNext)}
        className="max-w-5xl w-full h-screen p-6 flex flex-col items-center justify-evenly"
      >
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">
            {questions[currentStep].title}
          </h2>
          <p className="text-gray-600">{questions[currentStep].description}</p>
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

        <div className="mt-8 flex justify-between w-full gap-4">
          {currentStepIndex > 0 ? (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="px-6 py-5 w-full rounded-lg"
              type="button"
            >
              Previous
            </Button>
          ) : (
            <Button
              variant="outline"
              className="px-6 py-5 w-full rounded-lg"
              type="button"
              onClick={() => router.push("/dashboard")}
            >
              Skip
            </Button>
          )}
          <Button
            className="ml-auto px-6 py-5 bg-primary w-full rounded-lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isLastStep ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreatorQuestionnaire;
