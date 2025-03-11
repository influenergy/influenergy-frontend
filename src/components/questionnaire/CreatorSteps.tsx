import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import SocialMediaInput from "../ui/SocialMediaInput";
import { ChevronDown } from "lucide-react";
import * as yup from "yup";

import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/CreatorSchema";



interface StepProps {
  fields: Field[];
}

// Helper function to determine if a field is required based on validation schemas
const isFieldRequired = (fieldName: string): boolean => {
  try {
    const combinedFields = {
      ...step1Schema.fields,
      ...step2Schema.fields,
      ...step3Schema.fields,
      ...step4Schema.fields,
      ...step5Schema.fields,
    };

    const field = combinedFields[fieldName as keyof typeof combinedFields] as
      | yup.Schema<unknown>
      | undefined;

    if (!field) return false;

    const fieldDescription = field.describe();

    // Check if explicitly required
    const isExplicitlyRequired = fieldDescription.tests.some(
      (test) => test.name === "required"
    );

    // Handle date fields separately (if not nullable)
    const isDateRequired =
      fieldDescription.type === "date" &&
      !fieldDescription.tests.some((test) => test.name === "nullable");

    // Handle array fields: required if min(1) is present
    console.log('nullable',!fieldDescription.nullable)
    const isArrayRequired =
      fieldDescription.type === "array" && !fieldDescription.nullable;

    return isExplicitlyRequired || isDateRequired || isArrayRequired;
  } catch (error) {
    console.warn(
      `Could not determine if field ${fieldName} is required`,
      error
    );
    return false;
  }
};

const FormField = ({ field }: { field: Field }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  if (field.category === "dropdown") {
    return (
      <div className="relative w-full">
        <select
          {...register(fieldName)}
          className={`w-full p-3  border rounded-lg transition-all duration-200 font-poppins ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
          } focus:outline-none focus:ring-2 appearance-none`}
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
  }
  if (field.category === "multiselect") {
    const selectedOptions = watch(fieldName) || [];

    return (
      <div>
        <Select
          isMulti
          options={field.options?.map((option) => ({
            label: option,
            value: option,
          }))}
          value={(selectedOptions as string[]).map((value: string) => ({
            label: value,
            value,
          }))}
          onChange={(selected) => {
            const values = selected.map((opt) => opt.value);
            setValue(fieldName, values, { shouldValidate: true });
          }}
          classNamePrefix="react-select"
        />
      </div>
    );
  }

  return (
    <input
      type={field.category}
      {...register(fieldName)}
      className={`w-full p-3 border rounded-lg transition-all duration-200 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-primary"
      } focus:outline-none focus:ring-2`}
    />
  );
};

const StepComponent = ({ fields }: StepProps) => {
  const {
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  return (
    <>
      {fields.map((field) => {
        const fieldName = field.slug as keyof CreatorQuestionnaireData;
        const error = errors[fieldName];
        const required = isFieldRequired(field.slug);

        // Skip link fields as they're handled within SocialMediaInput
        if (
          fieldName === "primary-social-media-link" ||
          fieldName === "secondary-social-media-link"
        ) {
          return null;
        }

        // Special handling for social media fields
        if (
          fieldName === "primary-social-media" ||
          fieldName === "secondary-social-media"
        ) {
          return (
            <div key={field.title} className="space-y-2 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.title}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <SocialMediaInput field={field} />
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error.message as string}
                </p>
              )}
            </div>
          );
        }

        // Regular field rendering
        return (
          <div key={field.title} className="space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <FormField field={field} />
            {error && (
              <p className="text-red-500 text-sm mt-1">
                {error.message as string}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export const Step = ({ fields }: StepProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
    <StepComponent fields={fields} />
  </div>
);
