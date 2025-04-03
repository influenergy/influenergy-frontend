import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface InputFieldProps {
  type: string;
  field: Field;
  hasError: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  type,
  field,
  hasError,
}) => {
  const { register } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;

  return (
    <input
      type={type}
      {...register(fieldName)}
      placeholder={field.placeholder}
      className={`w-full p-3 border rounded-lg transition-all duration-200 ${
        hasError
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-primary"
      } focus:outline-none focus:ring-2`}
      aria-invalid={hasError}
    />
  );
};
