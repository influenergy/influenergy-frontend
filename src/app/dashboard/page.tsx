"use client";
import { Card } from "@/components/ui/card";

import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useAppSelector } from "@/store";
import { useUserDetails } from "@/hooks/useUser";
import { Loader } from "@/components/common/Loader";

import React from "react";
import { isAxiosError } from "axios";
import CreatorWithCompleteProfile from "@/components/dashboard/CreatorWithCompleteProfile";
import NonVerifiedCreatorProfile from "@/components/dashboard/NonVerifiedCreatorProfile";
import BrandDashboard from "@/components/dashboard/BrandDashboard";
import { Button } from "@/components/ui/button";
import FeaturedModal from "@/components/dashboard/FeaturedModal";
import Image from "next/image";


const Levels = [
  {
    key: "level_1",
    title: "Level 1 - Rising Creator",
    img: "/bronze-award.svg",
    color: "#b1b1b1", // Bronze
  },
  {
    key: "level_2",
    title: "Level 2 - Active Creator",
    img: "/gold-award.svg",
    color: "#ffbe4b", // Gold
  },
  {
    key: "level_3",
    title: "Level 3 - Pro Creator",
    img: "/diamond-award.svg",
    color: "#32bdd8", // Diamond / Sky Blue
  },
];


export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const userType = useAppSelector((state) => state.auth.userType);
  const { data: userDetails, isLoading, error } = useUserDetails();
  const [showFeatured, setShowFeatured] = React.useState(false);
  if (!isAuthenticated || !userType) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error, "❌ Axios Error");

    const hasMessageField = (value: unknown): value is { message: string } => {
      return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as Record<string, unknown>).message === "string"
      );
    };

    let errorMessage: string;
    if (isAxiosError(error)) {
      const data = error.response?.data;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (hasMessageField(data)) {
        errorMessage = data.message;
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = (error as Error).message || "Failed to load user details. Please try again later.";
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

  const badgeLevel =
    userDetails?.data?.type === "UGC" && userDetails?.data?.badge
      ? Levels.find((lvl) => lvl.key === userDetails.data.badge)
      : null;


  return (
    <div className="relative p-2 px-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 pr-4 ">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        {badgeLevel && (
          <Button
            onClick={() => setShowFeatured(true)}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border shadow-sm hover:opacity-90 transition"
            style={{
              color: badgeLevel.color,
              borderColor: badgeLevel.color,
              backgroundColor: `${badgeLevel.color}10`, // subtle tint
            }}
          >
            <span
              className="inline-flex items-center justify-center rounded-full px-3 py-1 gap-1 text-xs font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: `${badgeLevel.color}20`,
                color: badgeLevel.color,
              }}
            >
              <Image src={badgeLevel.img} alt="badge" width={20} height={20} />
              {badgeLevel.title.split("-")[1]?.trim()}
            </span>
          </Button>
        )}
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
      <FeaturedModal isOpen={showFeatured} onClose={() => setShowFeatured(false)} showBtn={false} />
    </div>
  );
}

