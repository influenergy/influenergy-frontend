import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { ChevronDown } from "lucide-react";

const GenderInput = ({ field }: { field: Field }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  const otherGenderFieldName =
    `${fieldName}-other` as keyof CreatorQuestionnaireData;
  const otherGenderError = errors[otherGenderFieldName];

  const selectedGender = watch(fieldName);
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <select
            {...register(fieldName, {
              required: "Please select a gender",
            })}
            className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins dark:text-black ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
              } focus:outline-none focus:ring-2 appearance-none`}
          >
            <option value="" style={{ fontFamily: "Poppins, sans-serif" }}>
              Select Gender
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
            <option
              value="Others"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Others
            </option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={20} />
          </div>
        </div>

        {selectedGender === "Others" && (
          <div className="w-full">
            <Input
              type="text"
              placeholder="Please specify your gender"
              {...register(otherGenderFieldName, {
                validate: (value) =>
                  selectedGender === "Others" && !value
                    ? "This field is required"
                    : true,
              })}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 ${otherGenderError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
                }`}
            />
          </div>
        )}
      </div>

      {otherGenderError && selectedGender === "Others" && (
        <p className="text-red-500 text-sm mt-1">
          {otherGenderError.message as string}
        </p>
      )}
    </div>
  );
};

export default GenderInput;
