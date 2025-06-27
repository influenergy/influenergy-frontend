import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import SocialMediaInput from "../ui/SocialMediaInput";
import GenderInput from "../ui/GenderInput";
import { ChevronDown } from "lucide-react";
import * as yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
} from "@/lib/CreatorSchema";
import PrimaryNicheInput from "../ui/PrimaryNicheInput";
import { Slider } from "../ui/slider";
// import { Input } from "@/components/ui/input";

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
      ...step6Schema.fields,
      ...step7Schema.fields,
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

const FormField = ({ field }: { field: Field }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  // Special handling for gender fields
  if (fieldName === "gender") {
    return <GenderInput field={field} />;
  }

  if (
    fieldName === "primary-audience-gender" ||
    fieldName === "secondary-audience-gender"
  ) {
    return <GenderInput field={field} />;
  }

  // Skip the "other" fields as they're handled within the gender inputs
  if (
    fieldName === "primary-audience-gender-other" ||
    fieldName === "secondary-audience-gender-other"
  ) {
    return null;
  }

  if (fieldName === "primary-niche") {
    return <PrimaryNicheInput field={field} />;
  }

  if (field.category === "dropdown") {
    return (
      <div className="relative w-full">
        <select
          {...register(fieldName)}
          className={`w-full p-3  border rounded-lg transition-all duration-200 font-poppins ${error
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

  if (field.category === "textarea") {
    return (
      <div>
        <textarea
          {...register(fieldName)}
          placeholder={field.placeholder}
          cols={30}
          rows={10}
          className="w-full p-3 border rounded-lg transition-all duration-200 border-gray-300 focus:ring-primary text-gray-700 focus:outline-none focus:ring-2"
        ></textarea>
      </div>
    );
  }

  if (field.category === "date") {
    return <DateInput field={field} />;
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
            onValueChange={(values) => {
              setValue(fieldName, `${values[0]}`, { shouldValidate: true });
            }}
            min={1}
            max={10000}
            step={1}
            className="w-full"
          />

          <div className="h-6 relative">
            <div
              className="absolute px-2 py-1 bg-primary text-white rounded-md text-xs transform -translate-x-[10%]"
              style={{
                left: `${((Number(value) - 1) / (10000 - 1)) * 100}%`,
                top: "4px",
              }}
            >
              ${Number(value).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <input
      type={field.category}
      placeholder={field.placeholder}
      {...register(fieldName)}
      className={`w-full p-3 border rounded-lg transition-all duration-200 ${error
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

        const primaryAudience = fieldName.startsWith("primary-audience");
        const secondaryAudience = fieldName.startsWith("secondary-audience");

        // Skip certain fields that are handled within other components
        if (
          fieldName === "primary-social-media-link" ||
          fieldName === "secondary-social-media-link" ||
          fieldName === "primary-audience-gender-other" ||
          fieldName === "secondary-audience-gender-other"
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
          <div key={field.title} className="space-y-2 mt-4 w-full">
            {primaryAudience ||
              (!secondaryAudience && (
                <label className="block text-sm font-medium text-gray-700">
                  {field.title}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              ))}
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

export const Step = ({ fields }: StepProps) => {
  const primaryAudienceFields = fields.filter((field) =>
    field.slug.startsWith("primary-audience")
  );
  const secondaryAudienceFields = fields.filter((field) =>
    field.slug.startsWith("secondary-audience")
  );

  if (primaryAudienceFields.length > 0 && secondaryAudienceFields.length > 0) {
    return (
      <div className="">
        {primaryAudienceFields.length > 0 && (
          <div className="p-2 sm:p-4 rounded-lg">
            <h3 className="text-lg font-light mb-2 ">Your primary audience demography *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-2 md:gap-4">
              <StepComponent fields={primaryAudienceFields} />
            </div>
          </div>
        )}
        {secondaryAudienceFields.length > 0 && (
          <div className="p-2 sm:p-4 rounded-lg">
            <h3 className="text-lg font-light mb-2">Your secondary audience demography </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-2 md:gap-4">
              <StepComponent fields={secondaryAudienceFields} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {fields[0].category === "textarea" ? (
        <div className="w-full">
          <StepComponent fields={fields} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 md:gap-4 w-full">
          <StepComponent fields={fields} />
        </div>
      )}
    </>
  );
};

const DateInput = ({ field }: { field: Field }) => {
  const { setValue, watch } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;

  // Watch for date field value
  const selectedDate = watch(fieldName);

  return (
    <div className="w-full">
      <DatePicker
        selected={
          typeof selectedDate === "string"
            ? new Date(selectedDate)
            : selectedDate instanceof Date
              ? selectedDate
              : null
        }
        onChange={(date: Date | null) => {
          setValue(fieldName, date ? format(date, "yyyy-MM-dd") : "", {
            shouldValidate: true,
          });
        }}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className="w-full p-3 border rounded-lg transition-all duration-200"
      />
    </div>
  );
};
