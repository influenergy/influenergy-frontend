"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { isAxiosError } from "axios";

import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useAppSelector } from "@/store";
import { useUserDetails } from "@/hooks/useUser";

import { Loader } from "@/components/common/Loader";
import CreatorWithCompleteProfile from "@/components/dashboard/CreatorWithCompleteProfile";
import NonVerifiedCreatorProfile from "@/components/dashboard/NonVerifiedCreatorProfile";
import BrandDashboard from "@/components/dashboard/BrandDashboard";
import FeaturedModal from "@/components/dashboard/FeaturedModal";
import NewCampaignButton from "@/components/brand/NewCampaignButton";

export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const userType = useAppSelector((state) => state.auth.userType);
  const { data: userDetails, isLoading, error } = useUserDetails();
  const [showFeatured, setShowFeatured] = React.useState(false);

  // ⛔ Block rendering until auth + userType are known
  if (!isAuthenticated || !userType) {
    return null;
  }

  // ✅ Show loader ONLY while API is fetching
  if (isLoading) {
    return <Loader />;
  }

  // ✅ Extra safety: API finished but no data yet
  if (!userDetails?.data) {
    return <Loader />;
  }

  // ❌ Error handling
  if (error) {
    let errorMessage = "Failed to load user details. Please try again later.";

    if (isAxiosError(error)) {
      const data = error.response?.data;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (typeof data === "object" && data !== null && "message" in data) {
        errorMessage = String((data as any).message);
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <div className="min-h-screen p-2">
        <Card className="p-6 bg-red-100 border border-red-400 text-black">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground">{errorMessage}</p>
        </Card>
      </div>
    );
  }

  const {
    isProfileCompleted,
    profileIcon,
    fullName,
  } = userDetails.data;

  return (
    <div className="relative p-2 px-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 pr-4 pt-5">
        <h1 className="text-xl font-semibold mb-2">Dashboard</h1>
        {userType === "brand" && <NewCampaignButton />}
      </div>

      {userType === "creator" ? (
        !isProfileCompleted || !profileIcon ? (
          <NonVerifiedCreatorProfile
            isProfileCompleted={isProfileCompleted}
            profileIcon={profileIcon}
            fullName={fullName}
          />
        ) : (
          <CreatorWithCompleteProfile fullName={fullName} />
        )
      ) : (
        <BrandDashboard fullName={fullName} />
      )}

      <FeaturedModal
        isOpen={showFeatured}
        onClose={() => setShowFeatured(false)}
        showBtn={false}
      />
    </div>
  );
}
