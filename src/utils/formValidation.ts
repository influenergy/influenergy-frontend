import * as yup from "yup";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "@/lib/PostSchema";

/**
 * Determines if a field is required based on its validation schema
 *
 * @param fieldName - The slug/name of the field to check
 * @returns Whether the field is required according to validation rules
 */
export const isFieldRequired = (fieldName: string): boolean => {
  try {
    // Combine all schema fields to check across all steps
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

    // Check if explicitly required
    const isExplicitlyRequired =
      fieldDescription.tests.some((test) => test.name === "required") ||
      fieldDescription.nullable === false;

    // Handle date fields separately (if not nullable)
    const isDateRequired =
      fieldDescription.type === "date" &&
      !fieldDescription.tests.some((test) => test.name === "nullable");

    // Handle array fields: required if min(1) is present
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
