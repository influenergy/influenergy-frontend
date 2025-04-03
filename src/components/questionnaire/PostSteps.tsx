import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { PostQuestionnaireData } from "@/types/Questionnaire";
import { FieldErrors } from "./fields/FieldError";
import { isFieldRequired } from "@/utils/formValidation";
import { FormFieldRenderer } from "./fields/FormFieldRenderer";


interface StepProps {
  fields: Field[];
}

/**
 * Renders a form field with label and error handling
 */
export const FormField = ({ field }: { field: Field }) => {
  const {
    formState: { errors },
  } = useFormContext<PostQuestionnaireData>();

  const fieldName = field.slug as keyof PostQuestionnaireData;
  const error = errors[fieldName];
  const required = isFieldRequired(field.slug);

  return (
    <div key={field.title} className="space-y-2 mt-4">
      <label className="block text-sm font-light text-black">
        {field.title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <FormFieldRenderer field={field} />
      <FieldErrors error={error} />
    </div>
  );
};

/**
 * Renders a group of form fields
 */
export const StepComponent = ({ fields }: StepProps) => {
  return (
    <>
      {fields.map((field) => (
        <FormField key={field.slug} field={field} />
      ))}
    </>
  );
};

/**
 * Step component that organizes fields in a responsive grid layout
 */
export const Step = ({ fields }: StepProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4">
    <StepComponent fields={fields} />
  </div>
);
