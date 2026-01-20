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

// Helper function to get social media icon based on platform name
const getSocialMediaIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
        case 'instagram':
            return <Instagram className="w-5 h-5" />;
        case 'youtube':
        case 'youtube reel':
            return <Youtube className="w-5 h-5" />;
        case 'twitter':
        case 'twitter / x':
            return <Twitter className="w-5 h-5" />;
        case 'facebook':
            return <Facebook className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
        case 'newsletter':
            return <Mail className="w-5 h-5" />;
        case 'pinterest':
        case 'tiktok':
        case 'twitch':
        default:
            return <Share2 className="w-5 h-5" />;
    }
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
    const [completedCollabs, setCompletedCollabs] = useState<CollaborationItem[]>([]);

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
            .then(([regionData, collabData]) => {
                // Region data
                setRegionAnalysis(regionData.regionAnalysis);

                setCollaborationCount(collabData?.collaborations?.counts)

                const completed = collabData?.collaborations?.completedCollabs ?? [];
                setCompletedCollabs(completed);
                setFavCreators(collabData?.collaborations?.favCreators ?? []);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <BrandDashboardSkeleton />;
    }

    console.log("fev-->",favCreators);
    
    const dashboardCampaigns = [
        {
            _id: "cmp_001",
            campaignImage: "",
            campaignTitle: "Summer Fashion Influencer Campaign",
            campaignDescription:
                "Collaborate with fashion influencers to promote our summer collection across Instagram and YouTube.",
            brandName: "Tradio",
            targetNiche: ["Fashion", "Lifestyle", "Instagram"],
            budgetForCampaign: "$5,000",
            expectedDeliverables: ["2 Instagram Reels", "1 Story", "1 YouTube Short"],
            status: "PUBLISHED",
            brandId: "brand_001",
            createdAt: "2024-12-10T10:00:00Z",
            updatedAt: "2024-12-15T12:00:00Z",
        },
        {
            _id: "cmp_002",
            campaignImage: "",
            campaignTitle: "Tech Gadget Launch Campaign",
            campaignDescription:
                "Looking for tech reviewers to showcase our latest smart gadgets with unboxing and reviews.",
            brandName: "Tradio",
            targetNiche: ["Technology", "Gadgets", "YouTube"],
            budgetForCampaign: "$8,500",
            expectedDeliverables: ["1 Unboxing Video", "1 Review Video"],
            status: "DRAFT",
            brandId: "brand_001",
            createdAt: "2024-12-18T09:30:00Z",
            updatedAt: "2024-12-18T09:30:00Z",
        },
        {
            _id: "cmp_003",
            campaignImage: "",
            campaignTitle: "Fitness Brand Awareness Drive",
            campaignDescription:
                "Promote our fitness supplements and workout gear through fitness creators on Instagram.",
            brandName: "Tradio",
            targetNiche: ["Fitness", "Health", "Instagram"],
            budgetForCampaign: "$3,200",
            expectedDeliverables: ["1 Reel", "2 Stories"],
            status: "PUBLISHED",
            brandId: "brand_001",
            createdAt: "2024-11-28T14:15:00Z",
            updatedAt: "2024-12-01T10:45:00Z",
        },
    ];


    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-1  gap-6 w-full">

                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Campaigns",
                                count: collaborationCount.ongoing,
                                icon: <Megaphone size={30} />,
                                iconBg: "bg-indigo-100",
                                iconColor: "text-indigo-600",
                            },
                            {
                                label: "Total Applicants",
                                count: collaborationCount.pending,
                                icon: <Contact size={30} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Active Campaigns",
                                count: collaborationCount.completed,
                                icon: <CircleCheckBig size={30} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Total Spending",
                                count: collaborationCount.completed,
                                icon: <DollarSign size={30} />,
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
                                    <p className="text-sm font-normal text-black">
                                        {item.label}
                                    </p>
                                    <span className="text-3xl font-semibold text-gray-900">
                                        {String(item.count).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* RIGHT ICON */}
                                <div
                                    className={`flex items-center justify-center w-14 h-14 rounded-md ${item.iconBg} ${item.iconColor}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <h1 className="text-xl mb-4 text-black font-semibold">Active Campaigns</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dashboardCampaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign._id}
                                campaign={campaign}
                                onActionClick={() => { }}
                                actionLabel={{
                                    published: "View Applications",
                                    draft: "View Applications",
                                }}
                            />
                        ))}
                    </div>
                </div>



                <div className="border border-gray-200 rounded-lg px-4 py-4">
                    <h1 className="text-xl mb-4 text-black font-semibold dark:text-white">Offers & Payments Overview</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                label: "Offer Sent",
                                count: collaborationCount.ongoing,
                                icon: <Send size={30} />,
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600",
                            },
                            {
                                label: "Offer Accepted",
                                count: collaborationCount.pending,
                                icon: <CircleCheckBig size={30} />,
                                iconBg: "bg-green-100",
                                iconColor: "text-green-600",
                            },
                            {
                                label: "Payments Pending",
                                count: collaborationCount.completed,
                                icon: <Clock4 size={30} />,
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
                                    <p className="text-sm font-medium text-gray-500">
                                        {item.label}
                                    </p>
                                    <span className="text-3xl font-semibold text-gray-900">
                                        {String(item.count).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* RIGHT ICON */}
                                <div
                                    className={`flex items-center justify-center w-14 h-14 rounded-md ${item.iconBg} ${item.iconColor}`}
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
                            <h1 className="text-xl mb-4 text-black font-semibold dark:text-white">
                                Favorite Creators
                            </h1>

                            <div className="flex">
                                {favCreators.map((creator, idx) => (
                                    <ExploreCreatorCard
                                        creator={creator}
                                        showInviteButton={true}
                                        showFavoriteIcon={false}
                                    />
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


type DataItem = {
    city?: string;
    platform?: string;
    value: number;
    percentage: string;
};

export default BrandDashboard