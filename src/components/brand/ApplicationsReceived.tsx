import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import CampaignCard from "./CampaignCard";
import Loader from "./Loader";
import React, { useEffect, useState } from "react";
import CreatorCards from "./CreatorCards";


export default function ApplicationsReceived() {
    const router = useRouter();
    const {
        data: campaigns,
        isLoading,
        isError,
    } = useFindAiCampaignsList("Pending");
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

    const handleCampaignSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignId(e.target.value);
    };

    // Filter to get only the selected campaign
    const selectedCampaign = campaigns?.campaigns?.find(
        (campaign: any) => campaign.campaignId === selectedCampaignId
    );

    // Get collaborations from the selected campaign
    const collaborationsToShow = selectedCampaign?.collaborations || [];
    
    return (
        <div className="h-full w-full px-2 sm:px-4 flex-1 dark:bg-background">

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                    Select Campaign
                </label>

                <select
                    value={selectedCampaignId}
                    onChange={handleCampaignSelect}
                    className="w-full max-w-md px-4 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">-- Select a campaign --</option>

                    {campaigns?.campaigns?.map((campaign: any) => (
                        <option key={campaign.campaignId} value={campaign.campaignId}>
                            {campaign.campaignTitle}
                        </option>
                    ))}
                </select>
            </div>

            {!selectedCampaignId ? (
                <>
                    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center">
                        <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                            <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
                                Select a campaign to view creators who applied for campaign
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Choose a campaign from the dropdown above to see all the creators who have been applied for that campaign.
                            </p>
                        </div>
                    </div>
                </>
            ) : collaborationsToShow.length > 0 ? (
                <>
                    {/* Campaign Info Header */}
                    

                    {/* Creator Cards */}
                    <CreatorCards 
                        collaborations={collaborationsToShow}
                    />
                </>
            ) : (
                <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center">
                    <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                        <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
                            No shortlisted creators yet
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            This campaign doesn't have any shortlisted creators at the moment. Check back later or review pending applications.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}