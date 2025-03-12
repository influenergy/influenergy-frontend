import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import * as React from "react";

// Custom hook for debouncing values
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const PrimaryNicheInput = ({ field }: { field: Field }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  const otherNicheFieldName =
    `${fieldName}-other` as keyof CreatorQuestionnaireData;
  const otherNicheError = errors[otherNicheFieldName];

  const selectedOptions = watch(fieldName) || [];
  const hasOthersOption =
    Array.isArray(selectedOptions) && selectedOptions.includes("Others");
  const otherNicheValue = watch(otherNicheFieldName) as string;

  // Debounce the other niche value to prevent excessive updates
  const debouncedOtherNiche = useDebounce(otherNicheValue, 300);

  // Memoize the options to prevent unnecessary re-renders
  const selectOptions = React.useMemo(
    () =>
      field.options?.map((option) => ({
        label: option,
        value: option,
      })) || [],
    [field.options]
  );

  // Memoize the selected values
  const selectedValues = React.useMemo(
    () =>
      (selectedOptions as string[]).map((value: string) => ({
        label: value,
        value,
      })),
    [selectedOptions]
  );

  // Handle select change with useCallback
  const handleSelectChange = React.useCallback(
    (selected: { value: string; label: string }[]) => {
      const values = selected.map((opt: { value: string }) => opt.value);
      setValue(fieldName, values, { shouldValidate: true });

      // If "Others" was removed, clear the other niche field
      if (!values.includes("Others")) {
        setValue(otherNicheFieldName, "", { shouldValidate: true });
      }
    },
    [fieldName, otherNicheFieldName, setValue]
  );

  // Effect to update the primary niche array when the custom value changes
  React.useEffect(() => {
    if (hasOthersOption && debouncedOtherNiche) {
      // Filter out any previous custom values that are not "Others"
      const baseOptions = selectedOptions.filter(
        (opt: string) => opt === "Others" || field.options?.includes(opt)
      );

      // Add the new custom value
      setValue(fieldName, [...baseOptions, debouncedOtherNiche], {
        shouldValidate: true,
      });
    }
  }, [
    debouncedOtherNiche,
    hasOthersOption,
    fieldName,
    selectedOptions,
    setValue,
    field.options,
  ]);

  return (
    <div>
      <div className="space-y-2">
        <Select
          isMulti
          options={selectOptions}
          value={selectedValues}
          onChange={(selected) => handleSelectChange(selected as { value: string; label: string }[])}
          classNamePrefix="react-select"
        />

        {hasOthersOption && (
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Please specify your niche"
              {...register(otherNicheFieldName, {
                validate: (value) =>
                  hasOthersOption && !value ? "This field is required" : true,
              })}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 ${
                otherNicheError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
      {otherNicheError && (
        <p className="text-red-500 text-sm mt-1">
          {otherNicheError.message as string}
        </p>
      )}
    </div>
  );
};

export default PrimaryNicheInput;
