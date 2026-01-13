import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";
import Loader from "./Loader";
import React, { useEffect, useState } from "react";
import CreatorCards from "./CreatorCards";

export default function ActiveCollaborationTab() {
    const router = useRouter();
    const {
        data: campaigns,
        isLoading,
        isError,
    } = useFindAiCampaignsList("Active");
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">Something went wrong while fetching data</p>
            </div>
        );
    }

    const handleCampaignSelect = (campaignId: string) => {
        setSelectedCampaignId(campaignId);
        // Pass a query parameter to indicate this is an active collaboration
        router.push(`/dashboard/brand/application-inbox/${campaignId}?tab=active`);
    };

    return (
        <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">
            {/* Info Banner */}
            <div className="sticky top-0 z-10 mb-6 rounded-lg border border-gray-300 bg-white/80 dark:bg-background/80 backdrop-blur px-4 py-4 shadow-sm">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    This section shows your active campaigns that are currently in progress.
                    Review the deliverables submitted by creators and request revisions if needed.
                </p>
            </div>

            {/* Campaign Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {campaigns?.campaigns?.map((campaign: any) => (
                    <div
                        key={campaign.campaignId}
                        className="group relative flex flex-col border border-gray-400 rounded-xl bg-white dark:bg-card shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-200 overflow-hidden"
                    >
                        {/* Campaign Image */}
                        {campaign.campaignImage && (
                            <div className="relative w-full h-44 overflow-hidden">
                                <Image
                                    src={campaign.campaignImage}
                                    alt={campaign.campaignTitle}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-4">
                            <h3 className="text-base font-semibold mb-2 line-clamp-1">
                                {campaign.campaignTitle}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {campaign.campaignDescription}
                            </p>

                            {/* CTA */}
                            <button
                                onClick={() => handleCampaignSelect(campaign.campaignId)}
                                className="mt-auto w-full flex items-center justify-center gap-2 bg-primary text-white text-sm py-2.5 rounded-md hover:opacity-90 transition"
                            >
                                View Active Collaborations
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}