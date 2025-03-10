import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { CREATE_POST as questions } from "@/constants/CreatePost";

interface ReviewStepProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}

const PostReviewStep = ({ onEdit }: ReviewStepProps) => {
  const { watch } = useFormContext<CreatorQuestionnaireData>();
  const formData = watch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sections = Object.entries(questions).map(([_, step], index) => {
    return {
      title: step.title || `Step ${index + 1}`,
      icon: step.icon,
      fields: step.fields.map((field) => ({
        label: field.title,
        value: Array.isArray(
          formData[field.slug as keyof CreatorQuestionnaireData]
        )
          ? (
              formData[field.slug as keyof CreatorQuestionnaireData] as string[]
            )?.join(", ")
          : formData[field.slug as keyof CreatorQuestionnaireData],
      })),
      step: index + 1,
    };
  });

  return (
    <div className="w-full mx-auto py-8 px-4 relative ">
      <div className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text font-bold mt-4 mb-2">
          We Would Love to Know More About You
        </h2>
        <p className="text-gray-600 font-light">
          This helps fine tune your brand matches
        </p>
      </div>

      <div className="space-y-8 max-w-5xl w-full mx-auto">
        {sections.map((section) => (
          <div key={section.title} >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg shadow-sm border p-6">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {field.label}
                  </p>
                  <p className="text-base text-gray-900">
                    {String(field.value) || "Not provided"}
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
