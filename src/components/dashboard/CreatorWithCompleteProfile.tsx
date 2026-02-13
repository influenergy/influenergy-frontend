"use client";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { userApi } from "@/services/userServices";
import CreatorWithCompleteProfileSkeleton from "../Skeletons/CreatorWithCompleteProfileSkeleton";
import total_campaigns from "../../../public/images/total_campaigns.svg"
import { CircleCheckBig, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useRouter } from "next/navigation";
import CampaignCard from "../brand/CampaignCard";
import CampaignSkeleton from "../Skeletons/CampaignSkeleton";


type CampaignBrief = {
  _id: string;
  campaignTitle?: string;
  campaignImage?: string;
  campaignDescription?: string;
};

type CollaborationItem = {
  _id: string;
  status: "Active" | "Offered" | "Completed" | "Pending";
  campaignId: CampaignBrief;
};


interface CreatorWithCompleteProfileProps {
  fullName?: string;
}


interface Collaboration {
  _id: string;
  brandName: string;
  status: string;
  videos: Array<{ link: string, status: string }>;
  campaignImage?: string;
}


function CreatorWithCompleteProfile({ fullName }: CreatorWithCompleteProfileProps) {
  const [improvementLoading, setImprovementLoading] = useState<boolean>(false);
  // const [improvementText, setImprovementText] = useState<string | null>(null);
  // const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  // const [collaborationCount, setCollaborationCount] = useState<number>(0);


  // const videoSrc =
  //   "https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4";

  // const userProfile = useAppSelector(selectUser);
  // const user = useAppSelector(selectUser);

  // const fetchImprovementText = async () => {
  //   try {
  //     const improvementText = await userApi.getImprovementText();
  //     return improvementText;
  //   } catch (error) {
  //     console.error("Error fetching improvement text:", error);
  //     return "Unable to fetch improvement suggestions at this time.";
  //   }
  // };

  const router = useRouter();


  // setImprovementLoading(true);
  // fetchImprovementText().then((text) => {
  //   setImprovementText(text.data || "");
  //   setCollaborationCount(text?.collaborationCount);

  //   setImprovementLoading(false);
  // });

  const { data: counts = { Pending: 0, Active: 0, Completed: 0 } } = useQuery({
    queryKey: ["creator-history"],
    queryFn: async () => {
      const res = await userApi.getCreatorHistoryData();
      return res?.data ?? { Pending: 0, Active: 0, Completed: 0 };
    },
    staleTime: 1000 * 60 * 2, // 2 minutes cache
    refetchOnWindowFocus: true,
  });


  const {
    data: collaborations = [],
    isLoading,
    isError,
  } = useQuery<CollaborationItem[]>({
    queryKey: ["collaborations", 3],
    queryFn: async () => {
      const res = await postApi.getAllCollaborations(3);
      return res?.collaborations?.collaborations ?? [];
    },
    staleTime: 1000 * 60 * 1, // 1 min cache
    refetchOnWindowFocus: true,
  });


  const campaigns = useMemo(
    () => collaborations.filter(c => c.status === "Active"),
    [collaborations]
  );

  const offers = useMemo(
    () => collaborations.filter(c => c.status === "Offered"),
    [collaborations]
  );


  const handleViewDetails = useCallback((campaignId: string) => {
    router.push(`/dashboard/creator/posts/${campaignId}`);
  }, [router]);


  const handleNewOffer = useCallback(() => {
    router.push("/dashboard/creator/inbox?tab=Waiting Approval");
  }, [router]);



  if (isLoading) {
    return <CreatorWithCompleteProfileSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-col gap-6 pr-4">
      {/* Welcome Section */}
      <div className={`grid grid-cols-1 gap-4 w-full`}>
        {/* <Card className="p-6 w-full md:flex gap-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="mb-2 md:mb-0 flex items-center cursor-pointer" onClick={() => setIsOpen(true)}>
            <video
            controls
              width="100%"
              height="100%"
              style={{
                borderRadius: "12px",
                height: "100%",
                maxHeight: "100px",
                background: "#000",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
              >
                <video
                  controls
                  autoPlay
                  style={{ width: "100%", borderRadius: "12px" }}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
                <button
                  className="absolute top-2 right-2 text-white text-2xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Welcome Back, {fullName || "Creator"}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your {userProfile?.userType || 'creator'} dashboard is ready.<br /> Start exploring opportunities!
            </p>
          </div>
        </Card>

        {userProfile?.userType === "UGC" && !userProfile?.badge && <FeaturedCard handleFeature={handleFeature} />} */}
        <div className="border border-gray-200 rounded-lg px-4 py-4 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Applications",
                count: counts.Pending,
                icon: (
                  <Image
                    src={total_campaigns}   // public/megaphone.png
                    alt="Applications"
                    width={32}
                    height={32}
                  />
                ),
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
              },
              // {
              //   label: "Total Applicants",
              //   count: 20,
              //   icon: <Contact size={32} />,
              //   iconBg: "bg-purple-100",
              //   iconColor: "text-purple-600",
              // },
              {
                label: "In progress",
                count: counts.Active,
                icon: <Activity size={32} />,
                iconBg: "bg-indigo-100",
                iconColor: "text-indigo-600",
              },
              {
                label: "Completed",
                count: counts.Completed,
                icon: <CircleCheckBig size={32} />,
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              },
              // {
              //   label: "Total Spending",
              //   count: 20,
              //   icon: <DollarSign size={32} />,
              //   iconBg: "bg-yellow-100",
              //   iconColor: "text-yellow-600",
              // },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                {/* LEFT */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-normal text-gray-800">
                    {item.label}
                  </p>
                  <span className="text-2xl font-semibold text-black">
                    {String(item.count).padStart(2, "0")}
                  </span>
                </div>

                {/* RIGHT ICON */}
                <div
                  className={`flex items-center justify-center
              w-14 h-14
              rounded-xl ${item.iconBg} ${item.iconColor}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white shadow-md">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-lg font-semibold text-gray-900">
              Ongoing Collaborations
            </h1>
            <p
              onClick={() => router.push("/dashboard/creator/inbox?tab=Active")}
              className="text-primary text-base font-semibold cursor-pointer hover:underline"
            >
              View All
            </p>
          </div>

          {/* LOADING STATE */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, idx) => (
                <CampaignSkeleton key={idx} />
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {!isLoading && isError && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-red-500 font-medium">
                Something went wrong
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Unable to load active collaborations
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && !isError && campaigns.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                📭
              </div>
              <p className="text-sm font-medium text-gray-700">
                No ongoing collaborations
              </p>
              <p className="text-xs text-gray-500 mt-1">
                New collaborations will appear here once active
              </p>
            </div>
          )}

          {/* DATA STATE */}
          {!isLoading && !isError && campaigns.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign.campaignId}
                  displayStatus="Ongoing"
                  user="creator"
                  onActionClick={() => handleViewDetails(campaign.campaignId._id)}
                // actionLabel={{
                //   published: "View Applications",
                //   draft: "View Applications",
                // }}
                />
              ))}
            </div>
          )}
        </div>



        <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white shadow-md">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-lg font-semibold text-gray-900">
              New Offers
            </h1>
            <p
              onClick={() => router.push("/dashboard/creator/inbox")}
              className="text-primary text-base font-semibold cursor-pointer hover:underline"
            >
              View All
            </p>
          </div>

          {/* LOADING STATE */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, idx) => (
                <CampaignSkeleton key={idx} />
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {!isLoading && isError && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-red-500 font-medium">
                Something went wrong
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Unable to load active collaborations
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && !isError && offers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                📭
              </div>
              <p className="text-sm font-medium text-gray-700">
                No new offers
              </p>
              <p className="text-xs text-gray-500 mt-1">
                New offes will appear here when there is any
              </p>
            </div>
          )}

          {/* DATA STATE */}
          {!isLoading && !isError && offers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.slice(0, 3).map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign.campaignId}
                  displayStatus="Offered"
                  user="creator"
                  onActionClick={() => handleNewOffer()}
                />
              ))}
            </div>
          )}
        </div>


      </div>

      {/* AI Recommendation Section */}


      {/* Recent Videos */}

    </div>
  );
}

export default CreatorWithCompleteProfile;
