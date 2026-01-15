export const CampaignManagerCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-5 dark:border-gray-700 flex flex-col animate-pulse bg-white dark:bg-background">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>

      {/* Profile / Campaign info */}
      <div className="flex gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Meta rows */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex justify-between gap-3">
        <div className="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  );
};
