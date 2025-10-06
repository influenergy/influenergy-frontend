"use client";
import { useEffect, useState } from "react"
import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
// import { ChevronDown } from "lucide-react";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";


const GenderInput = ({ field }: { field: Field }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;

  const otherGenderFieldName = `${fieldName}-other` as keyof CreatorQuestionnaireData;
  const otherGenderError = errors[otherGenderFieldName];

  const selectedGender = (watch(fieldName) as string) || "";


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


  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-full">
          {/* <Controller
            name={fieldName}
            control={control}
            rules={{ required: "Please select a gender" }}
            render={({ field: { value, onChange } }) => ( */}
          <CreatableSelect<{ label: string; value: string }, false>
            options={field.options?.map((option) => ({
              label: option,
              value: option,
            }))}
            value={selectedGender ? { label: selectedGender, value: selectedGender } : null
            }
            onChange={(option) => {
              const value = option?.value ?? "";
              setValue(fieldName, value, { shouldValidate: true });
            }}
            placeholder="Select Gender"
            // components={{
            //   DropdownIndicator: () => (
            //     <ChevronDown size={20} className="text-gray-500 mr-2" />
            //   ),
            //   IndicatorSeparator: () => null,
            // }}
            isClearable
            styles={customStyles as unknown as StylesConfig<{ label: string; value: string }, false>}
            classNamePrefix="react-select"
          />
          {/* )} */}
          {/* /> */}
        </div>

        {/* Show "Other" input if selected */}
        {selectedGender === "Others" && (
          <div className="w-full">
            <Input
              type="text"
              placeholder="Please specify your gender"
              {...control.register(otherGenderFieldName, {
                validate: (value) =>
                  selectedGender === "Others" && !value
                    ? "This field is required"
                    : true,
              })}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 ${otherGenderError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
                }`}
            />
          </div>
        )}
      </div>

      {otherGenderError && selectedGender === "Others" && (
        <p className="text-red-500 text-sm mt-1">
          {otherGenderError.message as string}
        </p>
      )}
    </div>
  );
};

export default GenderInput;
