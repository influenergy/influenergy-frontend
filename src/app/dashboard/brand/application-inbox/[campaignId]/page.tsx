"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { postApi } from "@/services/postServices";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Clock, CircleCheckBig, CircleX, ChevronsLeft } from "lucide-react";
import Image from "next/image";

interface CreatorProfile {
  socialLinks?: {
    primary?: {
      followers?: number;
    };
  };
  category?: string[];
}

interface Creator {
  _id: string;
  fullName: string;
  profile?: CreatorProfile;
}

interface Application {
  _id: string;
  creatorId: Creator;
  coverMessage?: string;
  status: "Pending" | "Shortlisted" | "Offered" | "Rejected" | "Active" | "Completed";
}

interface Campaign {
  _id: string;
  campaignTitle: string;
  campaignImage: string;
}

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Shortlisted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Offered: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Completed: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [applications, setApplications] = useState<Application[]>([]);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!campaignId) {
        setError("No campaign ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // First, check if data is in sessionStorage (to avoid re-fetching)
        const cachedData = sessionStorage.getItem('campaignApplications');
        if (cachedData) {
          const { applications: cachedApps, timestamp } = JSON.parse(cachedData);
          // Use cached data if it's less than 5 minutes old
          if (Date.now() - timestamp < 5 * 60 * 1000) {
            setApplications(cachedApps);
            sessionStorage.removeItem('campaignApplications');
            setIsLoading(false);
            return;
          }
        }

        // Fetch fresh data from API
        const response = await postApi.getCollabByCampaignId(campaignId);

        if (!response?.status) {
          throw new Error("Failed to fetch applications");
        }

        setApplications(response.collaborations || []);

        // If your API returns campaign details, set them here
        if (response.campaign) {
          setCampaign(response.campaign);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [campaignId]);

  const handleStatus = async (newStatus: string, applicationId: string) => {
    try {
      setUpdatingId(applicationId);
      setUpdatingStatus(newStatus);

      // Call your API to update status
      // const response = await postApi.updateCollaborationStatus(applicationId, newStatus);

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus as any } : app
        )
      );

      console.log(`Updated ${applicationId} to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
      setUpdatingStatus(null);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/brand/application-inbox");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-500">{error}</div>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-all duration-200 font-medium"
        >
          <ChevronsLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>

        {campaign && (
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={campaign.campaignImage || "/images/placeholder.png"}
                alt={campaign.campaignTitle}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {campaign.campaignTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {applications.length} Application{applications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {!campaign && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Campaign Applications
          </h1>
        )}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No applications found for this campaign.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Applications will appear here once influencers apply.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              onClick={() =>
                router.push(
                  `/dashboard/brand/creators/${app.creatorId._id}?status=${app.status}`
                )
              }

              className="
                flex justify-between gap-6
                border rounded-lg p-5
                bg-white dark:bg-background
                border-border
                shadow-sm dark:shadow-none
                cursor-pointer
                hover:shadow-md hover:border-primary/40
                dark:hover:bg-muted/50
                transition
              "
            >
              {/* Left section */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {app.creatorId.fullName}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {app.creatorId.profile?.socialLinks?.primary?.followers || 0} followers
                  </span>
                  <span>•</span>
                  <span>
                    {app.creatorId.profile?.category?.[0] || "N/A"}
                  </span>
                </div>

                {app.coverMessage && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {app.coverMessage}
                  </p>
                )}

                {/* Actions */}
                
              </div>

              {/* Right section */}
              <div className="flex flex-col items-end justify-between">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[app.status] || "bg-gray-100 text-gray-700"
                    }`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}