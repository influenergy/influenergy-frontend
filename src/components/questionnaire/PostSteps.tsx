import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
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
  mode?: "create" | "edit";
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
    const isExplicitlyRequired =
      fieldDescription.tests.some((test) => test.name === "required") ||
      fieldDescription.nullable == false;

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



interface FormFieldProps {
  field: Field;
  mode?: "create" | "edit";
}

export const FormField = ({ field }: FormFieldProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];
  // Always call useRef at the top level to avoid conditional hook call
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contentType = watch("content-type");

  // If content type is Long form and duration selected is invalid, clear it
  React.useEffect(() => {
    if (
      fieldName === "video-duration" &&
      contentType === "Long form videos" &&
      watch(fieldName) === "Less than 1 minute"
    ) {
      setValue(fieldName, "", { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType]);

  if (fieldName === "target-interests" || fieldName === "target-gender") {
    return <PrimaryNicheInput field={field} />;
  }


  if (field.category === "dropdown") {
    return (
      <div className="relative w-full">
        <select
          {...register(fieldName)}
          className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins dark:bg-gray-900 dark:text-gray-100 ${error
            ? "border-red-500 focus:ring-red-500 dark:border-red-500"
            : "border-gray-300 focus:ring-primary dark:border-gray-700"
            } focus:outline-none focus:ring-2 appearance-none`}
        >
          <option value="" style={{ fontFamily: "Poppins, sans-serif" }} className="dark:text-gray-200 dark:bg-gray-900">
            Select
          </option>
          {field.options?.map((option) => {
            const disableShortForLongForm =
              fieldName === "video-duration" &&
              contentType === "Long form videos" &&
              option === "Less than 1 minute";
            return (
              <option
                key={option}
                value={option}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="dark:text-gray-200 dark:bg-gray-900"
                disabled={disableShortForLongForm}
              >
                {option}
              </option>
            );
          })}
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
          className="dark:bg-gray-900 dark:text-gray-100"
        />
      </div>
    );
  }
  if (field.category === "grouped-dropdown") {
    return (
      <div className="relative w-full">
        <select
          {...register(fieldName)}
          className={`w-full p-3 max-h-20 border rounded-lg transition-all duration-200 font-poppins dark:bg-gray-900 dark:text-gray-100 ${error
            ? "border-red-500 focus:ring-red-500 dark:border-red-500"
            : "border-gray-300 focus:ring-primary dark:border-gray-700"
            } focus:outline-none focus:ring-2 appearance-none`}
        >
          <option value="" style={{ fontFamily: "Poppins, sans-serif" }} className="dark:text-gray-900">
            Select
          </option>
          {/* Ensure current value is visible even if not part of predefined options */}
          {(() => {
            const currentValue = watch(fieldName) as unknown as string | undefined;
            const allOptions = (field.groups || []).flatMap((g) => g.options);
            const hasCurrent = currentValue && allOptions.includes(currentValue);
            return !hasCurrent && currentValue ? (
              <option value={currentValue} style={{ fontFamily: "Poppins, sans-serif" }}>
                {currentValue}
              </option>
            ) : null;
          })()}
          {field.groups?.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option: string) => (
                <option
                  key={option}
                  value={option}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown size={20} />
        </div>
      </div>
    );
  }


  if (field.category === "date") {
    return <DateInput field={field} />;
  }

  if (field.category === "textarea") {
    return (
      <div>
        <textarea
          {...register(fieldName)}
          placeholder={field.placeholder}
          cols={3}
          rows={3}
          className="w-full p-3 border rounded-lg transition-all duration-200 border-gray-300 dark:border-gray-700 focus:ring-primary text-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
        ></textarea>
      </div>
    );
  }

  if (field.category === "file") {
    // Special handling for campaign-post image preview and upload
    if (fieldName === "campaign-post") {
      const value = watch(fieldName);
      const isImage = typeof value === "string" && value.startsWith("data:image");
      const isUploadedImage = typeof value === "string" && value.startsWith("https://");

      return (
        <div className="flex flex-col gap-2">
          {(isImage || isUploadedImage) ? (
            <div
              className="w-full max-w-xs cursor-pointer border rounded-lg overflow-hidden dark:border-gray-700"
              onClick={() => inputRef.current?.click()}
              title="Click to upload a new image"
              style={{ maxHeight: 200 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Campaign Post Preview"
                className="object-contain w-full h-48 bg-gray-100 dark:bg-gray-800"
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              className="w-full p-3 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-300"
              onClick={() => inputRef.current?.click()}
              title="Click to upload an image"
              style={{ maxHeight: 200 }}
            >
              Click to upload an image
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg, image/png, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
            className="hidden"
          />
        </div>
      );
    }
    // Default file input for other file fields
    return (
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
        className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 ${error
          ? "border-red-500 focus:ring-red-500 dark:border-red-500"
          : "border-gray-300 focus:ring-primary dark:border-gray-700"
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
            <span className="text-sm text-gray-500">Max: $10000</span>
          </div>

          <Slider
            value={[Number(value)]}
            onValueChange={([value]) => {
              setValue(fieldName, value.toString(), { shouldValidate: true });
            }}
            min={1}
            max={10000}
            step={1}
            className="w-full"
          />

          <div className="h-6 relative">
            <div
              className="absolute px-2 py-1 bg-primary text-white rounded-md text-xs transform -translate-x-1/2"
              style={{
                left: `${((Number(value) - 1) / (10000 - 1)) * 100}%`,
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
      className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 ${error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-primary"
        } focus:outline-none focus:ring-2`}
    />
  );
};

export const StepComponent = ({ fields, mode }: StepProps) => {
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
          <div key={field.title} className="md:space-y-2 md:mt-4">
            <label className="block text-sm font-light text-black dark:text-gray-200">
              {field.title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <FormField field={field} mode={mode} />
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
        className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 ${error
          ? "border-red-500 focus:ring-red-500 dark:border-red-500"
          : "border-gray-300 focus:ring-primary dark:border-gray-700"
          } focus:outline-none focus:ring-2`}
        placeholderText="Select date"
      />
    </div>
  );
};

export const Step = ({ fields, mode }: StepProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4">
    <StepComponent fields={fields} mode={mode} />
  </div>
);
