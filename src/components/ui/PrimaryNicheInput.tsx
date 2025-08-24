import { Input } from "./input";
import { Field } from "@/constants/questions";
import { useFormContext } from "react-hook-form";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";
import Select from "react-select";
import * as React from "react";

const PrimaryNicheInput = ({ field }: { field: Field }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  // const error = errors[fieldName];

  const otherNicheFieldName =
    `${fieldName}-other` as keyof CreatorQuestionnaireData;
  const otherNicheError = errors[otherNicheFieldName];

  // Use state to ensure reactive updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedOptions = watch(fieldName) || [];
  const otherNicheValue = (watch(otherNicheFieldName) as string) || "";

  // Track if "Others" is selected - use state instead of memo for better reactivity
  const [hasOthersOption, setHasOthersOption] = React.useState(
    Array.isArray(selectedOptions) && selectedOptions.includes("Others")
  );

  // Update hasOthersOption when selectedOptions changes
  React.useEffect(() => {
    const includesOthers =
      Array.isArray(selectedOptions) && selectedOptions.includes("Others");
    setHasOthersOption(includesOthers);
  }, [selectedOptions]);

  // Debounce timeout ref
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Memoize options to prevent unnecessary re-renders
  const selectOptions = React.useMemo(
    () =>
      field.options?.map((option) => ({
        label: option,
        value: option,
      })) || [],
    [field.options]
  );

  // Create selected values for the Select component
  const selectedValues = React.useMemo(() => {
    if (!Array.isArray(selectedOptions)) return [];

    return (
      selectedOptions
        // Filter custom values (values not in the predefined options and not "Others")
        .filter((opt) => field.options?.includes(opt) || opt === "Others")
        .map((value) => ({
          label: value,
          value: value,
        }))
    );
  }, [selectedOptions, field.options]);

  // Handle select change
  const handleSelectChange = React.useCallback(
    (selected: { value: string; label: string }[]) => {
      const values = selected.map((opt) => opt.value);

      // Check if "Others" was just added or removed
      const hadOthers =
        Array.isArray(selectedOptions) && selectedOptions.includes("Others");
      const hasOthers = values.includes("Others");

      // Keep custom values if "Others" remains selected
      const customValues = Array.isArray(selectedOptions)
        ? selectedOptions.filter(
            (opt) => !field.options?.includes(opt) && opt !== "Others"
          )
        : [];

      let newValues = values;

      // If "Others" is still or newly selected and we have custom values, include them
      if (hasOthers && customValues.length > 0 && otherNicheValue) {
        newValues = [...values, ...customValues];
      }

      // Update the form values
      setValue(fieldName, newValues, { shouldValidate: true });

      // If "Others" was removed, clear the other field
      if (hadOthers && !hasOthers) {
        setValue(otherNicheFieldName, "", { shouldValidate: true });
      }
    },
    [
      fieldName,
      otherNicheFieldName,
      setValue,
      selectedOptions,
      field.options,
      otherNicheValue,
    ]
  );

  // Handle "Others" input change
  const handleOtherNicheChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(otherNicheFieldName, value, { shouldValidate: false });

      // Clear any existing timeout
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Update the primary niche after a short delay
      debounceTimerRef.current = setTimeout(() => {
        // Get current values excluding any previous custom values
        const baseValues = Array.isArray(selectedOptions)
          ? selectedOptions.filter(
              (opt) => field.options?.includes(opt) || opt === "Others"
            )
          : [];

        if (value) {
          // If there's a value, make sure "Others" is included and add the custom value
          const newValues = baseValues.includes("Others")
            ? [...baseValues, value]
            : [...baseValues, "Others", value];

          setValue(fieldName, newValues, { shouldValidate: true });
        } else {
          // If no value, just keep the base values
          setValue(fieldName, baseValues, { shouldValidate: true });
        }

        // Validate the other field
        setValue(otherNicheFieldName, value, { shouldValidate: true });
      }, 300);
    },
    [otherNicheFieldName, setValue, selectedOptions, fieldName, field.options]
  );

  // Clean up the timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="space-y-2">
        <Select
          isMulti
          options={selectOptions}
          value={selectedValues}
          onChange={(selected) =>
            handleSelectChange(selected as { value: string; label: string }[])
          }
          classNamePrefix="react-select"
          className="dark:text-black"
        />

        {hasOthersOption && (
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Please specify your niche"
              value={otherNicheValue}
              onChange={handleOtherNicheChange}
              className={`w-full p-3 h-12 border rounded-lg transition-all font-poppins duration-300 dark:text-black ${
                otherNicheError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
            />
          </div>
        )}
      </div>

      {otherNicheError && (
        <p className="text-red-500 text-sm mt-1">
          {otherNicheError.message as string}
        </p>
      )}
    </div>
  );
};

export default PrimaryNicheInput;
