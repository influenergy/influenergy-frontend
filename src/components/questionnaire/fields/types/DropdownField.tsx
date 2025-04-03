import React from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface DropdownFieldProps {
  field: Field;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];

  return (
    <div className="relative w-full">
      <select
        {...register(fieldName)}
        className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-primary"
        } focus:outline-none focus:ring-2 appearance-none`}
        aria-invalid={!!error}
      >
        <option value="" style={{ fontFamily: "Poppins, sans-serif" }}>
          Select
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
  );
};
