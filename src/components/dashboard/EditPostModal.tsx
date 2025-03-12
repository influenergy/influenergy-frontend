import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProfileActions from "@/components/userProfile/ProfileActions";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_POST } from "@/constants/CreatePost";
import { useToast } from "@/hooks/use-toast";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { Step } from "../questionnaire/PostSteps";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/PostSchema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as yup from "yup";

interface EditPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Combined schemas for the new step structure
const combinedSchemas = {
  step1: yup.object().shape({
    ...step1Schema.fields,
    ...step2Schema.fields,
  }),
  step2: yup.object().shape({
    ...step3Schema.fields,
    ...step4Schema.fields,
  }),
  step3: step5Schema,
};

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the current schema for the combined step
  const getCurrentSchema = () => {
    switch (step) {
      case 1:
        return combinedSchemas.step1;
      case 2:
        return combinedSchemas.step2;
      case 3:
        return combinedSchemas.step3;
      default:
        return combinedSchemas.step1;
    }
  };

  const methods = useForm<PostQuestionnaireData>({
    resolver: yupResolver(getCurrentSchema()),
    mode: "onBlur",
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    // Get field names for current steps to validate
    let fieldsToValidate: string[] = [];

    if (step === 1) {
      // Validate fields from steps 1 and 2
      fieldsToValidate = [
        ...CREATE_POST.step1.fields.map((f) => f.slug),
        ...CREATE_POST.step2.fields.map((f) => f.slug),
      ];
    } else if (step === 2) {
      // Validate fields from steps 3 and 4
      fieldsToValidate = [
        ...CREATE_POST.step3.fields.map((f) => f.slug),
        ...CREATE_POST.step4.fields.map((f) => f.slug),
      ];
    } else {
      // Validate fields from step 5
      fieldsToValidate = CREATE_POST.step5.fields.map((f) => f.slug);
    }

    // Trigger validation for the current step fields
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (step < 3) {
        setStep(step + 1);
      }
    } else {
      // Show error toast if validation fails
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: PostQuestionnaireData) => {
    setIsSubmitting(true);
    try {
      // Submit form data to API
      console.log("Form submitted:", data);

      toast({
        title: "Success",
        description: "Ad updated successfully",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update ad",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Edit Ad </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <div className="max-h-[65vh] overflow-y-auto pr-2">
              {step === 1 && (
                <>
                  <div className="grid gap-6 w-full mx-auto">
                    <div className="w-full flex justify-center">
                      <div className="relative">
                        <Image
                          src="/images/login.webp"
                          alt="Header Logo"
                          width={90}
                          height={90}
                          className="rounded-full"
                        />
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/png, image/jpeg"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <ProfileActions />
                      </div>
                    </div>

                    {/* Basic Information - Step 1 */}
                    <div className="text-left pb-2">
                      <h2 className="text-2xl font-poppins font-semibold">
                        Basic Information
                      </h2>
                      <Step fields={CREATE_POST.step1.fields} />
                    </div>

                    {/* Target Audience & Demographics - Step 2 */}
                    <div className="text-left pt-4">
                      <h2 className="text-2xl font-poppins font-semibold">
                        Target Audience & Demographics
                      </h2>
                      <Step fields={CREATE_POST.step2.fields} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-6">
                    {/* Content Vibe - Step 3 */}
                    <div className=" pb-2">
                      <h2 className="text-2xl font-poppins font-semibold">
                        Content Vibe
                      </h2>
                      <div className=" gap-4  px-2">
                        <Step fields={CREATE_POST.step3.fields} />
                      </div>
                    </div>

                    {/* Your Ideal Creator Checklist - Step 4 */}
                    <div className="grid pt-2">
                      <h2 className="text-2xl font-poppins font-semibold">
                        Your Ideal Creator
                      </h2>
                      <div className=" mt-2 px-2">
                        <Step fields={CREATE_POST.step4.fields} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="grid gap-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-poppins font-semibold">
                        Compensation & Deliverables
                      </h2>
                      <p className="text-sm text-gray-500 mt-2">Final Step</p>
                    </div>
                    <div className="max-w-3xl mx-auto w-full">
                      <Step fields={CREATE_POST.step5.fields} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter className="sm:justify-center mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-primary text-primary hover:bg-primary hover:text-white flex justify-center items-center gap-3 py-5 px-5 text-lg"
                >
                  <ArrowLeft /> Previous
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="py-5 px-5 flex justify-center items-center gap-3 text-lg"
                >
                  Next <ArrowRight />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-5 px-5 flex justify-center items-center gap-3 text-lg"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
