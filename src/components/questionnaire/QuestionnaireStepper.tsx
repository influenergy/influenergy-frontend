// components/questionnaire/QuestionnaireStepper.tsx
import { useState } from "react";
import { questions } from "@/constants/questions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { completeQuestionnaire } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

const QuestionnaireStepper = () => {
  const [currentStep, setCurrentStep] = useState<keyof typeof questions>("step1");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const steps = Object.keys(questions) as (keyof typeof questions)[];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleSubmit = () => {
    dispatch(completeQuestionnaire(answers));
    router.push("/dashboard");
  };

  const handleInputChange = (fieldKey: string, value: any) => {
    setAnswers(prev => ({ ...prev, [fieldKey]: value }));
  };

  const renderInput = (field: any) => {
    switch (field.category) {
      case 'dropdown':
        return (
          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleInputChange(field.title, e.target.value)}
          >
            {field.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            className="w-full p-3 border rounded-lg "
            onChange={(e) => handleInputChange(field.title, e.target.value)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleInputChange(field.title, e.target.value)}
          />
        );
      case 'text':
        return (
          <input
            type="text"
            className="w-full p-3 border rounded-lg h-12"
            onChange={(e) => handleInputChange(field.title, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl w-full h-screen mx-auto p-6 flex flex-col items-center justify-evenly">
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
        className={
          questions[currentStep].fields.length > 1
            ? "grid grid-cols-2 gap-4"
            : "space-y-4 w-full"
        }
      >
        {questions[currentStep].fields.map((field) => (
          <div key={field.title} className="space-y-2 w-full">
            <label className="block text-sm font-medium text-gray-700">
              {field.title}
            </label>
            {renderInput(field)}
          </div>
        ))}
      </motion.div>

      <div className="mt-8 flex justify-between w-full gap-4">
        {currentStepIndex > 0 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="px-6 py-5 w-full rounded-lg"
          >
            Previous
          </Button>
        )}
        <Button
          onClick={isLastStep ? handleSubmit : handleNext}
          className="ml-auto px-6 py-5 bg-[#7877e6] w-full rounded-lg"
        >
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionnaireStepper;