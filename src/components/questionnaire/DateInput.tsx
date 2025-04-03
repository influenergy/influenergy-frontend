import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext } from "react-hook-form";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { Field } from "@/constants/questions";

export const DateInput = ({ field }: { field: Field }) => {
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
          className={`w-full p-3 border rounded-lg transition-all duration-200 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary"
          } focus:outline-none focus:ring-2`}
          placeholderText="Select date"
        />
      </div>
    );
  };