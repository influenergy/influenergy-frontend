"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import { ChevronsLeft, } from "lucide-react";
import { useRouter } from "next/navigation";

interface SocialLinks {
    primary?: { platform?: string; link?: string; followers?: number | string };
    secondary?: { platform?: string; link?: string; followers?: number | string };
}

interface CreatorType {
    _id: string;
    fullName: string;
    stageName?: string;
    city?: string;
    category?: string[];
    profileIcon?: string;
    socialLinks?: SocialLinks;
    averageView?: string;
    growthRate?: string;
    isProfileCompleted?: boolean;
    badge?: string;
    badgePrice?: string;
    email?: string;
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

    if (loading) return <p className="p-6 text-center">Loading creator details...</p>;
    if (!creator) return <p className="p-6 text-center">Creator not found</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white duration-200 flex items-center gap-1"
            >
                <ChevronsLeft className="h-5 w-5" />
                Back
            </button>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-xl p-6">
                {creator.profileIcon && (
                    <img
                        src={creator.profileIcon}
                        alt={creator.fullName}
                        className="w-28 h-28 rounded-full border-2 border-primary object-cover"
                    />
                )}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-primary">{creator.fullName}</h1>
                    {creator.stageName && <p className="text-muted-foreground mt-1">Stage Name: {creator.stageName}</p>}
                    {creator.email && <p className="text-muted-foreground mt-1">{creator.email}</p>}
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location & Category */}
                <div className="bg-white shadow-md rounded-xl p-5 space-y-2 border-l-4 border-primary">
                    <h2 className="font-semibold text-lg text-primary">Location & Category</h2>
                    <p>City: <span className="font-medium">{creator.city || "N/A"}</span></p>
                    <p>Category: <span className="font-medium">{creator.category?.join(", ") || "N/A"}</span></p>
                    <p>Profile Completed: <span className="font-medium">{creator.isProfileCompleted ? "Yes" : "No"}</span></p>
                </div>

                {/* Social Stats */}
                <div className="bg-white shadow-md rounded-xl p-5 space-y-2 border-l-4 border-primary">
                    <h2 className="font-semibold text-lg text-primary">Social & Stats</h2>
                    <p>
                        Followers: <span className="font-medium">{creator.socialLinks?.primary?.followers || 0}</span> ({creator.socialLinks?.primary?.platform || "N/A"})
                    </p>
                    {creator.averageView && <p>Average Views: <span className="font-medium">{creator.averageView}</span></p>}
                    {creator.growthRate && <p>Growth Rate: <span className="font-medium">{creator.growthRate}</span></p>}
                </div>

                {/* Badge Info */}
                {creator.badge && (
                    <div className="bg-white shadow-md rounded-xl p-5 space-y-2 border-l-4 border-primary">
                        <h2 className="font-semibold text-lg text-primary">Badge Info</h2>
                        <p>Badge Level: <span className="font-medium">{creator.badge}</span></p>
                        <p>Badge Price: <span className="font-medium">{creator.badgePrice}</span></p>
                    </div>
                )}
            </div>

            {/* Optional: Social Links / Videos */}
            {creator.socialLinks?.primary?.link && (
                <div className="bg-white shadow-md rounded-xl p-5 space-y-2 border-l-4 border-primary">
                    <h2 className="font-semibold text-lg text-primary">Social Links</h2>
                    <a
                        href={creator.socialLinks.primary.link}
                        target="_blank"
                        className="text-primary underline"
                    >
                        {creator.socialLinks.primary.platform || "Primary Platform"}
                    </a>
                </div>
            )}
        </div>
    );
};

export default CreatorDetailsPage;
