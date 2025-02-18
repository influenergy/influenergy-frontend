import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import { CreatorQuestionnaireData } from "@/types/Questionnaire";

interface StepProps {
  fields: Field[];
}

const FormField = ({ field }: { field: Field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatorQuestionnaireData>();

  const fieldName = field.slug as keyof CreatorQuestionnaireData;
  const error = errors[fieldName];

  if (field.category === "dropdown") {
    return (
      <select
        {...register(fieldName)}
        className={`w-full p-3 border rounded-lg transition-all duration-200 font-poppins ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#7877e6]"
        } focus:outline-none focus:ring-2 `}
      >
        <option value="" style={{ fontFamily: "Poppins, sans-serif" }}>
          Select {field.title}
        </option>
        {field.options?.map((option) => (
          <option key={option} value={option} style={{ fontFamily: "Poppins, sans-serif" }}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.category}
      {...register(fieldName)}
      className={`w-full p-3 border rounded-lg transition-all duration-200 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-[#7877e6]"
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

        return (
          <div key={field.title} className="space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.title}
              <span className="text-red-500 ml-1">*</span>
            </label>
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

export const Step1 = ({ fields }: StepProps) => (
  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2  items-start justify-center gap-4">
    <StepComponent fields={fields} />
  </div>
);

export const Step2 = ({ fields }: StepProps) => (
  <div className="space-y-4">
    <StepComponent fields={fields} />
  </div>
);

export const Step3 = ({ fields }: StepProps) => (
  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <StepComponent fields={fields} />
  </div>
);
