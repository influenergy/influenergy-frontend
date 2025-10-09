import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select, { StylesConfig } from "react-select";
import SocialMediaInput from "../ui/SocialMediaInput";
import GenderInput from "../ui/GenderInput";
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
import React, { useEffect, useState } from "react";
import { userApi } from "@/services/userServices";
import CreatableSelect from 'react-select/creatable';

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

interface PriceRangeResponse {
  data?: {
    range?: {
      min?: number;
      max?: number;
    }
  }
}

const FormField = ({ field }: { field: Field }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  // State for price range suggestion
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [loadingRange, setLoadingRange] = useState(false);
  const [rangeError, setRangeError] = useState<string | null>(null);
    // ✅ Reactive dark mode detection
    const [isDark, setIsDark] = useState(
      typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark")
    );
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
  
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
  
      return () => observer.disconnect();
    }, []);
    
    const customStyles: StylesConfig<{ label: string; value: string }, boolean> = {
  
      singleValue: (provided) => ({
        ...provided,
        color: isDark ? "#f9fafb" : "black", // ✅ bright text in dark mode
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
          ? isDark ? "#4b5563" : "#FFFFFF"
          : isDark ? "#4b5563" : "#FFFFFF",
        color: isDark ? "#f9fafb" : "black",
        "&:active": { backgroundColor: isDark ? "#4b5563" : "#FFFFFF" },
      }),
    };
  

  useEffect(() => {
    if (fieldName === "budget-video") {
      const primaryFollowers = watch("primary-followers");
      const secondaryFollowers = watch("secondary-followers");
      if (!primaryFollowers) return; // Don't fetch if primaryFollowers is not set
      setLoadingRange(true);
      setRangeError(null);
      userApi.getRecommendedPriceRange({
        primaryFollowers,
        secondaryFollowers,
      })
        .then((res: PriceRangeResponse) => {
          if (res?.data?.range?.min != null && res?.data?.range?.max != null) {
            setPriceRange(`$${res.data.range.min} - $${res.data.range.max}`);
            // } else if (res?.data?.range) {
            //   setPriceRange(res.data.range);
          } else {
            setPriceRange(null);
          }
        })
        .catch(() => {
          setRangeError("Could not fetch recommended price range");
        })
        .finally(() => setLoadingRange(false));
    }
  }, [fieldName, watch]);

  // console.log(priceRange, "Price Range");
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
    const selectedValue = (watch(fieldName) as string) || "";
    return (
      <div>
        <CreatableSelect<{ label: string; value: string }, false>
          isClearable
          options={field.options?.map((option) => ({
            label: option,
            value: option,
          }))}
          value={selectedValue ? { label: selectedValue, value: selectedValue } : null}
          onChange={(option) => {
            const value = option?.value ?? "";
            setValue(fieldName, value, { shouldValidate: true });
          }}
          styles={customStyles as unknown as StylesConfig<{ label: string; value: string }, false>}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          // menuPosition="fixed"

        />
      </div>)
  
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
          styles={customStyles}
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
          className="w-full p-3 border rounded-lg transition-all duration-200 border-gray-300 dark:border-gray-700 focus:ring-primary text-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
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
        {/* Price range suggestion for budget-video */}
        {fieldName === "budget-video" && (
          <div className="mt-2 text-xs text-gray-600">
            {loadingRange && <span>Fetching recommended price range...</span>}
            {rangeError && <span className="text-red-500">{rangeError}</span>}
            {!loadingRange && !rangeError && priceRange && (
              <span>AI Suggested Price Range: <b>{priceRange}</b></span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      type={field.category}
      placeholder={field.placeholder}
      {...register(fieldName)}
      className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 ${error
        ? "border-red-500 focus:ring-red-500 dark:border-red-500"
        : "border-gray-300 focus:ring-primary dark:border-gray-700"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">What’s your primary audience demography? *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-2 md:gap-4">
              <StepComponent fields={primaryAudienceFields} />
            </div>
          </div>
        )}
        {secondaryAudienceFields.length > 0 && (
          <div className="p-2 sm:p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">What’s your secondary audience demography? </label>
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

        popperClassName="z-50"
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className="w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"

        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-200 rounded-t-lg">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {"<"}
            </button>
            <div className="flex items-center gap-4">
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="rounded border border-gray-400 p-1 text-sm bg-white dark:bg-gray-200 "
              >
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                className="rounded border p-1 text-sm border-gray-400 bg-white dark:bg-gray-200"
              >
                {[
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ].map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
};
