import { useFormContext } from "react-hook-form";
import { Field } from "@/constants/questions";
import type { BrandFormData } from "@/lib/BrandSchema";

interface StepProps {
  fields: Field[];
}

export const Step1 = ({ fields }: StepProps) => {
  const {
    register,
    formState: { errors },
    trigger
  } = useFormContext<BrandFormData>();

  return (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-6">
      {fields.map((field) => (
        <div key={field.title} className="space-y-2 mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.title}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type={field.category}
            {...register(field.slug as keyof BrandFormData, {
              onBlur: () => trigger(field.slug as keyof BrandFormData)
            })}
            className={`w-full p-3 border rounded-lg transition-all duration-200
              ${errors[field.slug as keyof BrandFormData]
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
              } 
              focus:outline-none focus:ring-2 focus:border-transparent
              disabled:bg-gray-50 disabled:text-gray-500
              placeholder:text-gray-400`}
            placeholder={`Enter ${field.title.toLowerCase()}`}
          />
          {errors[field.slug as keyof BrandFormData] && (
            <p className="text-red-500 text-sm mt-1 animate-fadeIn">
              {errors[field.slug as keyof BrandFormData]?.message}
            </p>
          )}
          {field.slug === "companyWebsite" && (
            <p className="text-xs text-gray-500 mt-1">
              Please include http:// or https:// in your URL
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
