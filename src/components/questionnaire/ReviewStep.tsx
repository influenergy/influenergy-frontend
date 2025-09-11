import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { CREATOR_QUESTIONS as questions } from "@/constants/questions";
// import Image from "next/image";
// import { motion } from "framer-motion";

interface ReviewStepProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}

const ReviewStep = ({ onEdit }: ReviewStepProps) => {
  const { watch } = useFormContext<CreatorQuestionnaireData>();
  const formData = watch();

  // Function to format field values for display
  const formatFieldValue = (
    field: string,
    value: string | Date | string[] | undefined
  ): string => {
    // Handle all gender fields with "Others" option
    if (field === "gender" && value === "Others") {
      const customGender = formData["gender-other"];
      return customGender ? `Others (${customGender})` : "Others";
    }

    if (field === "primary-audience-gender" && value === "Others") {
      const customGender = formData["primary-audience-gender-other"];
      return customGender ? `Others (${customGender})` : "Others";
    }

    if (field === "secondary-audience-gender" && value === "Others") {
      const customGender = formData["secondary-audience-gender-other"];
      return customGender ? `Others (${customGender})` : "Others";
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    // Handle Date objects
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    // Return the value as string or "Not provided" if empty
    return String(value || "Not provided");
  };

  const sections = Object.entries(questions).map(([, step], index) => {
    return {
      title: step.title || `Step ${index + 1}`,
      icon: step.icon,
      fields: step.fields
        .map((field) => {
          // Skip all "other" gender fields as they will be combined with their respective gender fields
          if (
            field.slug === "gender-other" ||
            field.slug === "primary-audience-gender-other" ||
            field.slug === "secondary-audience-gender-other"
          ) {
            return null;
          }

          return {
            label: field.title,
            value: formatFieldValue(
              field.slug,
              formData[field.slug as keyof CreatorQuestionnaireData]
            ),
            slug: field.slug,
          };
        })
        .filter((field): field is NonNullable<typeof field> => field !== null), // Filter out null values with type guard
      step: index + 1,
    };
  });

  return (
    <div className="w-full mx-auto py-4 px-2 sm:py-8 sm:px-4 relative dark:text-gray-100 ">
      <div className="mb-6 flex flex-col justify-center items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-2 text-center dark:text-gray-100">
          We Would Love to Know More About You
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-light text-center">
          This helps fine tune your brand matches
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 max-w-5xl w-full mx-auto">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 flex items-center gap-2">
                <section.icon className="text-primary" /> {section.title}
              </h3>
              <Button
                variant="ghost"
                onClick={() => onEdit(section.step)}
                className="text-primary hover:text-primary/90 p-2"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 rounded-lg shadow-sm border dark:border-gray-700 p-3 sm:p-6">
              {section.fields.map((field) => (
                <div key={field.slug} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {field.label}
                  </p>
                  <p className="text-base text-gray-900 dark:text-gray-100 break-words">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewStep;
