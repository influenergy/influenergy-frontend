"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import { 
    ChevronsLeft, MapPin, Users, TrendingUp, Award, ExternalLink, Tag,
    Calendar, Globe, DollarSign, Heart, Video, User, Target, 
    BarChart3, Languages, CreditCard, Sparkles, CheckCircle2, XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

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
    createdAt?: string;
    updatedAt?: string;
}

const CreatorDetailsPage = () => {
    const { creatorId } = useParams();
    const [creator, setCreator] = useState<CreatorType | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-4xl">😕</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">Creator not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
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

                {/* Header Card */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {creator.profileIcon ? (
                                <div className="relative">
                                    <img
                                        src={creator.profileIcon}
                                        alt={creator.fullName}
                                        className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 object-cover shadow-lg"
                                    />
                                    {creator.isProfileCompleted && (
                                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-white dark:border-gray-700">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                                    <span className="text-4xl font-bold text-white">
                                        {creator.fullName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{creator.fullName}</h1>
                                    {creator.type && (
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                            {creator.type}
                                        </span>
                                    )}
                                </div>
                                {creator.stageName && (
                                    <p className="text-lg text-primary dark:text-primary/90 font-medium">
                                        aka "{creator.stageName}"
                                    </p>
                                )}
                                {creator.email && (
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {creator.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                {creator.aboutYourself && (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">About</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{creator.aboutYourself}</p>
                    </div>
                )}

                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Basic Info Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Personal Info</h2>
                        </div>
                        <div className="space-y-3">
                            {creator.dob && (
                                <div className="flex items-start gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {formatDate(creator.dob)} ({calculateAge(creator.dob)} years)
                                        </p>
                                    </div>
                                </div>
                            )}
                            {creator.gender && (
                                <div className="flex items-start gap-2">
                                    <User className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{creator.gender}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location & Category Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Location & Category</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{creator.city || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Tag className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {creator.category?.map((cat, idx) => (
                                            <span key={idx} className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 px-2 py-1 rounded-full text-xs font-medium">
                                                {cat}
                                            </span>
                                        )) || <span className="text-gray-400">N/A</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Languages & Payment Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <Languages className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Languages & Payment</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <Globe className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Languages</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {creator.languages?.map((lang, idx) => (
                                            <span key={idx} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                                {lang}
                                            </span>
                                        )) || <span className="text-gray-400">N/A</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <CreditCard className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment Methods</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {creator.paymentMethod?.map((method, idx) => (
                                            <span key={idx} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                                {method}
                                            </span>
                                        )) || <span className="text-gray-400">N/A</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Social Stats Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Primary Social Stats</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Platform</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {creator.socialLinks?.primary?.platform || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                                <p className="text-3xl font-bold text-primary">
                                    {creator.socialLinks?.primary?.followers?.toLocaleString() || "0"}
                                </p>
                            </div>
                            {creator.averageView && (
                                <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <TrendingUp className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Average Views</p>
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{creator.averageView}</p>
                                    </div>
                                </div>
                            )}
                            {creator.growthRate && (
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</p>
                                        <p className="text-xl font-semibold text-green-600 dark:text-green-400">{creator.growthRate}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary Social Stats Card */}
                    {creator.socialLinks?.secondary?.platform && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Secondary Social Stats</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Platform</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {creator.socialLinks.secondary.platform}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                        {creator.socialLinks.secondary.followers?.toLocaleString() || "0"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Audience Demographics */}
                {(creator.audienceInfo || creator.audience) && (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Audience Demographics</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Primary Audience */}
                            {creator.audienceInfo?.primaryAge && (
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-lg">
                                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                        <span className="text-xl">🎯</span> Primary Audience
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Age:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.primaryAge}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Gender:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.primaryGender}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.primaryLocation}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-primary/20">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Percentage:</span>
                                            <span className="font-bold text-primary text-lg">{creator.audienceInfo.primaryPercentage}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Secondary Audience */}
                            {creator.audienceInfo?.secondaryAge && (
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/20 rounded-lg">
                                    <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                                        <span className="text-xl">🎯</span> Secondary Audience
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Age:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.secondaryAge}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Gender:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.secondaryGender}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{creator.audienceInfo.secondaryLocation}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-purple-300 dark:border-purple-700">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Percentage:</span>
                                            <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">{creator.audienceInfo.secondaryPercentage}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Audience Info */}
                        {creator.audience && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {creator.audience.audienceLocations && creator.audience.audienceLocations.length > 0 && (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Top Locations</p>
                                        <div className="flex flex-wrap gap-1">
                                            {creator.audience.audienceLocations.map((loc, idx) => (
                                                <span key={idx} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                                                    {loc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {creator.audience.ageBracket && creator.audience.ageBracket.length > 0 && (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Age Brackets</p>
                                        <div className="flex flex-wrap gap-1">
                                            {creator.audience.ageBracket.map((age, idx) => (
                                                <span key={idx} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                                                    {age}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {creator.audience.usBasedPercentage && (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">US-Based Audience</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{creator.audience.usBasedPercentage}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Experience & Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Experience Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Experience</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Paid Campaigns</span>
                                {creator.hasPaidCampaignExperience ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                )}
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">AI Consumer Apps</span>
                                {creator.workedWithAIConsumerApps ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Budget Card */}
                    {creator.budgetVideo && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Budget Per Video</h2>
                            </div>
                            <p className="text-3xl font-bold text-primary">{creator.budgetVideo}</p>
                        </div>
                    )}

                    {/* Favorite Brands Card */}
                    {creator.favouriteBrands && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                    <Heart className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Favorite Brands</h2>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{creator.favouriteBrands}</p>
                        </div>
                    )}

                    {/* Badge Info Card */}
                    {creator.badge && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Badge Info</h2>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Badge Level</p>
                                    <span className="inline-block mt-2 bg-gradient-to-r from-primary to-primary/70 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                                        {creator.badge}
                                    </span>
                                </div>
                                {creator.badgePrice && (
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Badge Price</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{creator.badgePrice}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Social Videos Portfolio */}
                {creator.socialVideos && creator.socialVideos.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                                <Video className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Video Portfolio</h2>
                            <span className="ml-auto bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                {creator.socialVideos.length} {creator.socialVideos.length === 1 ? 'Video' : 'Videos'}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {creator.socialVideos.map((video, idx) => (
                                <div key={idx} className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                                    {video.image ? (
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={video.image}
                                                alt={video.title || `Video ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {video.isPublic && (
                                                <div className="absolute top-2 right-2">
                                                    {video.isPublic === 'approved' && (
                                                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            Approved
                                                        </span>
                                                    )}
                                                    {video.isPublic === 'pending' && (
                                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                            Pending
                                                        </span>
                                                    )}
                                                    {video.isPublic === 'declined' && (
                                                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <XCircle className="h-3 w-3" />
                                                            Declined
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                            <Video className="h-12 w-12 text-primary/50" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        {video.title && (
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {video.title}
                                            </h3>
                                        )}
                                        {video.addedAt && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                Added: {formatDate(video.addedAt)}
                                            </p>
                                        )}
                                        {video.videoLink && (
                                            <a
                                                href={video.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Watch Video
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Links Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-primary">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                            <ExternalLink className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white">Social Links</h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {creator.socialLinks?.primary?.link && (
                            <a
                                href={creator.socialLinks.primary.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                            >
                                <span>{creator.socialLinks.primary.platform || "Primary Profile"}</span>
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                        {creator.socialLinks?.secondary?.link && (
                            <a
                                href={creator.socialLinks.secondary.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                            >
                                <span>{creator.socialLinks.secondary.platform || "Secondary Profile"}</span>
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Metadata Footer */}
                {(creator.createdAt || creator.updatedAt) && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                            {creator.createdAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Profile Created: {formatDate(creator.createdAt)}</span>
                                </div>
                            )}
                            {creator.updatedAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Last Updated: {formatDate(creator.updatedAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorDetailsPage;