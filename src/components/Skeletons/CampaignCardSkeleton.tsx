const CampaignCardSkeleton = () => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg mb-4" />

        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>

        <div className="mt-4 flex gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
            <div className="h-8 w-20 bg-gray-100 rounded-md" />
        </div>
    </div>
);
