"use client";
import { Card } from "@/components/ui/card";

import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useAppSelector } from "@/store";
import { useUserDetails } from "@/hooks/useUser";
import { Loader } from "@/components/common/Loader";

import { userApi } from "@/services/userServices";
import React, { useEffect, useState } from "react";
import PieChart from "@/components/brand/PieChart";
import CreatorWithCompleteProfile from "@/components/dashboard/CreatorWithCompleteProfile";
import NonVerifiedCreatorProfile from "@/components/dashboard/NonVerifiedCreatorProfile";


export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const userType = useAppSelector((state) => state.auth.userType);
  const { data: userDetails, isLoading, error } = useUserDetails();

  // Add state for improvement text

  const [regionAnalysis, setRegionAnalysis] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (userType === "brand") {
      userApi.getRegionAnalysis().then((data) => {
        console.log(data.regionAnalysis, 'data')
        setRegionAnalysis(data.regionAnalysis);
      });
    }
  }, [userType]);





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
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Welcome Back, {userDetails?.data?.fullName || "Brand"}!
            </h2>
            <p className="text-muted-foreground">
              Your brand dashboard is ready. Start connecting with creators!
            </p>
            <div className="mt-6">
              <video
                controls
                width="100%"
                style={{ borderRadius: '12px', maxHeight: '320px', background: '#000' }}
              >
                <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" />
                {/* <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4" type="video/mp4" /> */}
                Your browser does not support the video tag.
              </video>
            </div>
          </Card>
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChart
                data={regionAnalysis?.cityData as DataItem[]}
                labelKey="city"
                title="Creator Distribution by City"
              />
              <PieChart
                data={regionAnalysis?.platformData as DataItem[]}
                labelKey="platform"
                title="Creator Distribution by Platform"
              />
            </div>
          </Card>
          {/* Add more dashboard cards and content here */}
        </div>
      )}
    </div>
  );
}

type DataItem = {
  city?: string;
  platform?: string;
  value: number;
  percentage: string;
};
