"use client";

import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import {
    ChevronsLeft, MapPin, Users, TrendingUp, Award, ExternalLink, Tag,
    Calendar, Globe, DollarSign, Heart, Video, User, Target,
    BarChart3, Languages, CreditCard, Sparkles, CheckCircle2, XCircle, Clock,
    Loader2, X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";


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

    const handleStatus = async (newStatus: string, collaborationId: string) => {
        setStatusLoading(true);
        try {
            await postApi.changeCollaborationStatus(collaborationId, newStatus);
            
            setModalType('success');
            setModalMessage(`Successfully updated status to ${newStatus}!`);
            setShowModal(true);
            
            // Optional: Navigate back after delay
            setTimeout(() => {
                router.back();
            }, 2000);
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
                                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                    modalType === 'success'
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

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    {status === "Pending" && (
                        <button
                            onClick={() => handleStatus("Shortlisted", collaborationId)}
                            disabled={statusLoading}
                            className="w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            {statusLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Clock className="w-5 h-5" />}
                            Shortlist Creator
                        </button>
                    )}

                    {status === "Shortlisted" && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleStatus("Offered", collaborationId)}
                                disabled={statusLoading}
                                className="w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {statusLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                                Send Offer
                            </button>

                            <button
                                onClick={() => handleStatus("Rejected", collaborationId)}
                                disabled={statusLoading}
                                className="w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {statusLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorDetailsPage;