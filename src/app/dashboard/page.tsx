"use client";
import { Card } from "@/components/ui/card";

import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useAppSelector } from "@/store";
import { useUserDetails } from "@/hooks/useUser";
import { Loader } from "@/components/common/Loader";

import React  from "react";
import CreatorWithCompleteProfile from "@/components/dashboard/CreatorWithCompleteProfile";
import NonVerifiedCreatorProfile from "@/components/dashboard/NonVerifiedCreatorProfile";
import BrandDashboard from "@/components/dashboard/BrandDashboard";


export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const userType = useAppSelector((state) => state.auth.userType);
  const { data: userDetails, isLoading, error } = useUserDetails();

  // Add state for improvement text






  if (!isAuthenticated || !userType) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-2">
        <Card className="p-6 bg-red-100 border border-red-400 text-black">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground">
            Failed to load user details. Please try again later.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-2 px-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {userType === "creator" ? (
        <>

          {(!userDetails?.data?.isProfileCompleted || !userDetails?.data?.profileIcon) &&
            <NonVerifiedCreatorProfile isProfileCompleted={userDetails?.data?.isProfileCompleted} profileIcon={userDetails?.data?.profileIcon} fullName={userDetails?.data?.fullName} />}


          {userDetails?.data?.isProfileCompleted &&
            userDetails?.data?.profileIcon && (
              <CreatorWithCompleteProfile fullName={userDetails?.data?.fullName} />
            )}
        </>
      ) : (
        // Brand dashboard
        <div className="">
          <BrandDashboard fullName={userDetails?.data?.fullName} />
        </div>
      )}
    </div>
  );
}

