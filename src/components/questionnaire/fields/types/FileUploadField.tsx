import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface FileUploadFieldProps {
  field: Field;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({ field }) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();
  const [isLoading, setIsLoading] = useState(false);

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setValue(fieldName, reader.result, { shouldValidate: true });
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleFileChange}
        className={`w-full p-3 border rounded-lg transition-all duration-200 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-primary"
        } focus:outline-none focus:ring-2`}
        disabled={isLoading}
      />
      {isLoading && (
        <p className="text-sm text-gray-500 mt-1">Loading file...</p>
      )}
    </>
  );
};
