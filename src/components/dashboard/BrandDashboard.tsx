"use client";
import React, { useState, } from "react";
import Image from "next/image";
import { Contact, DollarSign, CircleCheckBig, Send, Clock4 } from "lucide-react";
import { postApi } from "@/services/postServices";
import BrandDashboardSkeleton from "../Skeletons/BrandDashboardSkeleton";
import { useRouter } from "next/navigation";
import CampaignCard from "../brand/CampaignCard";
import ExploreCreatorCard from "../brand/ExploreCreatorCard";
import { useQuery } from "@tanstack/react-query";
import total_campaigns from "../../../public/images/total_campaigns.svg"
import InviteCreatorModal from "../brand/InviteCreatorModal";

type CreatorBrief = {
    _id: string;
    fullName?: string;
    email?: string;
    profileIcon?: string;
    isAccountVerified?: boolean;
    profile?: {
        socialLinks?: {
            primary?: {
                platform?: string;
                link?: string;
                followers?: string;
            };
            secondary?: {
                platform?: string;
                link?: string;
                followers?: string;
            };
        },
        category?: [string],
        city: string
    };
};

type CampaignBrief = {
    campaignTitle?: string;
    campaignImage?: string;
    campaignDescription?: string;
    _id: string
};

// type CollaborationItem = {
//     _id: string;
//     creatorId?: CreatorBrief | string;
//     campaignId?: CampaignBrief | string;
//     status?: string;
//     amount?: number;
//     paymentStatus?: string;
//     createdAt?: string;
//     updatedAt?: string;
// };

type ActiveCampaignItem = {
    campaignDetails: CampaignBrief;
};

type BrandDashboardResponse = {
    campaignCount?: {
        totalCampaigns?: number;
        totalApplicants?: number;
        activeCampaigns?: number;
        totalSpending?: number;
        offerSent?: number;
        offerAccepted?: number;
        totalPendingPayment?: number;
        acceptanceRate?: number;
        pendingCampaignCount?: number;
    };
    favCreators: CreatorBrief[];
    recentCreators: CreatorBrief[];
};


// interface FavCreators {
//     _id: string,
//     profileIcon: string,
//     profile: {
//         _id: string,
//         fullName: string,
//         city: string,
//         category: string[],
//         socialLinks: {
//             primary: {
//                 platform: string,
//                 link: string,
//                 followers: string
//             },
//             secondary?: {
//                 platform: string,
//                 link: string,
//                 followers: string
//             },
//         }
//     }
// }

// CampaignCardSkeleton Component
const CampaignCardSkeleton = () => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-40 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
    );
};

function BrandDashboard({ fullName }: { fullName?: string }) {

    // const [regionAnalysis, setRegionAnalysis] = useState<Record<string, unknown> | null>(null);
    const [activeTab, setActiveTab] = useState<"ongoing" | "favorites" | "recent">("ongoing");

    // const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    // Separate states as requested
    // const [collaborationCount, setCollaborationCount] = useState({ ongoing: 0, pending: 0, completed: 0 });
    // const [favCreators, setFavCreators] = useState<FavCreators[]>([]);
    // const [recentCreators, setRecentCreators] = useState<FavCreators[]>([]);
    // const [completedCollabs, setCompletedCollabs] = useState<CollaborationItem[]>([]);
    // const [campaignCount, setCampaignCount] = useState({ totalCampaigns: 0, totalApplicants: 0, activeCampaigns: 0, totalSpending: 0, offerSent: 0, offerAccepted: 0, totalPendingPayment: 0, acceptanceRate: 0, pendingCampaignCount: 0, });

    // const [loading, setLoading] = useState(true);


    const [inviteModal, setInviteModal] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

    // const toggleExpand = (id: string) => {
    //     setExpanded((prev) => ({
    //         ...prev,
    //         [id]: !prev[id],
    //     }));
    // };

    const router = useRouter();

    const {
        data: dashboardData,
        isLoading: dashboardLoading,
    } = useQuery<BrandDashboardResponse>({
        queryKey: ["brand-dashboard"],
        queryFn: async () => {
            const [collabData, campaignData] = await Promise.all([
                postApi.getCollaborationHistory(),
                postApi.getCampaignHistory(),
            ]);

            return {
                campaignCount: campaignData?.campaign?.counts,
                favCreators: collabData?.collaborations?.favCreators ?? [],
                recentCreators: collabData?.collaborations?.recentCreators ?? [],
            };
        },
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: true,
    });    

    const {
        data: campaigns = [],
        isLoading,
        isError,
    } = useQuery<ActiveCampaignItem[]>({
        queryKey: ["campaigns", "Active", 3],
        queryFn: async () => {
            const res = await postApi.getCollabByStatus("Active", 3);
            return res.campaigns ?? [];
        },
        staleTime: 1000 * 60 * 2, // cache for 2 minutes
        refetchOnWindowFocus: true,
    });

    if (dashboardLoading) {
        return <BrandDashboardSkeleton />;
    }


    const tabs = [
        { id: "ongoing", label: "Ongoing Collaborations", count: campaigns.length },
        { id: "favorites", label: "Favorite Creators", count: dashboardData?.favCreators?.length },
        { id: "recent", label: "Recently Worked With", count: dashboardData?.recentCreators?.length },
    ];


    const handleSelecteCreatorForCampaign = (creatorId: string) => {
        setSelectedCreator(creatorId);
        setInviteModal(true);
    };

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-1  gap-6 w-full">

                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Campaigns",
                                count: dashboardData?.campaignCount?.totalCampaigns ?? 0,
                                icon: (
                                    <Image
                                        src={total_campaigns}
                                        alt="Total Campaigns"
                                        width={32}
                                        height={32}
                                    />
                                ),
                                iconBg: "bg-indigo-100",
                                iconColor: "text-indigo-600",
                            },
                            {
                                label: "Total Applicants",
                                count: dashboardData?.campaignCount?.totalApplicants ?? 0,
                                icon: <Contact size={32} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Active Campaigns",
                                count: dashboardData?.campaignCount?.activeCampaigns ?? 0,
                                icon: <CircleCheckBig size={32} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Total Spending",
                                count: dashboardData?.campaignCount?.totalSpending ?? 0,
                                icon: <DollarSign size={32} />,
                                iconBg: "bg-yellow-100",
                                iconColor: "text-yellow-600",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-normal text-gray-800">
                                        {item.label}
                                    </p>
                                    <span className="text-xl font-semibold text-black">
                                        {String(item.count).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor}`}>
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <h1 className="text-xl mb-4 text-black font-semibold dark:text-white">Offers & Payments Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                label: "Offer Sent",
                                count: dashboardData?.campaignCount?.offerSent,
                                subLabel: "Last 30 days",
                                icon: <Send size={32} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Offer Accepted",
                                count: dashboardData?.campaignCount?.offerAccepted,
                                subLabel: `${dashboardData?.campaignCount?.acceptanceRate}% acceptance rate`,
                                icon: <CircleCheckBig size={32} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Payments Pending",
                                count: dashboardData?.campaignCount?.totalPendingPayment,
                                subLabel: `${dashboardData?.campaignCount?.pendingCampaignCount} campaigns`,
                                icon: <Clock4 size={32} />,
                                iconBg: "bg-yellow-100",
                                iconColor: "text-yellow-600",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-gray-600 tracking-wide">
                                        {item.label}
                                    </p>

                                    <span className="text-xl font-semibold text-gray-900 leading-tight">
                                        {String(item.count).padStart(2, "0")}
                                    </span>

                                    {item.subLabel && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.subLabel}
                                        </p>
                                    )}
                                </div>

                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor}`}>
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TABS SECTION */}
                <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                    {/* TABS HEADER - TOP */}
                    <div className="border-b border-gray-200 bg-gray-50 px-3">
                        <div className="flex gap-10">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`
            relative pb-3 pt-4
            text-sm font-medium
            transition-colors duration-200
            ${isActive
                                                ? "text-primary"
                                                : "text-gray-600 hover:text-gray-800"
                                            }
          `}
                                    >
                                        <span>{tab.label}</span>

                                        {/* bottom indicator */}
                                        {isActive && (
                                            <span
                                                className="
                absolute left-0 right-0 bottom-[5px]
                h-[2px] bg-primary rounded-full
              "
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* TAB CONTENT - BELOW */}
                    <div className="p-5">
                        {/* ONGOING COLLABORATIONS TAB */}
                        {activeTab === "ongoing" && (
                            <div>
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        Ongoing Collaborations
                                    </h1>
                                    <p
                                        onClick={() => router.push("/dashboard/brand/application-inbox?tab=active")}
                                        className="text-primary text-base font-semibold cursor-pointer hover:underline"
                                    >
                                        View All
                                    </p>
                                </div>

                                {/* LOADING STATE */}
                                {isLoading && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[...Array(3)].map((_, idx) => (
                                            <CampaignCardSkeleton key={idx} />
                                        ))}
                                    </div>
                                )}

                                {/* ERROR STATE */}
                                {!isLoading && isError && (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <p className="text-sm text-red-500 font-medium">
                                            Something went wrong
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Unable to load active collaborations
                                        </p>
                                    </div>
                                )}

                                {/* EMPTY STATE */}
                                {!isLoading && !isError && campaigns.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <p className="text-sm font-medium text-gray-700">
                                            No ongoing collaborations
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            New collaborations will appear here once active
                                        </p>
                                    </div>
                                )}

                                {/* DATA STATE */}
                                {!isLoading && !isError && campaigns.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {campaigns.slice(0, 3).map((campaign, idx) => (
                                            <CampaignCard
                                                key={idx}
                                                campaign={campaign.campaignDetails}
                                                displayStatus="Ongoing"
                                                user="brand"
                                                onActionClick={() =>
                                                    router.push(
                                                        `/dashboard/brand/application-inbox?tab=active&campaignId=${campaign.campaignDetails._id}`
                                                    )
                                                }
                                                actionLabel={{
                                                    published: "View Applications",
                                                    draft: "View Applications",
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* FAVORITE CREATORS TAB */}
                        {activeTab === "favorites" && (
                            <div>
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        Favorite Creators
                                    </h1>
                                    <p
                                        onClick={() => router.push("/dashboard/brand/explore?sort=favorites")}
                                        className="text-primary text-base font-semibold cursor-pointer hover:underline"
                                    >
                                        View All
                                    </p>
                                </div>

                                {dashboardData?.favCreators?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <p className="text-sm font-medium text-gray-700">
                                            No favorite creators yet
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Start adding creators to your favorites
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {dashboardData?.favCreators?.slice(0, 4).map((creator, idx) => (
                                            <ExploreCreatorCard
                                                key={idx}
                                                creator={creator}
                                                showInviteButton
                                                showFavoriteIcon={false}
                                                onInvite={() =>
                                                    handleSelecteCreatorForCampaign(creator._id)
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* RECENTLY WORKED WITH TAB */}
                        {activeTab === "recent" && (
                            <div>
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        Recently Worked With
                                    </h1>
                                    <p
                                        onClick={() => router.push("/dashboard/brand/explore?sort=recentlyCollaborated")}
                                        className="text-primary text-base font-semibold cursor-pointer hover:underline"
                                    >
                                        View All
                                    </p>
                                </div>

                                {dashboardData?.recentCreators?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <p className="text-sm font-medium text-gray-700">
                                            No recent collaborations
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Creators you've worked with will appear here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {dashboardData?.recentCreators?.slice(0, 4).map((creator, idx) => (
                                            <ExploreCreatorCard
                                                key={idx}
                                                creator={creator}
                                                showInviteButton
                                                showFavoriteIcon={false}
                                                onInvite={() =>
                                                    handleSelecteCreatorForCampaign(creator._id)
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {inviteModal && selectedCreator && (
                <InviteCreatorModal
                    creatorId={selectedCreator}
                    onClose={() => setInviteModal(false)}
                />

            )}
        </div>
    )
}

export default BrandDashboard