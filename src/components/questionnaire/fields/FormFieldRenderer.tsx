import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { DropdownField } from "./types/DropdownField";
import { MultiSelectField } from "./types/MultiSelectField";

import { TextAreaField } from "./types/TextAreaField";
import { FileUploadField } from "./types/FileUploadField";
import { RangeField } from "./types/RangeField";
import { InputField } from "./types/InputField";
import { DateInput } from "../DateInput";
import PrimaryNicheInput from "@/components/ui/PrimaryNicheInput";


interface FormFieldRendererProps {
  field: Field;
}

/**
 * Dynamically renders the appropriate form field component based on field type
 */
export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
}) => {
  const {
    // register,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];

  // Special fields that use custom components
  if (fieldName === "target-interests" || fieldName === "target-gender") {
    return <PrimaryNicheInput field={field} />;
  }

  // Render the appropriate field type based on field.category
  switch (field.category) {
    case "dropdown":
      return <DropdownField field={field} />;
    case "multiselect":
      return <MultiSelectField field={field} />;
    case "date":
      return <DateInput field={field} />;
    case "textarea":
      return <TextAreaField field={field} />;
    case "file":
      return <FileUploadField field={field} />;
    case "range":
      return <RangeField field={field} />;
    default:
      return (
        <InputField type={field.category} field={field} hasError={!!error} />
      );
  }
};
