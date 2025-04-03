import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface TextAreaFieldProps {
  field: Field;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ field }) => {
  const { register } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;

  return (
    <div>
      <textarea
        {...register(fieldName)}
        placeholder={field.placeholder}
        cols={3}
        rows={3}
        className="w-full p-3 border rounded-lg transition-all duration-200 border-gray-300 focus:ring-primary text-gray-700 focus:outline-none focus:ring-2"
      ></textarea>
    </div>
  );
};
