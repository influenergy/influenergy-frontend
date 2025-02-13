"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";
import { questions } from "@/constants/questions";

export default function QuestionnaireStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");

  const steps = questions[userType as keyof typeof questions];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Progress
        value={(currentStep + 1) * (100 / steps.length)}
        className="mb-8"
      />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{steps[currentStep].question}</h2>
        <div className="grid grid-cols-2 gap-4">
          {steps[currentStep].options.map((option) => (
            <Button
              key={option}
              variant={
                answers[steps[currentStep].key] === option
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setAnswers((prev) => ({
                  ...prev,
                  [steps[currentStep].key]: option,
                }))
              }
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={handleSkip}>
            {currentStep === steps.length - 1 ? "Finish" : "Skip"}
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
