"use client";

import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import {
    ChevronsLeft, MapPin, Users, TrendingUp, Award, ExternalLink, Tag,
    Calendar, Globe, DollarSign, Heart, Video, User, Target,
    BarChart3, Languages, CreditCard, Sparkles, CheckCircle2, XCircle, Clock,
    Loader2, X, Eye, Briefcase, Star, Link as LinkIcon,
    CircleCheckBig,
    CircleX
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import insta from "../../../../../../public/images/Insta.svg"
import youtube from "../../../../../../public/images/Youtube.svg"
import tiktok from "../../../../../../public/images/Tiktok.svg"



import TikTokIcon from "@/components/icons/tiktok";
import {
    Instagram,
    Youtube,
    Twitter,
    Facebook,
    Linkedin,
    Mail,
    Share2,
} from "lucide-react";
import Image from "next/image";
interface SocialLinks {
    primary?: { platform?: string; link?: string; followers?: number | string };
    secondary?: { platform?: string; link?: string; followers?: number | string };
}

interface AudienceInfo {
    primaryAge?: string;
    primaryGender?: string;
    primaryLocation?: string;
    primaryPercentage?: string;
    secondaryAge?: string;
    secondaryGender?: string;
    secondaryLocation?: string;
    secondaryPercentage?: string;
}

interface Audience {
    audienceLocations?: string[];
    ageBracket?: string[];
    usBasedPercentage?: string;
}

interface SocialVideo {
    videoLink?: string;
    title?: string;
    image?: string;
    isPublic?: string;
    addedAt?: string;
}

interface CreatorType {
    _id: string;
    fullName: string;
    stageName?: string;
    aboutYourself?: string;
    type?: string;
    dob?: string;
    gender?: string;
    city?: string;
    languages?: string[];
    paymentMethod?: string[];
    category?: string[];
    profileIcon?: string;
    socialLinks?: SocialLinks;
    growthRate?: string;
    audience?: Audience;
    audienceInfo?: AudienceInfo;
    averageView?: string;
    favouriteBrands?: string;
    workedWithAIConsumerApps?: boolean;
    hasPaidCampaignExperience?: boolean;
    budgetVideo?: string;
    socialVideos?: SocialVideo[];
    isProfileCompleted?: boolean;
    badge?: string;
    badgePrice?: string;
    email?: string;
    completedCount?: string;
    createdAt?: string;
    updatedAt?: string;
}

const CreatorDetailsPage = () => {
    const [creator, setCreator] = useState<CreatorType | null>(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const router = useRouter();

    const { creatorId } = useParams();
    const searchParams = useSearchParams();

    const status = searchParams.get("status");
    const collaborationId = searchParams.get('collaborationId') || '';

    const ICON_SIZE = 40;


    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const res = await postApi.getCreatorProfileById(creatorId as string);
                setCreator(res.creatorProfile || res);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreator();
    }, [creatorId]);

    const formatDate = (date?: string) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (dob?: string) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


    const getSocialMediaIcon = (platform?: string) => {
        if (!platform) return <Share2 className="w-5 h-5" />;

        const normalized = platform.toLowerCase().trim();

        switch (normalized) {
            case "instagram":
                return <Instagram className="w-5 h-5 text-pink-500" />;

            case "youtube":
            case "youtube reel":
                return <Youtube className="w-5 h-5 text-red-500" />;

            case "twitter":
            case "twitter / x":
            case "x":
                return <Twitter className="w-5 h-5 text-black" />;

            case "facebook":
                return <Facebook className="w-5 h-5 text-blue-600" />;

            case "linkedin":
                return <Linkedin className="w-5 h-5 text-blue-700" />;

            case "newsletter":
            case "email":
                return <Mail className="w-5 h-5 text-gray-600" />;

            case "tiktok":
                return <TikTokIcon size={20} />;

            default:
                return <Share2 className="w-5 h-5 text-gray-400" />;
        }
    };


    const getSocialMediaIconPrimary = (platform?: string) => {
        if (!platform) return <Share2 className="w-5 h-5" />;

        const normalized = platform.toLowerCase().trim();

        switch (normalized) {
            case "instagram":
                return <Image src={insta} alt="instagram" width={ICON_SIZE} height={ICON_SIZE} />;

            case "youtube":
            case "youtube reel":
                return <Image src={youtube} alt="youtube" width={ICON_SIZE} height={ICON_SIZE} />;

            case "tiktok":
                return <Image src={tiktok} alt="tiktok" width={ICON_SIZE} height={ICON_SIZE} />;

            default:
                return <Share2 className="w-5 h-5" />;
        }
    };


    const formatNumber = (num?: number | string) => {
        if (!num) return "N/A";
        const number = typeof num === 'string' ? parseFloat(num) : num;
        if (number >= 1000000) {
            return `${(number / 1000000).toFixed(1)}M`;
        } else if (number >= 1000) {
            return `${(number / 1000).toFixed(1)}K`;
        }
        return number.toLocaleString();
    };

    const handleStatus = async (newStatus: string, collaborationId: string) => {
        setStatusLoading(true);
        try {
            await postApi.changeCollaborationStatus(collaborationId, newStatus);

            setModalType('success');
            setModalMessage(`Successfully updated status to ${newStatus}!`);
            setShowModal(true);

        } catch (err: any) {
            setModalType('error');
            setModalMessage(err?.message || 'Failed to update status. Please try again.');
            setShowModal(true);
        } finally {
            setStatusLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        router.push("/dashboard/brand/application-inbox");
    };

    const tabs = [
        // "Portfolio",
        "Audience Insights",
        // "Past Campaigns"
    ];

    const [activeTab, setActiveTab] = useState("Audience Insights");


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Loading creator details...</p>
                </div>
            </div>
        );
    }

    if (!creator) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">Creator not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            {/* Status Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            {modalType === 'success' ? (
                                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                            ) : (
                                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                    <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {modalType === 'success' ? 'Success!' : 'Error'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {modalMessage}
                            </p>

                            <button
                                onClick={closeModal}
                                className={`w-full py-3 rounded-lg font-medium transition-colors bg-primary text-white hover:bg-primary/90`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {statusLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">Updating status...</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Please wait</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-all duration-200 font-medium"
                >
                    <ChevronsLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Header Card (Compact Creator Layout) */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
                    <div className="flex flex-col items-start gap-4 px-5 py-5">

                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            {creator.profileIcon?.trim() ? (
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex-shrink-0 shadow-md">
                                    <img
                                        src={creator.profileIcon}
                                        alt={creator.fullName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />

                                    {/* {creator.isProfileCompleted && (
                                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white dark:border-gray-700">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )} */}
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0 shadow-md border-2 border-primary/20">
                                    {creator.fullName?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                <div className="flex items-center">

                                    {/* Name */}
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                                        {creator.fullName}
                                    </h1>

                                    {/* Stage Name
                                    {creator.stageName && (
                                        <p className="text-sm text-primary font-medium truncate">
                                            aka "{creator.stageName}"
                                        </p>
                                    )} */}

                                    {/* Social Icons */}
                                    {(creator.socialLinks?.primary || creator.socialLinks?.secondary) && (
                                        <div className="flex items-center mx-1">
                                            {/* Primary */}
                                            {creator.socialLinks?.primary?.link && (
                                                <a
                                                    href={creator.socialLinks.primary.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                    title={creator.socialLinks.primary.platform}
                                                >
                                                    {getSocialMediaIcon(creator.socialLinks.primary.platform)}
                                                </a>
                                            )}

                                            {/* Secondary */}
                                            {creator.socialLinks?.secondary?.link && (
                                                <a
                                                    href={creator.socialLinks.secondary.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                    title={creator.socialLinks.secondary.platform}
                                                >
                                                    {getSocialMediaIcon(creator.socialLinks.secondary.platform)}
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* City · Age · Followers */}
                                {(creator.city ||
                                    creator.dob ||
                                    creator.socialLinks?.primary?.followers) && (
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            {creator.city && (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{creator.city}</span>
                                                </>)}


                                            {creator.dob && (
                                                <>
                                                    <span className="text-gray-400">•</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{calculateAge(creator.dob)} yrs</span>
                                                </>
                                            )}


                                            {creator.socialLinks?.primary?.followers && (

                                                <>
                                                    <span className="text-gray-400">•</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <span className="bg-primary/10 dark:bg-primary/20 rounded-full text-xs font-medium">
                                                        {creator.socialLinks.primary.followers.toLocaleString()} followers
                                                    </span>
                                                </>
                                            )}

                                        </div>
                                    )}

                                {/* Categories */}
                                {creator.category && creator.category?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {creator.category.map((cat, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 font-medium border border-gray-200 dark:border-gray-600"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            </div>


                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm py-3 px-4 flex flex-nowrap justify-between gap-4 w-full overflow-x-auto">

                            {/* Average Views */}
                            {creator.averageView && (
                                <div className="flex justify-center items-center gap-1 border border-primary dark:border-primary/30 rounded-xl px-1 py-2 min-w-[320px]">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {creator.averageView}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">
                                        Average Views
                                    </p>
                                </div>
                            )}

                            {/* Growth Rate */}
                            {creator.growthRate && (
                                <div className="flex justify-center items-center gap-1 border border-primary dark:border-primary/30 rounded-xl min-w-[320px]">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {creator.growthRate}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">
                                        Growth Rate
                                    </p>
                                </div>
                            )}

                            {/* Completed Campaigns */}
                            <div className="flex justify-center items-center gap-1 border border-primary dark:border-primary/30 rounded-xl  min-w-[320px]">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {creator.completedCount}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                    Completed Campaigns
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* About Section */}
                    {creator.aboutYourself && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">About</h2>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{creator.aboutYourself}</p>
                        </div>
                    )}


                    {/* Social Media Presence */}
                    {(creator.socialLinks?.primary || creator.socialLinks?.secondary) && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                                Social Media Presence
                            </h2>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Primary */}
                                {creator.socialLinks?.primary && (
                                    <a
                                        href={creator.socialLinks.primary.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                    >
                                        <div className="">
                                            {getSocialMediaIconPrimary(creator.socialLinks.primary.platform)}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {creator.socialLinks.primary.platform}
                                            </span>

                                            {creator.socialLinks.primary.followers && (
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {creator.socialLinks.primary.followers} followers
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                )}

                                {/* Secondary */}
                                {creator.socialLinks?.secondary && (
                                    <a
                                        href={creator.socialLinks.secondary.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                    >
                                        <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                                            {getSocialMediaIconPrimary(creator.socialLinks.secondary.platform)}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {creator.socialLinks.secondary.platform}
                                            </span>

                                            {creator.socialLinks.secondary.followers && (
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {creator.socialLinks.secondary.followers} followers
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}



                    {/* Tabs */}
                    <div className="mt-6 px-7">
                        <div className="flex gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-base font-semibold border-b-2 transition ${activeTab === tab
                                        ? "text-primary border-primary"
                                        : "text-gray-500 dark:text-gray-400 border-transparent hover:text-primary"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>



                    {activeTab === "Audience Insights" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
                            <div className="overflow-hidden rounded-xl border dark:border-gray-700">
                                <table className="w-full border-collapse">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                            <th className="px-5 py-3 text-left">Country</th>
                                            <th className="px-5 py-3 text-left">Age</th>
                                            <th className="px-5 py-3 text-left">Gender</th>
                                            <th className="px-5 py-3 text-right">Audience %</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm">
                                        {/* PRIMARY */}
                                        {creator.audienceInfo?.primaryLocation && (
                                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                <td className="px-5 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    {creator.audienceInfo.primaryLocation}
                                                    <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        PRIMARY
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {creator.audienceInfo.primaryAge}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {creator.audienceInfo.primaryGender}
                                                </td>
                                                <td className="px-5 py-4 text-right font-semibold">
                                                    {creator.audienceInfo.primaryPercentage}
                                                </td>
                                            </tr>
                                        )}

                                        {/* SECONDARY */}
                                        {creator.audienceInfo?.secondaryLocation && (
                                            <tr className="bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
                                                <td className="px-5 py-4 flex items-center gap-2">
                                                    {creator.audienceInfo.secondaryLocation}
                                                    <span className="text-[10px] font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                                                        SECONDARY
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {creator.audienceInfo.secondaryAge}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {creator.audienceInfo.secondaryGender}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    {creator.audienceInfo.secondaryPercentage}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {(status === "Waiting Approval" || status === "Interested" || status === "Offered" || status === "Offer Accepted") && (
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Actions</h2>

                        {status === "Waiting Approval" && (
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleStatus("Interested", collaborationId)}
                                    variant="blue"
                                    className="flex"
                                >
                                    <Clock className="w-4 h-4" />
                                    Mark Interested
                                </Button>
                                <Button onClick={() => handleStatus("Offered", collaborationId)} className="flex">
                                    <CircleCheckBig className="w-4 h-4" />
                                    Send Offer
                                </Button>
                                <Button onClick={() => handleStatus("Rejected", collaborationId)} variant="destructive" className="flex">
                                    <CircleX className="w-4 h-4" />
                                    Reject
                                </Button>
                            </div>
                        )}

                        {status === "Interested" && (
                            <div className="flex gap-3">
                                <Button onClick={() => handleStatus("Offered", collaborationId)} className="flex">
                                    <CircleCheckBig className="w-4 h-4" />
                                    Send Offer
                                </Button>
                                <Button onClick={() => handleStatus("Rejected", collaborationId)} variant="destructive" className="flex">
                                    <CircleX className="w-4 h-4" />
                                    Reject
                                </Button>
                            </div>
                        )}

                        {status === "Offered" && (
                            <p className="font-medium text-primary">Waiting for the creator to accept the offer</p>
                        )}

                        {
                            status === "Offer Accepted" && (
                                <div className="flex gap-3">
                                    <Button onClick={() => handleStatus("Payment", collaborationId)} className="flex">
                                        <CreditCard className="w-4 h-4" />
                                        Proceed to Payment
                                    </Button>

                                    <Button onClick={() => handleStatus("Rejected", collaborationId)} variant="destructive" className="flex">
                                        <CircleX className="w-4 h-4" />
                                        Reject
                                    </Button>
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorDetailsPage;