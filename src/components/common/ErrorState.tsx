"use client";

import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

const ErrorState = ({
  title = "Campaigns couldn’t load",
  description = "Looks like something interrupted the flow. Please try again.",
  onRetry,
  fullPage = false,
}: ErrorStateProps) => {
  return (
    <div
      className={`
        w-full
        ${fullPage ? "min-h-[60vh]" : "py-12"}
        flex items-center justify-center
        dark:bg-background
      `}
    >
      <div
        className="
          max-w-md w-full
          rounded-2xl
          border border-border
          bg-white dark:bg-background
          p-8
          text-center
          shadow-sm
        "
      >
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Action */}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="flex items-center gap-2 mx-auto px-6"
          >
            <RefreshCcw className="w-4 h-4" />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
