import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import { ChevronDown, Upload } from "lucide-react";
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
import { PLATFORM_DELIVERABLES } from "@/constants/CreateCampaign";

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

    const isExplicitlyRequired =
      fieldDescription.tests.some((test) => test.name === "required") ||
      fieldDescription.nullable == false;

    const isDateRequired =
      fieldDescription.type === "date" &&
      !fieldDescription.tests.some((test) => test.name === "nullable");

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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contentType = watch("content-type");

  React.useEffect(() => {
    if (
      fieldName === "video-duration" &&
      contentType === "Long form videos" &&
      watch(fieldName) === "Less than 1 minute"
    ) {
      setValue(fieldName, "", { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    }
  }, [contentType]);

  if (fieldName === "target-interests" || fieldName === "target-gender") {
    return <PrimaryNicheInput field={field} />;
  }

  // SPECIAL HANDLING FOR SOCIAL PLATFORMS - Single select only
  if (fieldName === "social-platforms" || field.slug === "socialPlatforms") {
    const selectedPlatform = watch(fieldName);

    return (
      <div className="relative w-full">
        <Select
          options={field.options?.map((option) => ({
            label: option,
            value: option,
          }))}
          value={
            selectedPlatform && typeof selectedPlatform === "string"
              ? { label: selectedPlatform, value: selectedPlatform }
              : null
          }
          onChange={(selected) => {
            setValue(fieldName, selected?.value || "", { shouldValidate: true });
            // Clear deliverables when platform changes
            setValue("expectedDeliverables" as keyof PostQuestionnaireData, [], {
              shouldValidate: true,
            });
          }}
          placeholder={field.placeholder || "Select a social platform"}
          classNamePrefix="react-select"
          className="dark:bg-gray-900 dark:text-gray-100"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
              border: "none",
              boxShadow: "none",
              "&:hover": {
                border: "none",
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#7544DB" : "#F3F3F5",
              color: state.isFocused ? "#FFFFFF" : "#000000",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#7544DB",
                color: "#FFFFFF",
              },
            }),
          }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown size={20} />
        </div>
      </div>
    );
  }

  // SPECIAL HANDLING FOR DELIVERABLES - Dynamic options based on social platform
  // DELIVERABLES — single select, overwrite previous value
  if (
    fieldName === "expected-deliverables" ||
    field.slug === "expectedDeliverables"
  ) {
    const socialPlatform = watch("socialPlatforms" as keyof PostQuestionnaireData);
    const selectedValue = watch(fieldName);

    const dynamicOptions = React.useMemo(() => {
      if (!socialPlatform || typeof socialPlatform !== "string") return [];
      return (PLATFORM_DELIVERABLES[socialPlatform] || []).map((d) => ({
        label: d,
        value: d,
      }));
    }, [socialPlatform]);

    return (
      <Select
        options={dynamicOptions}
        value={
          typeof selectedValue === "string"
            ? { label: selectedValue, value: selectedValue }
            : null
        }
        onChange={(selected) => {
          // 🔥 overwrite previous value
          setValue(fieldName, selected?.value || "", {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        placeholder={
          dynamicOptions.length === 0
            ? "Select social platform first"
            : "Select a deliverable"
        }
        isDisabled={dynamicOptions.length === 0}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#F3F3F5",
            border: "none",
            boxShadow: "none",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#F3F3F5",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#7544DB" : "#F3F3F5",
            color: state.isFocused ? "#FFFFFF" : "#000000",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#7544DB",
              color: "#FFFFFF",
            },
          }),
        }}
      />
    );
  }


  // DROPDOWN with placeholder
  if (field.category === "dropdown") {
    return (
      <div className="relative w-full">
        <Select
          options={field.options?.map((option) => ({
            label: option,
            value: option,
            isDisabled:
              fieldName === "video-duration" &&
              contentType === "Long form videos" &&
              option === "Less than 1 minute",
          }))}
          placeholder={field.placeholder || "Select an option"}
          onChange={(selected) =>
            setValue(fieldName, selected?.value, { shouldValidate: true })
          }
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
              border: "none",
              boxShadow: "none",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#7544DB" : "#F3F3F5",
              color: state.isFocused ? "#FFFFFF" : "#000000",
              "&:hover": {
                backgroundColor: "#7544DB",
                color: "#FFFFFF",
              },
            }),
          }}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronDown size={20} />
        </div>
      </div>
    );
  }

  // MULTISELECT with placeholder
  if (field.category === "multiselect") {
    const selectedOptions = watch(fieldName) || [];
    const hasOthers = selectedOptions.includes("Others");

    return (
      <div className="space-y-3">
        {/* Existing multiselect */}
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
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
              border: "none",
              boxShadow: "none",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#F3F3F5",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#7544DB" : "#F3F3F5",
              color: state.isFocused ? "#FFFFFF" : "#000000",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#7544DB",
                color: "#FFFFFF",
              },
            }),
          }}
          placeholder={field.placeholder || "Select options..."}
          classNamePrefix="react-select"
        />

        {/* 👇 Show input ONLY if Others is selected */}
        {hasOthers && (
          <input
            type="text"
            placeholder="Enter your niche"
            onChange={(e) =>
              setValue("customNiche" as any, e.target.value, {
                shouldDirty: true,
              })
            }
            className="w-full p-3 rounded-lg bg-red-700 focus:ring-primary focus:outline-none"
          />
        )}
      </div>
    );
  }

  // GROUPED DROPDOWN with placeholder
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
          <option value="" className="dark:text-gray-900">
            {field.placeholder || "Select an option"}
          </option>
          {(() => {
            const currentValue = watch(fieldName) as unknown as string | undefined;
            const allOptions = (field.groups || []).flatMap((g) => g.options);
            const hasCurrent = currentValue && allOptions.includes(currentValue);
            return !hasCurrent && currentValue ? (
              <option value={currentValue}>{currentValue}</option>
            ) : null;
          })()}
          {field.groups?.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option: string) => (
                <option key={option} value={option}>
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

  // DATE with placeholder
  if (field.category === "date") {
    return <DateInput field={field} />;
  }

  // TEXTAREA with placeholder
  if (field.category === "textarea") {
    return (
      <div>
        <textarea
          {...register(fieldName)}
          placeholder={field.placeholder || "Enter text..."}
          cols={3}
          rows={3}
          className="w-full p-3 rounded-lg transition-all duration-200 bg-[#F3F3F5] focus:ring-primary text-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
        ></textarea>
      </div>
    );
  }

  // FILE input
  if (field.category === "file") {
    if (fieldName === "campaign-post" || field.slug === "campaignImage") {
      const value = watch(fieldName);
      const isImage = typeof value === "string" && value.startsWith("data:image");
      const isUploadedImage = typeof value === "string" && value.startsWith("https://");

      return (
        <div className="flex flex-col gap-2">
          {isImage || isUploadedImage ? (
            <div
              className="w-full max-w-xs cursor-pointer border rounded-lg overflow-hidden dark:border-gray-700"
              onClick={() => inputRef.current?.click()}
              title="Click to upload a new image"
              style={{ maxHeight: 200 }}
            >
              <img
                src={value}
                alt="Campaign Post Preview"
                className="object-contain w-full h-48 bg-gray-100 dark:bg-gray-800"
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              className="w-full h-56 flex flex-col items-center justify-center gap-2
             border-2 border-dashed border-gray-300 dark:border-gray-700
             rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800
             hover:border-primary transition-all"
              onClick={() => inputRef.current?.click()}
              title="Click to upload campaign image"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Click to upload campaign image
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
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

    return (
      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          // 🔒 HARD VALIDATION
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

          if (!allowedTypes.includes(file.type)) {
            alert("Only JPG, JPEG, and PNG images are allowed");
            e.target.value = ""; // reset input
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              setValue(fieldName, reader.result, { shouldValidate: true });
            }
          };
        }}
        className={`w-full p-3 border rounded-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-100 ${error
          ? "border-red-500 focus:ring-red-500 dark:border-red-500"
          : "border-gray-300 focus:ring-primary dark:border-gray-700"
          } focus:outline-none focus:ring-2`}
      />
    );

  }

  // RANGE slider
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
      </div>
    );
  }

  // BUDGET INPUT - Number with $ prefix (stores as "$300")
  if (field.category === "number-with-prefix" && field.prefix) {
    const value = watch(fieldName) || "";
    // Remove prefix if it exists to show clean number in input
    const displayValue = typeof value === 'string' ? value.replace(/^\$/, '') : value;

    return (
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
          {field.prefix}
        </span>
        <input
          type="number"
          value={displayValue}
          onChange={(e) => {
            const numValue = e.target.value;
            // Store with $ prefix
            const formattedValue = numValue ? `$${numValue}` : '';
            setValue(fieldName, formattedValue, { shouldValidate: true });
          }}
          placeholder={field.placeholder || "0"}
          className={`w-full p-3 pl-8 rounded-lg transition-all duration-200 bg-[#F3F3F5] dark:bg-gray-900 dark:text-gray-100 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"
            } focus:outline-none focus:ring-2`}
          min="0"
          step="1"
        />
      </div>
    );
  }

  // DEADLINE INPUT - Number with "days" suffix (stores as "4 days")
  if (field.category === "number-with-suffix" && field.suffix) {
    const value = watch(fieldName) || "";
    const displayValue =
      typeof value === "string"
        ? value.replace(/\s*days?$/i, "")
        : value;

    return (
      <div className="relative w-full">
        <input
          type="number"
          value={displayValue}
          step="1"
          onChange={(e) => {
            setValue(fieldName, e.target.value, { shouldValidate: true });
          }}
          onBlur={(e) => {
            let numValue = Number(e.target.value);
            if (!numValue || numValue < 4) numValue = 4;

            const formattedValue = `${numValue} ${numValue === 1 ? "day" : "days"}`;
            setValue(fieldName, formattedValue, { shouldValidate: true });
          }}
          placeholder={field.placeholder || "5"}
          className={`w-full p-3 pr-16 rounded-lg transition-all duration-200 bg-[#F3F3F5] dark:bg-gray-900 dark:text-gray-100 ${error
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-primary"
            } focus:outline-none focus:ring-2`}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
          {field.suffix}
        </span>
      </div>
    );
  }

  // DEFAULT TEXT/NUMBER INPUT with placeholder
  return (
    <input
      type={field.category}
      {...register(fieldName)}
      placeholder={field.placeholder || `Enter ${field.title.toLowerCase()}...`}
      className={`w-full p-3 rounded-lg transition-all duration-200 bg-[#F3F3F5] dark:bg-gray-900 dark:text-gray-100 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"
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
            <label className="block text-sm font-medium text-black dark:text-gray-200">
              {field.title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <FormField field={field} mode={mode} />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
            )}
          </div>
        );
      })}
    </>
  );
};

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

export const Step = ({ fields, mode }: StepProps) => {
  const rows: Field[][] = [];
  let currentRowIndex = 0;
  let currentRow: Field[] = [];

  fields.forEach((field) => {
    const isRow0or2 = currentRowIndex === 0 || currentRowIndex === 2;

    // Special handling for row 2 (Niche, Budget, Deadline) - 3 columns
    const maxFieldsInRow = currentRowIndex === 2 ? 3 : (isRow0or2 ? 2 : 1);

    currentRow.push(field);

    if (currentRow.length === maxFieldsInRow) {
      rows.push([...currentRow]);
      currentRow = [];
      currentRowIndex++;
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <div className="space-y-4">
      {rows.map((rowFields, rowIndex) => {
        const isRow0or2 = rowIndex === 0 || rowIndex === 2;
        const isRow2 = rowIndex === 2; // Niche, Budget, Deadline row

        return (
          <div
            key={rowIndex}
            className={`grid gap-4 ${isRow2
              ? 'grid-cols-1 md:grid-cols-3'
              : isRow0or2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'
              }`}
          >
            {rowFields.map((field) => {
              const fieldName = field.slug as keyof PostQuestionnaireData;
              const {
                formState: { errors },
              } = useFormContext<PostQuestionnaireData>();
              const error = errors[fieldName];
              const required = isFieldRequired(field.slug);

              return (
                <div key={field.title} className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-black dark:text-gray-200">
                    <span>
                      {field.title}
                      {required && <span className="text-red-500 ml-1">*</span>}
                    </span>

                    {field.info && (
                      <div className="relative group">
                        {/* Info Icon */}
                        <div
                          className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-500
                     bg-white dark:bg-gray-800
                     text-gray-600 dark:text-gray-400 
                     text-xs flex items-center justify-center 
                     cursor-help leading-none
                     hover:border-gray-600 dark:hover:border-gray-300
                     hover:bg-gray-50 dark:hover:bg-gray-700
                     transition-colors duration-200"
                        >
                          i
                        </div>

                        {/* Tooltip */}
                        <div
                          className="absolute left-full top-1/2 ml-2 -translate-y-1/2
                     invisible group-hover:visible opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     bg-primary dark:bg-primary/90 text-white text-xs
                     px-3 py-2 rounded-md
                     shadow-lg border border-primary
                     z-50 pointer-events-none
                     w-64 leading-relaxed"
                        >
                          {/* Arrow */}
                          <div
                            className="absolute right-full top-1/2 -translate-y-1/2
                       border-4 border-transparent border-r-primary dark:border-r-primary/90"
                          />
                          {field.info}
                        </div>
                      </div>
                    )}
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
          </div>
        );
      })}
    </div>
  );
};