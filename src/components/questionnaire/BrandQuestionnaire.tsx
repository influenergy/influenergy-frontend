"use client";
import { useState, useCallback, useEffect } from "react";
// import { brandApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { CREATOR_QUESTIONS as questions } from "@/constants/questions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema as brandSchema, BrandFormData } from "@/lib/BrandSchema";
import { Step1 } from "./BrandSteps";
import { useAppDispatch } from "@/store";
import { completeQuestionnaire } from "@/store/features/authSlice";
import { Loader2 } from "lucide-react";

const BrandQuestionnaire = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const methods = useForm<BrandFormData>({
    resolver: yupResolver(brandSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      companyWebsite: "",
      noOfEmployees: "",
      budgetForCampaign: "",
      howDidYouHearAboutThis: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
    trigger,
  } = methods;

  // Trigger validation on mount
  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = useCallback(
    async () => {
      try {
        setIsSubmitting(true);


        // Additional validation check before submission
        const isFormValid = await trigger();
        if (!isFormValid) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please check all required fields.",
          });
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        // await brandApi.submitQuestionnaire(data);
        dispatch(completeQuestionnaire());

        toast({
          title: "Success!",
          description: "Your profile has been updated successfully.",
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Form submission error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, toast, trigger, dispatch]
  );

  const handleSkip = () => {
    router.push("/dashboard");
    toast({
      title: "Skipped",
      description: "You can always complete your profile later.",
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-full min-h-screen p-2 sm:p-6 flex flex-col items-center justify-evenly"
      >
        <div className="mb-6 sm:mb-8 flex flex-col items-center w-full px-2 sm:px-0">
          <h2 className="text-2xl font-bold mb-2 text-center">{questions.step1.title}</h2>
          <p className="text-gray-600 text-center">{questions.step1.description}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="w-full"
        >
          <Step1 fields={questions.step1.fields} />
        </motion.div>

        <div className="mt-6 sm:mt-8 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="w-full sm:w-1/3 px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Skip
          </Button>

          <Button
            className="w-full sm:w-1/3 px-4 sm:px-6 py-4 sm:py-5 bg-primary hover:bg-[#6564d8] text-white rounded-lg transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Lets Collaborate"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BrandQuestionnaire;
