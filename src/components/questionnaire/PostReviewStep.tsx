import { useFormContext } from "react-hook-form";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { CREATE_POST as questions } from "@/constants/CreatePost";

interface ReviewStepProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}

const PostReviewStep = ({ onEdit }: ReviewStepProps) => {
  const { watch } = useFormContext<PostQuestionnaireData>();
  const formData = watch();

  // Function to format field values for display
  const formatFieldValue = (
    field: string,
    value: string | Date | string[] | undefined
  ): string => {
    // Handle gender field with "Others" option
    if (field === "target-gender" && value === "Others") {
      const customGender = formData["target-gender-other"];
      return customGender ? `Others (${customGender})` : "Others";
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    // Handle special case for campaign post (truncate if it's too long)
    if (
      (field === "campaign-post" || field === "requirement-documents") &&
      typeof value === "string"
    ) {
      return value.length > 20 ? value.slice(0, 20) + "..." : value;
    }

    // Return the value as string or "Not provided" if empty
    return typeof value === "string" && value.length > 50 ? value.slice(0, 50) + "..." : String(value || "Not provided");
  };

  const sections = Object.entries(questions).map(([, step], index) => {
    return {
      title: step.title || `Step ${index + 1}`,
      icon: step.icon,
      fields: step.fields
        .map((field) => {
          // Skip the "other" gender field as it will be combined with the gender field
          if (field.slug === "target-gender-other") {
            return null;
          }

          return {
            label: field.title,
            value: formatFieldValue(
              field.slug,
              formData[field.slug as keyof PostQuestionnaireData]
            ),
            slug: field.slug,
          };
        })
        .filter((field): field is NonNullable<typeof field> => field !== null), // Filter out null values
      step: index + 1,
    };
  });

  return (
    <div className="w-full mx-auto py-8 px-4 relative dark:text-gray-100 ">
      <div className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text font-bold mt-4 mb-2 dark:text-gray-100">
          We Would Love to Know More About You
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-light">
          This helps fine tune your brand matches
        </p>
      </div>

      <div className="space-y-8 max-w-5xl w-full mx-auto">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <section.icon className="text-primary " /> {section.title}
              </h3>
              <Button
                variant="ghost"
                onClick={() => onEdit(section.step)}
                className="text-primary hover:text-primary/90 p-2"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {field.label}
                  </p>
                  <p className="text-base text-gray-900 dark:text-gray-100">
                    {field.label === "Campaign Post"
                      ? typeof field.value === "string"
                        ? field.value.slice(0, 20) + "..."
                        : String(field.value)
                      : String(field.value) || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostReviewStep;
