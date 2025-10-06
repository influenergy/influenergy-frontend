"use client";

import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext, Controller } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState, useMemo } from "react";

const SocialMediaInput = ({ field }: { field: Field }) => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const linkFieldName = `${fieldName}-link` as keyof CreatorQuestionnaireData;
  // const error = errors[fieldName];
  const linkError = errors[linkFieldName];
  const selectedPlatform = watch(fieldName);

  // ✅ Reactive dark theme detection
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

  // ✅ react-select dark/light styles
  const customStyles = useMemo<StylesConfig<{ label: string; value: string }, false>>(
    () => ({
     
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
    }),
    [isDark]
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        {/* Platform Selector */}
        <div className={`${selectedPlatform ? "w-2/6" : "w-full"}`}>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={field.options?.map((option) => ({
                  label: option,
                  value: option,
                }))}
                value={
                  value ? { label: value as string, value: value as string } : null
                }
                onChange={(selectedOption) => {
                  const selectedValue = selectedOption?.value ?? "";
                  onChange(selectedValue);
                  setValue(linkFieldName, ""); // reset link field on change
                }}
                placeholder="Select Platform"
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
              />
            )}
          />
        </div>

        {/* Link Input (shown only when a platform is selected) */}
        {selectedPlatform && (
          <div className="w-full">
            <Input
              type="text"
              placeholder={`Enter your ${selectedPlatform} profile link`}
              {...register(linkFieldName)}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 dark:text-gray-200 ${
                linkError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
            />
          </div>
        )}
      </div>

      {/* Error message */}
      {linkError && (
        <p className="text-red-500 text-sm mt-1">
          {linkError.message as string}
        </p>
      )}
    </div>
  );
};

export default SocialMediaInput;
