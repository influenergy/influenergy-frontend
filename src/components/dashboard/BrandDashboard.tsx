"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2, Contact, DollarSign, CircleCheckBig, Megaphone, Send, Clock4 } from "lucide-react";
import { userApi } from "@/services/userServices";
import PieChart from "../brand/PieChart";
import { Button } from "../ui/button";
import { postApi } from "@/services/postServices";
import BrandDashboardSkeleton from "../Skeletons/BrandDashboardSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CampaignCard from "../brand/CampaignCard";
import ExploreCreatorCard from "../brand/ExploreCreatorCard";
import { useQuery } from "@tanstack/react-query";
import total_campaigns from "../../../public/images/total_campaigns.svg"

type CreatorBrief = {
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

type CollaborationItem = {
    _id: string;
    creatorId?: CreatorBrief | string;
    campaignId?: CampaignBrief | string;
    status?: string;
    amount?: number;
    paymentStatus?: string;
    createdAt?: string;
    updatedAt?: string;
};

type ActiveCampaignItem = {
    campaignDetails: CampaignBrief;
};


interface FavCreators {
    _id: string,
    profileIcon: string,
    profile: {
        _id: string,
        fullName: string,
        city: string,
        category: string[],
        socialLinks: {
            primary: {
                platform: string,
                link: string,
                followers: string
            },
            secondary?: {
                platform: string,
                link: string,
                followers: string
            },
        }
    }
}


function BrandDashboard({ fullName }: { fullName?: string }) {

    const [regionAnalysis, setRegionAnalysis] = useState<Record<string, unknown> | null>(null);

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    // Separate states as requested
    const [collaborationCount, setCollaborationCount] = useState({ ongoing: 0, pending: 0, completed: 0 });
    const [favCreators, setFavCreators] = useState<FavCreators[]>([]);
    const [recentCreators, setRecentCreators] = useState<FavCreators[]>([]);
    const [completedCollabs, setCompletedCollabs] = useState<CollaborationItem[]>([]);
    const [campaignCount, setCampaignCount] = useState({ totalCampaigns: 0, totalApplicants: 0, activeCampaigns: 0, totalSpending: 0, offerSent: 0, offerAccepted: 0, totalPendingPayment: 0, acceptanceRate: 0, pendingCampaignCount: 0, });


    const [loading, setLoading] = useState(true);

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const router = useRouter();

    useEffect(() => {
        Promise.all([
            userApi.getRegionAnalysis(),
            postApi.getCollaborationHistory(),
            postApi.getCampaignHistory(),
        ])
            .then(([regionData, collabData, campaignData]) => {
                // Region data
                setRegionAnalysis(regionData.regionAnalysis);

                // setCollaborationCount(collabData?.collaborations?.counts)

                // const completed = collabData?.collaborations?.completedCollabs ?? [];
                // setCompletedCollabs(completed);

                const completedCount = campaignData?.campaign?.counts;
                setCampaignCount(completedCount);

                setFavCreators(collabData?.collaborations?.favCreators ?? []);
                setRecentCreators(collabData?.collaborations?.recentCreators ?? []);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, []);


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
    });

    if (loading) {
        return <BrandDashboardSkeleton />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-1  gap-6 w-full">

                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Campaigns",
                                count: campaignCount.totalCampaigns,
                                icon: (
                                    <Image
                                        src={total_campaigns}   // public/megaphone.png
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
                                count: campaignCount.totalApplicants,
                                icon: <Contact size={32} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Active Campaigns",
                                count: campaignCount.activeCampaigns,
                                icon: <CircleCheckBig size={32} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Total Spending",
                                count: campaignCount.totalSpending,
                                icon: <DollarSign size={32} />,
                                iconBg: "bg-yellow-100",
                                iconColor: "text-yellow-600",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-xl border border-gray-2    00 bg-white p-5 shadow-sm hover:shadow-md transition"
                            >
                                {/* LEFT */}
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-normal text-gray-800">
                                        {item.label}
                                    </p>
                                    <span className="text-2xl font-semibold text-black">
                                        {String(item.count).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* RIGHT ICON */}
                                <div
                                    className={`flex items-center justify-center
      w-14 h-14
      rounded-xl ${item.iconBg} ${item.iconColor}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white">
                    {/* HEADER */}
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
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                📭
                            </div>
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



                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <h1 className="text-xl mb-4 text-black font-semibold dark:text-white">Offers & Payments Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                label: "Offer Sent",
                                count: campaignCount.offerSent,
                                subLabel: "Last 30 days",
                                icon: <Send size={32} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Offer Accepted",
                                count: campaignCount.offerAccepted,
                                subLabel: `${campaignCount.acceptanceRate}% acceptance rate`,
                                icon: <CircleCheckBig size={32} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Payments Pending",
                                count: campaignCount.totalPendingPayment,
                                subLabel: `${campaignCount.pendingCampaignCount} campaigns`,
                                icon: <Clock4 size={32} />,
                                iconBg: "bg-yellow-100",
                                iconColor: "text-yellow-600",
                            },
                        ]
                            .map((item, idx) => (
                                <div
                                    key={idx}
                                    className="
    flex items-center justify-between
    rounded-2xl border border-gray-200
    bg-white p-6
    shadow-sm
    hover:shadow-lg hover:-translate-y-0.5
    transition-all duration-200
  "
                                >
                                    {/* LEFT */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-gray-600 tracking-wide">
                                            {item.label}
                                        </p>

                                        <span className="text-2xl font-semibold text-gray-900 leading-tight">
                                            {String(item.count).padStart(2, "0")}
                                        </span>

                                        {item.subLabel && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.subLabel}
                                            </p>
                                        )}
                                    </div>

                                    {/* RIGHT ICON */}
                                    <div
                                        className={`
      flex items-center justify-center
      w-14 h-14
      rounded-xl
      ${item.iconBg} ${item.iconColor}
    `}
                                    >
                                        {item.icon}
                                    </div>
                                </div>

                            ))}
                    </div>
                </div>


                {/* <Card className="p-6 flex flex-col">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Welcome Back, {fullName || "Brand"}!
                        </h2>
                        <p className="text-muted-foreground">
                            Your brand dashboard is ready. <br />Start connecting with creators!
                        </p>
                    </div>
                    <div className="mt-6 flex-1">
                        <video
                            controls
                            width="100%"
                            style={{ borderRadius: '12px', maxHeight: '100%', background: '#000', height: '100%' }}
                        >
                            <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Card> */}
                {/* Recently Worked With + Stats */}
                <div className={` gap-6 w-full h-full`}>


                    {/* <div className="w-full flex flex-col">
                        <div className="flex flex-col gap-4 justify-between h-full">
                            {[
                                { label: "Ongoing Collaborations", count: collaborationCount.ongoing },
                                { label: "Pending Opportunities", count: collaborationCount.pending },
                                { label: "Completed Collaborations", count: collaborationCount.completed },
                            ].map((item, idx) => (
                                <Card
                                    key={idx}
                                    className="flex flex-col items-start gap-4 px-2 py-5 bg-white dark:bg-gray-800 transition-colors duration-300"
                                >
                                    <p className="text-xl font-normal text-gray-700 dark:text-gray-300">{item.label}</p>
                                    <span className="text-5xl text-blue-600 dark:text-blue-400 font-semibold">{String(item.count).padStart(2, '0')}</span>
                                </Card>
                            ))}
                        </div>
                    </div> */}


                    {favCreators.length > 0 && (
                        <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl text-black font-semibold dark:text-white">
                                    Favorite Creators
                                </h1>

                                <p
                                    onClick={() => router.push("/dashboard/brand/explore?sort=favorites")}
                                    className="text-primary font-semibold cursor-pointer hover:underline"
                                >
                                    View All
                                </p>
                            </div>

                            <div className="flex gap-3 overflow-x-hidden overflow-y-hidden scroll-smooth pb-2 scrollbar-hide">
                                {favCreators.slice(0, 4).map((creator, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-[260px]">
                                        <ExploreCreatorCard
                                            creator={creator}
                                            showInviteButton
                                            showFavoriteIcon={false}
                                        />
                                    </div>
                                ))}
                            </div>

                        </Card>
                    )}


                    {recentCreators.length > 0 && (
                        <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl text-black font-semibold dark:text-white">
                                    Recently Worked With
                                </h1>

                                <p
                                    onClick={() => router.push("/dashboard/brand/explore?sort=recentlyCollaborated")}
                                    className="text-primary font-semibold cursor-pointer hover:underline"
                                >
                                    View All
                                </p>
                            </div>

                            <div className="flex gap-3 overflow-x-hidden overflow-y-hidden scroll-smooth pb-2 scrollbar-hide">
                                {recentCreators.slice(0, 4).map((creator, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-[260px]">
                                        <ExploreCreatorCard
                                            creator={creator}
                                            showInviteButton
                                            showFavoriteIcon={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}


                </div>
            </div>
            {/* <div className="grid grid-cols-1">
                <Card className="lg:p-6 ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PieChart
                            data={regionAnalysis?.cityData as DataItem[]}
                            labelKey="city"
                            title="Creator Distribution by Country"
                        />
                        <PieChart
                            data={regionAnalysis?.platformData as DataItem[]}
                            labelKey="platform"
                            title="Creator Distribution by Platform"
                        />
                    </div>

                </Card>
            </div>
            {completedCollabs.length > 0 && <Card className="p-6">
                <h1 className="text-lg mb-4 text-gray-600 font-normal">Completed Collaboration</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {completedCollabs.map((item) => {
                        const campaign = item.campaignId as CampaignBrief | undefined;
                        const title = campaign?.campaignTitle || "Campaign";
                        const img = campaign?.campaignImage || "/camp.jpg";
                        const description = campaign?.campaignDescription || "";
                        return (
                            <Card
                                key={item._id}
                                className="bg-white rounded-2xl shadow-md p-4 flex flex-col transition hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 "
                            >
                                <h2 className="font-semibold text-base mb-2 dark:text-white">{title}</h2>
                                <Image
                                    src={img}
                                    alt={title}
                                    width={400}
                                    height={250}
                                    className="rounded-lg w-full h-48 object-cover mb-3"
                                />
                                <div className="mb-4">
                                    <h3 className="text-black text-xs mb-1 font-thin dark:text-gray-200">Description</h3>
                                    <p
                                        className={`text-gray-700 text-sm leading-snug transition-all dark:text-white ${expanded[item._id] ? "" : "line-clamp-2"}`}
                                    >
                                        {description}
                                    </p>
                                    {description && description.length > 120 && (
                                        <button
                                            onClick={(e) => { e.preventDefault(); toggleExpand(item._id); }}
                                            className="text-blue-500 hover:underline text-xs mt-1 "
                                        >
                                            {expanded[item._id] ? "View Less" : "View More"}
                                        </button>
                                    )}
                                </div>
                                <div className="mt-auto text-center">
                                    <Button className="bg-transparent text-purple-600 font-semibold hover:underline shadow-none dark:bg-gray-200 hover:bg-white" onClick={() => { router.push(`/dashboard/brand/posts/${campaign?._id}/${"Completed"}`); }}>
                                        View Details
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Card>} */}

        </div>
    )
}


// type DataItem = {
//     city?: string;
//     platform?: string;
//     value: number;
//     percentage: string;
// };

export default BrandDashboard