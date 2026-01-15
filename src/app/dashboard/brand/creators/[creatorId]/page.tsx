"use client";

import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import {
    ChevronsLeft, MapPin, Users, TrendingUp, Award, ExternalLink, Tag,
    Calendar, Globe, DollarSign, Heart, Video, User, Target,
    BarChart3, Languages, CreditCard, Sparkles, CheckCircle2, XCircle, Clock,
    Loader2, X, Eye, Briefcase, Star, Link as LinkIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";


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

            // setTimeout(() => {
            //     router.back();
            // }, 2000);
            
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
                                className={`w-full py-3 rounded-lg font-medium transition-colors ${modalType === 'success'
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
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

                {/* Header Card */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {creator.profileIcon?.trim() ? (
                                <div className="relative">
                                    <img
                                        src={creator.profileIcon}
                                        alt={creator.fullName}
                                        className="w-32 h-32 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
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
                                    {creator.badge && (
                                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <Award className="w-4 h-4" />
                                            {creator.badge}
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
                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>Joined: {formatDate(creator.createdAt)}</span>
                                    {creator.updatedAt && (
                                        <span>Updated: {formatDate(creator.updatedAt)}</span>
                                    )}
                                </div>
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
                            {creator.isProfileCompleted !== undefined && (
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className={`h-4 w-4 mt-1 flex-shrink-0 ${creator.isProfileCompleted ? 'text-green-500' : 'text-gray-400'}`} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Profile Status</p>
                                        <p className={`font-semibold ${creator.isProfileCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                            {creator.isProfileCompleted ? 'Completed' : 'Incomplete'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location & Category Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg">
                                <MapPin className="h-6 w-6 text-blue-500" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Location & Category</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{creator.city || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Tag className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {creator.category?.map((cat, idx) => (
                                            <span key={idx} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                                {cat}
                                            </span>
                                        )) || <span className="text-gray-400">N/A</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Languages & Payment Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-500/10 dark:bg-green-500/20 p-3 rounded-lg">
                                <Languages className="h-6 w-6 text-green-500" />
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

                {/* Social Media & Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Social Links Card */}
                    {(creator.socialLinks?.primary || creator.socialLinks?.secondary) && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-500/10 dark:bg-purple-500/20 p-3 rounded-lg">
                                    <LinkIcon className="h-6 w-6 text-purple-500" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Social Media</h2>
                            </div>
                            <div className="space-y-4">
                                {creator.socialLinks.primary && (
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Primary Platform</span>
                                            {creator.socialLinks.primary.platform && (
                                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                                                    {creator.socialLinks.primary.platform}
                                                </span>
                                            )}
                                        </div>
                                        {creator.socialLinks.primary.followers && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatNumber(creator.socialLinks.primary.followers)} followers
                                                </span>
                                            </div>
                                        )}
                                        {creator.socialLinks.primary.link && (
                                            <a
                                                href={creator.socialLinks.primary.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Visit Profile
                                            </a>
                                        )}
                                    </div>
                                )}
                                {creator.socialLinks.secondary && (
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Secondary Platform</span>
                                            {creator.socialLinks.secondary.platform && (
                                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                                                    {creator.socialLinks.secondary.platform}
                                                </span>
                                            )}
                                        </div>
                                        {creator.socialLinks.secondary.followers && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatNumber(creator.socialLinks.secondary.followers)} followers
                                                </span>
                                            </div>
                                        )}
                                        {creator.socialLinks.secondary.link && (
                                            <a
                                                href={creator.socialLinks.secondary.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Visit Profile
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Performance Metrics Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-orange-500/10 dark:bg-orange-500/20 p-3 rounded-lg">
                                <BarChart3 className="h-6 w-6 text-orange-500" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Performance Metrics</h2>
                        </div>
                        <div className="space-y-3">
                            {creator.averageView && (
                                <div className="flex items-start gap-2">
                                    <Eye className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Average Views</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{formatNumber(creator.averageView)}</p>
                                    </div>
                                </div>
                            )}
                            {creator.growthRate && (
                                <div className="flex items-start gap-2">
                                    <TrendingUp className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{creator.growthRate}</p>
                                    </div>
                                </div>
                            )}
                            {creator.budgetVideo && (
                                <div className="flex items-start gap-2">
                                    <DollarSign className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Budget per Video</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{creator.budgetVideo}</p>
                                    </div>
                                </div>
                            )}
                            {creator.badgePrice && (
                                <div className="flex items-start gap-2">
                                    <Award className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Badge Price</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{creator.badgePrice}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Audience Information */}
                {(creator.audience || creator.audienceInfo) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Audience Demographics */}
                        {creator.audience && (
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-3 rounded-lg">
                                        <Users className="h-6 w-6 text-indigo-500" />
                                    </div>
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Audience Demographics</h2>
                                </div>
                                <div className="space-y-3">
                                    {creator.audience.audienceLocations && creator.audience.audienceLocations.length > 0 && (
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Audience Locations</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {creator.audience.audienceLocations.map((location, idx) => (
                                                        <span key={idx} className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-xs font-medium">
                                                            {location}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {creator.audience.ageBracket && creator.audience.ageBracket.length > 0 && (
                                        <div className="flex items-start gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Age Bracket</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {creator.audience.ageBracket.map((age, idx) => (
                                                        <span key={idx} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                                                            {age}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {creator.audience.usBasedPercentage && (
                                        <div className="flex items-start gap-2">
                                            <Target className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">US-Based Audience</p>
                                                <p className="font-semibold text-gray-900 dark:text-white">{creator.audience.usBasedPercentage}%</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Detailed Audience Info */}
                        {creator.audienceInfo && (
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-pink-500/10 dark:bg-pink-500/20 p-3 rounded-lg">
                                        <Target className="h-6 w-6 text-pink-500" />
                                    </div>
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Audience Breakdown</h2>
                                </div>
                                <div className="space-y-4">
                                    {/* Primary Audience */}
                                    {(creator.audienceInfo.primaryAge || creator.audienceInfo.primaryGender || creator.audienceInfo.primaryLocation) && (
                                        <div className="bg-pink-50 dark:bg-pink-900/10 rounded-lg p-4">
                                            <h3 className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-3">Primary Audience</h3>
                                            <div className="space-y-2">
                                                {creator.audienceInfo.primaryAge && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Age Group</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.primaryAge}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.primaryGender && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Gender</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.primaryGender}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.primaryLocation && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.primaryLocation}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.primaryPercentage && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Percentage</span>
                                                        <span className="font-semibold text-pink-600 dark:text-pink-400">{creator.audienceInfo.primaryPercentage}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Secondary Audience */}
                                    {(creator.audienceInfo.secondaryAge || creator.audienceInfo.secondaryGender || creator.audienceInfo.secondaryLocation) && (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Secondary Audience</h3>
                                            <div className="space-y-2">
                                                {creator.audienceInfo.secondaryAge && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Age Group</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.secondaryAge}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.secondaryGender && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Gender</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.secondaryGender}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.secondaryLocation && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{creator.audienceInfo.secondaryLocation}</span>
                                                    </div>
                                                )}
                                                {creator.audienceInfo.secondaryPercentage && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Percentage</span>
                                                        <span className="font-semibold text-gray-600 dark:text-gray-400">{creator.audienceInfo.secondaryPercentage}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Experience & Preferences */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Campaign Experience */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-teal-500/10 dark:bg-teal-500/20 p-3 rounded-lg">
                                <Briefcase className="h-6 w-6 text-teal-500" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Campaign Experience</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Worked with AI Consumer Apps</span>
                                <span className={`flex items-center gap-2 font-semibold ${creator.workedWithAIConsumerApps ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                                    {creator.workedWithAIConsumerApps ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Yes
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-4 h-4" />
                                            No
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Paid Campaign Experience</span>
                                <span className={`flex items-center gap-2 font-semibold ${creator.hasPaidCampaignExperience ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                                    {creator.hasPaidCampaignExperience ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Yes
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-4 h-4" />
                                            No
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Favorite Brands */}
                    {creator.favouriteBrands && (
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-yellow-500/10 dark:bg-yellow-500/20 p-3 rounded-lg">
                                    <Heart className="h-6 w-6 text-yellow-500" />
                                </div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Favorite Brands</h2>
                            </div>
                            <div className="flex items-start gap-2">
                                <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{creator.favouriteBrands}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Social Videos */}
                {creator.socialVideos && creator.socialVideos.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-500/10 dark:bg-red-500/20 p-3 rounded-lg">
                                <Video className="h-6 w-6 text-red-500" />
                            </div>
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Portfolio Videos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {creator.socialVideos.map((video, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    {video.image && (
                                        <div className="aspect-video bg-gray-200 dark:bg-gray-600 relative">
                                            <img
                                                src={video.image}
                                                alt={video.title || `Video ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {video.isPublic && (
                                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Public
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-4">
                                        {video.title && (
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {video.title}
                                            </h3>
                                        )}
                                        {video.addedAt && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                Added: {formatDate(video.addedAt)}
                                            </p>
                                        )}
                                        {video.videoLink && (
                                            <a
                                                href={video.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm font-medium"
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

                {/* Action Buttons */}
                {(status === "Waiting Approval" || status === "Interested") && (
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Actions</h2>

                        {status === "Waiting Approval" && (
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleStatus("Interested", collaborationId)}
                                    variant="default"
                                    className="flex"
                                >
                                    Mark Interested
                                </Button>
                                <Button onClick={() => handleStatus("Offered", collaborationId)} className="flex">
                                    Send Offer
                                </Button>
                                <Button onClick={() => handleStatus("Rejected", collaborationId)} variant="destructive" className="flex">
                                    Reject
                                </Button>
                            </div>
                        )}

                        {status === "Interested" && (
                            <div className="flex gap-3">
                                <Button onClick={() => handleStatus("Offered", collaborationId)} className="flex">
                                    Send Offer
                                </Button>
                                <Button onClick={() => handleStatus("Rejected", collaborationId)} variant="destructive" className="flex">
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