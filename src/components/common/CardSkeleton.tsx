import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  className?: string;
}

export default function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md w-full max-w-md mx-auto overflow-hidden",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-gray-300 rounded-md" />

      {/* Content */}
      <div className="mt-2 p-2 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
          <div className="h-4 w-14 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
