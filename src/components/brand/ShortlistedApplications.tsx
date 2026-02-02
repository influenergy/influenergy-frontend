import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "./Loader";
import React, { useState } from "react";


export default function ShortlistedApplications() {
    const router = useRouter();
    const {
        data: campaigns,
        isLoading,
        isError,
    } = useFindAiCampaignsList("Interested");
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
    const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({});



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
        router.push(`/dashboard/brand/application-inbox/${campaignId}`);
    };

    // Filter to get only the selected campaign
    const selectedCampaign = campaigns?.campaigns?.find(
        (campaign: any) => campaign.campaignId === selectedCampaignId
    );


    // Get collaborations from the selected campaign
    const collaborationsToShow = campaigns?.collaborations || [];
    // console.log(campaigns);
    // console.log(campaigns.campaigns[0].collaborations);


    return (
        <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">
            <div className="sticky top-0 z-10 mb-6 rounded-lg border border-gray-300 bg-white/80 dark:bg-background/80 backdrop-blur px-4 py-4 shadow-sm">
                <p className="text-sm text-muted-foreground">
                    This section shows campaigns where creators have applied and you’ve marked them as <span className="font-medium text-foreground">Interested</span>.
                    You can review their applications and send collaboration offers from here.
                </p>
            </div>


            {campaigns?.campaigns?.length > 0 ? (
                /* Campaign Cards Section */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {campaigns.campaigns.map((campaign: any) => (
                        <div
                            key={campaign.campaignId}
                            className="border rounded-lg p-4 bg-white dark:bg-card shadow-sm hover:shadow-md transition"
                        >
                            {/* Campaign Image */}
                            {campaign.campaignImage && (
                                <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                                    <Image
                                        src={campaign.campaignImage}
                                        alt={campaign.campaignTitle}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Campaign Info */}
                            <h3 className="text-base font-semibold mb-3">
                                {campaign.campaignTitle}
                            </h3>

                            <p
                                className={`text-sm text-muted-foreground mb-2 ${expandedDesc[campaign.campaignId] ? "" : "line-clamp-2"
                                    }`}
                            >
                                {campaign.campaignDescription}
                            </p>

                            {campaign.campaignDescription?.length > 120 && (
                                <button
                                    onClick={() =>
                                        setExpandedDesc((prev) => ({
                                            ...prev,
                                            [campaign.campaignId]: !prev[campaign.campaignId],
                                        }))
                                    }
                                    className="text-xs text-primary font-medium hover:underline mb-3"
                                >
                                    {expandedDesc[campaign.campaignId] ? "View less" : "Read more"}
                                </button>
                            )}


                            {/* View Applications Button */}
                            <button
                                onClick={() => handleCampaignSelect(campaign.campaignId)}
                                className="w-full bg-primary text-white text-sm py-2 rounded-md hover:opacity-90 transition"
                            >
                                View Applications
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center p-10 text-center">
                    <Image
                        src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                        alt="No campaigns"
                        width={280}
                        height={280}
                        className="mx-auto"
                        priority
                    />
                    <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 mt-4 dark:text-gray-200">
                        Welcome to the inbox.
                        <br />
                        No interested campaigns found.
                    </h3>
                </div>
            )}
        </div>
    );
}