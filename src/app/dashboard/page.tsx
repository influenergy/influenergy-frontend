"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useAppSelector } from "@/store";
import { useUserDetails } from "@/hooks/useUser";
import { Loader } from "@/components/common/Loader";
import { Info } from "lucide-react";
import Image from "next/image";
import { userApi } from "@/services/userServices";
import React, { useEffect, useState } from "react";
import PieChart from "@/components/brand/PieChart";


export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const userType = useAppSelector((state) => state.auth.userType);
  const { data: userDetails, isLoading, error } = useUserDetails();

  // Add state for improvement text
  const [improvementText, setImprovementText] = useState<string | null>(null);
  const [improvementLoading, setImprovementLoading] = useState(false);
  const [collaborationCount, setCollaborationCount] = useState(0);
  const [regionAnalysis, setRegionAnalysis] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (userType === "brand") {
      userApi.getRegionAnalysis().then((data) => {
        console.log(data.regionAnalysis, 'data')
        setRegionAnalysis(data.regionAnalysis);
      });
    }
  }, [userType]);

  useEffect(() => {
    if (
      userType === "creator" &&
      userDetails?.data?.isProfileCompleted &&
      userDetails?.data?.profileIcon
    ) {
      setImprovementLoading(true);
      fetchImprovementText().then((text) => {
        setImprovementText(text.data || "");
        setCollaborationCount(text?.collaborationCount)
        setImprovementLoading(false);
      });
    }
  }, [userType, userDetails]);

  const fetchImprovementText = async () => {
    try {
      const improvementText = await userApi.getImprovementText();
      return improvementText;
    } catch (error) {
      console.error("Error fetching improvement text:", error);
      return "Unable to fetch improvement suggestions at this time.";
    }
  }

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
    <div className="p-2 px-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {userType === "creator" ? (
        <>
          {/* Case 1: Profile not completed and no profile image */}
          {!userDetails?.data?.isProfileCompleted &&
            !userDetails?.data?.profileIcon && (
              <>
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <p className="text-gray-700 font-medium">
                      Please fill the questionnaire and upload profile image to
                      get verified
                    </p>
                  </div>
                  <Info size={24} className="text-red-600 shrink-0" />
                </div>
                <Card className="p-6 bg-violet-100 border border-violet-400 text-black mt-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Complete Your Profile
                  </h2>
                  <p className="text-muted-foreground">
                    Please complete the questionnaire and upload a profile image
                    to personalize your dashboard experience and help us match
                    you with the right brands.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Link href="/questionnaire">
                      <Button>Go to Questionnaire</Button>
                    </Link>
                  </div>
                </Card>
              </>
            )}

          {/* Case 2: Profile not completed but has profile image */}
          {!userDetails?.data?.isProfileCompleted &&
            userDetails?.data?.profileIcon && (
              <>
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <p className="text-gray-700 font-medium">
                      Please fill the questionnaire to get verified
                    </p>
                  </div>
                  <Info size={24} className="text-red-600 shrink-0" />
                </div>
                <Card className="p-6 bg-violet-100 border border-violet-400 text-black mt-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Complete Your Preferences
                  </h2>
                  <p className="text-muted-foreground">
                    Please complete the questionnaire to personalize your
                    dashboard experience and help us match you with the right
                    brands.
                  </p>
                  <Link href="/questionnaire">
                    <Button className="mt-4">Go to Questionnaire</Button>
                  </Link>
                </Card>
              </>
            )}

          {/* Case 3: Profile completed but no profile image */}
          {userDetails?.data?.isProfileCompleted &&
            !userDetails?.data?.profileIcon && (
              <>
                <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <p className="text-gray-700 font-medium">
                      Please upload profile image to get verified
                    </p>

                  </div>
                  <Info size={24} className="text-red-600 shrink-0" />
                </div>
                <Card className="p-6 bg-violet-100 border border-violet-400 text-black mt-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Add Your Profile Image
                  </h2>
                  <p className="text-muted-foreground">
                    Please upload a profile image to complete your profile and
                    get verified.
                  </p>
                  <Link href="/user-profile">
                    <Button className="mt-4">Upload Profile Image</Button>
                  </Link>
                </Card>
              </>
            )}

          {/* Case 4: Profile completed and has profile image */}
          {userDetails?.data?.isProfileCompleted &&
            userDetails?.data?.profileIcon && (
              <div className="flex flex-col lg:flex-row gap-6 pr-4">
                <Card className="p-6 w-full flex flex-col">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Welcome Back, {userDetails?.data?.fullName || "Creator"}!
                    </h2>
                    <p className="text-muted-foreground">
                      Your creator dashboard is ready. Start exploring
                      opportunities!
                    </p>
                  </div>
                  {/* Video player for demo video */}
                  <div className="mt-6 flex-1">
                    <video
                      controls
                      width="100%"
                      height="100%"
                      style={{ borderRadius: '12px', height: '100%', maxHeight: '400px', background: '#000' }}
                    >
                      {/* <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" /> */}
                      <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Card>
                <Card className="p-6 w-full flex flex-col">
                  <h2 className="text-xl font-semibold mb-2">
                    AI Profile Recommendation
                  </h2>

                  <div className="mt-6 bg-purple-gradient flex rounded-xl p-6 text-white flex-col gap-8 flex-1">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-4">
                        <h1 className="font-medium text-lg" >Total Collaboration</h1>
                        <span className="text-5xl font-medium">{collaborationCount}</span>
                      </div>
                      <div>
                        <Image src="/flex_user.svg" alt="flex user" className="w-full h-full" width={40} height={40} />
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col">
                      <h1 className="font-medium text-lg">How to Improve</h1>
                      <span>
                        {improvementLoading ? (
                          <span>Loading suggestions...</span>
                        ) : improvementText ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {improvementText
                              .split('\n')
                              .map(line => line.replace(/^\*\s*/, '').trim())
                              .filter(line => line.length > 0)
                              .map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                          </ul>
                        ) : (
                          <span>No suggestions available.</span>
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
                {/* Add more dashboard cards and content here */}
              </div>
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
