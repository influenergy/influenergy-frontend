"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface StatusModalProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function StatusModal({
  type,
  message,
  onClose
}: StatusModalProps) {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white dark:bg-background
          p-6
          shadow-xl
          animate-in fade-in zoom-in-95
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle className="h-14 w-14 text-green-500" />
          ) : (
            <XCircle className="h-14 w-14 text-red-500" />
          )}
        </div>

        {/* Title */}
        <h2
          className={`text-center text-xl font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Success!" : "Something went wrong"}
        </h2>

        {/* Message */}
        <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>

        {/* Action */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className={`
              w-full rounded-xl py-2.5 text-sm font-medium
              transition-all duration-200
              ${
                isSuccess
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }
            `}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
