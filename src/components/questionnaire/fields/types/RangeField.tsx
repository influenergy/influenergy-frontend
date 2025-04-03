import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { Slider } from "@/components/ui/slider";

interface RangeFieldProps {
  field: Field;
}

export const RangeField: React.FC<RangeFieldProps> = ({ field }) => {
  const { setValue, watch } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const value = watch(fieldName) || 0;
  const numericValue = Number(value);

  const MIN_VALUE = 1;
  const MAX_VALUE = 3000;

  const handleValueChange = ([newValue]: number[]) => {
    setValue(fieldName, newValue.toString(), { shouldValidate: true });
  };

  // Calculate percentage position for the tooltip
  const tooltipPosition =
    ((numericValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Min: ${MIN_VALUE}</span>
          <span className="text-sm text-gray-500">Max: ${MAX_VALUE}</span>
        </div>

        <Slider
          value={[numericValue]}
          onValueChange={handleValueChange}
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={1}
          className="w-full"
        />

        <div className="h-6 relative">
          <div
            className="absolute px-2 py-1 bg-primary text-white rounded-md text-xs transform -translate-x-1/2"
            style={{
              left: `${tooltipPosition}%`,
              top: "4px",
            }}
            aria-live="polite"
          >
            ${numericValue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
