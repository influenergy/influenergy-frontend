import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { Input } from "../ui/input";

export const GenderInput = ({ field }: { field: Field }) => {
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

  const selectedGender = watch(fieldName); // Watch selected gender

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative w-full dark:text-black">
          <select
            {...register(fieldName)}
            className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins dark:text-black ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
              } focus:outline-none focus:ring-2 appearance-none`}
          >
            <option value="" style={{ fontFamily: "Poppins, sans-serif" }} className="dark:text-gray-900">
              {field.placeholder || "Select"}
            </option>
            {field.options?.map((option) => (
              <option
                key={option}
                value={option}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="dark:text-gray-900"
              >
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={20} />
          </div>
        </div>

        {selectedGender === "Others" && (
          <div className="w-full">
            <Input
              type="text"
              placeholder="Please specify gender"
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

      {otherGenderError && (
        <p className="text-red-500 text-sm mt-1">
          {otherGenderError.message as string}
        </p>
      )}
    </div>
  );
};