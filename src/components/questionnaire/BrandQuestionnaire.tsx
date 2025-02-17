"use client";
import { useState, useCallback, useEffect } from "react";
import { brandApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { BRAND_QUESTIONS as questions } from "@/constants/questions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema as brandSchema, BrandFormData } from "@/lib/BrandSchema";
import { Step1 } from "./BrandSteps";

const BrandQuestionnaire = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<BrandFormData>({
    resolver: yupResolver(brandSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      companyWebsite: "",
      noOfEmployees: "",
      budgetForCampaign: "",
      howDidYouHearAboutThis: ""
    }
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
    watch
  } = methods;

  // Trigger validation on mount
  useEffect(() => {
    trigger();
  }, [trigger]);

  // Watch form values for debugging
  const formValues = watch();
  useEffect(() => {
    console.log('Form values:', formValues);
    console.log('Form errors:', errors);
  }, [formValues, errors]);

  const onSubmit = useCallback(
    async (data: BrandFormData) => {
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

        console.log("Submitting data:", data);
        await brandApi.submitQuestionnaire(data);

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
          description: error instanceof Error 
            ? error.message 
            : "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, toast, trigger]
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-full min-h-screen p-6 flex flex-col items-center justify-evenly"
      >
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">{questions.step1.title}</h2>
          <p className="text-gray-600">{questions.step1.description}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="w-full"
        >
          <Step1 fields={questions.step1.fields} />
        </motion.div>

        <div className="mt-8 w-full max-w-md">
          <Button
            className="w-full px-6 py-5 bg-[#7877e6] hover:bg-[#6564d8] text-white rounded-lg transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#7877e6]"
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BrandQuestionnaire;
