import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "@/lib/PostSchema";
import PrimaryNicheInput from "../ui/PrimaryNicheInput";
import { Slider } from "../ui/slider";

interface StepProps {
  fields: Field[];
}

// Helper function to determine if a field is required based on validation schemas
export const isFieldRequired = (fieldName: string): boolean => {
  try {
    const combinedFields = {
      ...step1Schema.fields,
      ...step2Schema.fields,
      ...step3Schema.fields,
      ...step4Schema.fields,
      ...step5Schema.fields,
      ...step6Schema.fields,
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

// Add GenderInput component
export const GenderInput = ({ field }: { field: Field }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];

  const otherGenderFieldName =
    `${fieldName}-other` as keyof PostQuestionnaireData;
  const otherGenderError = errors[otherGenderFieldName];

  const selectedGender = watch(fieldName); // Watch selected gender

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <select
            {...register(fieldName)}
            className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            } focus:outline-none focus:ring-2 appearance-none`}
          >
            <option value="" style={{ fontFamily: "Poppins, sans-serif" }}>
              {field.placeholder || "Select"}
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

        {selectedGender === "Others" && (
          <div className="w-full">
            <input
              type="text"
              placeholder="Please specify gender"
              {...register(otherGenderFieldName, {
                validate: (value) =>
                  selectedGender === "Others" && !value
                    ? "This field is required"
                    : true,
              })}
              className={`w-full p-3 border rounded-lg transition-all font-poppins duration-300 ${
                otherGenderError
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

export const FormField = ({ field }: { field: Field }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];

  if (fieldName === "target-interests") {
    return <PrimaryNicheInput field={field} />;
  }

  // Handle gender fields
  if (fieldName === "target-gender") {
    return <GenderInput field={field} />;
  }

  // Skip the "other" field as it's handled in GenderInput
  if (fieldName === "target-gender-other") {
    return null;
  }

  if (field.category === "dropdown") {
    return (
      <div className="relative w-full">
        <select
          {...register(fieldName)}
          className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins ${
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

  if (field.category === "date") {
    return <DateInput field={field} />;
  }

  if (field.category === "file") {
    return (
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                setValue(fieldName, reader.result, { shouldValidate: true });
              }
            };
          }
        }}
        className={`w-full p-3 border rounded-lg transition-all duration-200 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-primary"
        } focus:outline-none focus:ring-2`}
      />
    );
  }

  if (field.category === "range") {
    const value = watch(fieldName) || 0;

    return (
      <div className="w-full">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Min: $1</span>
            <span className="text-sm text-gray-500">Max: $3000</span>
          </div>

          <Slider
            value={[Number(value)]}
            onValueChange={([value]) => {
              setValue(fieldName, value.toString(), { shouldValidate: true });
            }}
            min={1}
            max={3000}
            step={1}
            className="w-full"
          />

          <div className="h-6 relative">
            <div
              className="absolute px-2 py-1 bg-primary text-white rounded-md text-xs transform -translate-x-1/2"
              style={{
                left: `${((Number(value) - 1) / (3000 - 1)) * 100}%`,
                top: "4px",
              }}
            >
              ${Number(value).toLocaleString()}
            </div>
          </div>
        </div>

        {/* {error && (
          <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
        )} */}
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

export const StepComponent = ({ fields }: StepProps) => {
  const {
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  return (
    <>
      {fields.map((field) => {
        const fieldName = field.slug as keyof PostQuestionnaireData;
        const error = errors[fieldName];
        const required = isFieldRequired(field.slug);

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

// Date input component using react-datepicker
const DateInput = ({ field }: { field: Field }) => {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];
  const value = watch(fieldName);

  // Register the field but don't use the ref
  register(fieldName);

  return (
    <div className="relative w-full">
      <DatePicker
        selected={value && !Array.isArray(value) ? new Date(value) : null}
        onChange={(date) => {
          setValue(fieldName, date ? date.toISOString() : undefined, {
            shouldValidate: true,
          });
        }}
        dateFormat="MM/dd/yyyy"
        className={`w-full p-3 border rounded-lg transition-all duration-200 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-primary"
        } focus:outline-none focus:ring-2`}
        placeholderText="Select date"
      />
    </div>
  );
};

export const Step = ({ fields }: StepProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
    <StepComponent fields={fields} />
  </div>
);
