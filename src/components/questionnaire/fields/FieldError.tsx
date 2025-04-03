import React from "react";
import { FieldError, Merge } from "react-hook-form";

interface FieldErrorProps {
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
}

/**
 * Displays form field error message if present
 */
export const FieldErrors: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;

  // Handle cases where error might be a nested structure (array-related errors)
  const errorMessage =
    (error as FieldError)?.message ||
    (Array.isArray(error) && error[0] && (error[0] as FieldError)?.message);

  return <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>;
};