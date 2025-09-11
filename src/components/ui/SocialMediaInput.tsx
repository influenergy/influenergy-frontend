import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { ChevronDown } from "lucide-react";

const SocialMediaInput = ({ field }: { field: Field }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  const linkFieldName = `${fieldName}-link` as keyof CreatorQuestionnaireData;
  const linkError = errors[linkFieldName];

  const selectedPlatform = watch(fieldName);

  // Reset link field when platform changes
  // useEffect(() => {
  //   console.log('test')
  //   setValue(linkFieldName, "");
  // }, [selectedPlatform, linkFieldName, setValue]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className={`${selectedPlatform ? "w-2/6" : "w-full"}`}>
          <select
            {...register(fieldName)}
            className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins dark:bg-gray-900 dark:text-gray-100 ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
              } focus:outline-none focus:ring-2 appearance-none`}
          >
            <option value="" style={{ fontFamily: "Poppins, sans-serif" }}>
              Select Platform
            </option>
            {field.options?.map((option) => (
              <option
                key={option}
                value={option}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={20} />
          </div>
        </div>

        {selectedPlatform && (
          <div className="w-full">
            <Input
              type="text"
              placeholder={`Enter your ${selectedPlatform} profile link`}
              {...register(linkFieldName)}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 dark:text-gray-200 ${linkError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
                }`}
            />
          </div>
        )}
      </div>
      {linkError && (
        <p className="text-red-500 text-sm mt-1">
          {linkError.message as string}
        </p>
      )}
    </div>
  );
};

export default SocialMediaInput;
