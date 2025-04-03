import React from "react";
import { useFormContext } from "react-hook-form";
import Select, {  MultiValue } from "react-select";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";

interface MultiSelectFieldProps {
  field: Field;
}
export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  field,
}) => {
  const { setValue, watch } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const selectedOptions = watch(fieldName) || [];

  const options =
    field.options?.map((option) => ({
      label: option,
      value: option,
    })) || [];

  const selectedValues = (selectedOptions as string[]).map((value: string) => ({
    label: value,
    value,
  }));

  const handleChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    const values = newValue.map((opt) => opt.value);
    setValue(fieldName, values, { shouldValidate: true });
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={selectedValues}
        onChange={handleChange}
        classNamePrefix="react-select"
        placeholder="Select options..."
      />
    </div>
  );
};
