"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Mail, Share2 } from "lucide-react";
import { userApi } from "@/services/userServices";
import PieChart from "../brand/PieChart";
import { Button } from "../ui/button";
import { postApi } from "@/services/postServices";
import BrandDashboardSkeleton from "../Skeletons/BrandDashboardSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
            postApi.getCollaborationHistory()
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


    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-6 w-full">
                <Card className="p-6 flex flex-col">
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
                            {/* <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4" type="video/mp4" /> */}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Card>
                {/* Recently Worked With + Stats */}
                <div className={`grid grid-cols-1 ${favCreators.length > 0 ? 'lg:grid-cols-[1.5fr_2.5fr]' : 'lg:grid-cols-1'} gap-6 w-full h-full`}>


                    <div className="w-full flex flex-col">
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
                    </div>


                    {favCreators.length > 0 && <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                            Favorite Creators:
                        </h2>

                        <div className="flex flex-col gap-4 overflow-auto max-h-[400px]">
                            {
                                favCreators.length > 0 && favCreators.map((creator, idx) => {
                                    const avatar = creator?.profileIcon || "/user1.jpg";
                                    const city = creator?.profile?.city
                                    const name = creator?.profile.fullName || "Creator";

                                    return <Link key={idx} href={"/dashboard/brand/explore"}>
                                        <div className="flex items-stretch justify-between p-2 gap-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm dark:text-white"
                                        >
                                            {/* Left: Profile */}
                                            <div className="flex items-center">
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-600">
                                                    <Image
                                                        src={avatar}
                                                        alt={name}
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                                    />
                                                </div>
                                            </div>
                                            {/* Right: Social Icons */}
                                            <div className=" flex flex-col h-full  w-full gap-2">
                                                <div className="flex w-full justify-between">
                                                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                                                        {name}
                                                    </span>

                                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                                        {/* Primary Social Media */}
                                                        {creator?.profile?.socialLinks?.primary?.platform && creator?.profile?.socialLinks?.primary?.link && (
                                                            <a
                                                                href={creator.profile.socialLinks.primary.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                                title={`Primary: ${creator.profile.socialLinks.primary.platform}`}
                                                                onClick={(e) => e.stopPropagation()} // prevent triggering parent Link

                                                            >
                                                                {getSocialMediaIcon(creator.profile.socialLinks.primary.platform)}
                                                            </a>
                                                        )}

                                                        {/* Secondary Social Media */}
                                                        {creator?.profile?.socialLinks?.secondary?.platform && creator?.profile?.socialLinks?.secondary?.link && (
                                                            <a
                                                                href={creator.profile.socialLinks.secondary.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                                title={`Secondary: ${creator.profile.socialLinks.secondary.platform}`}
                                                                onClick={(e) => e.stopPropagation()} // prevent triggering parent Link

                                                            >
                                                                {getSocialMediaIcon(creator.profile.socialLinks.secondary.platform)}
                                                            </a>
                                                        )}

                                                        {/* Fallback if no social media data */}
                                                        {!creator?.profile?.socialLinks?.primary?.platform && !creator?.profile?.socialLinks?.secondary?.platform && (
                                                            <div className="flex items-center gap-1" title="No social media data">
                                                                <Share2 className="w-5 h-5" />
                                                                <span className="text-xs text-gray-400">N/A</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-start flex-col justify-between h-full text-sm text-gray-500 dark:text-black">
                                                    <div className="flex gap-2">

                                                        {Array.isArray(creator?.profile?.category) && creator.profile.category.length > 0 &&
                                                            creator.profile.category.map((data, idx) => (
                                                                idx <= 1 && <span key={idx} className="text-xs p-1 bg-gray-300 rounded-lg">{data}</span>
                                                            ))
                                                        }
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <div className="flex gap-1 items-center">
                                                            <Image
                                                                src="/verified.png"
                                                                alt="Verified"
                                                                width={16}
                                                                height={16}
                                                            />
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">Verified</span>

                                                        </div>
                                                        {city && (
                                                            <div className="flex gap-1 items-center">
                                                                <span className="text-sm">📍</span>
                                                                <span className="text-sm text-gray-600 dark:text-gray-400">{city}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </Link>
                                }
                                )
                            }
                        </div>
                    </Card>}

                </div>
            </div>
            <div className="grid grid-cols-1">
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
            </Card>}

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