"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { userApi } from "@/services/userServices";
import CreatorWithCompleteProfileSkeleton from "../Skeletons/CreatorWithCompleteProfileSkeleton";
import { selectUser, useAppDispatch, useAppSelector } from "@/store";
import FeaturedCard from "./FeaturedCard";
import FeaturedModal from "./FeaturedModal";


interface CreatorWithCompleteProfileProps {
  fullName?: string;
}


interface Collaboration {
  _id: string;
  brandName: string;
  status: string;
  videos: Array<{ link: string, status: string }>;
  campaignPost?: string;
}


function CreatorWithCompleteProfile({ fullName }: CreatorWithCompleteProfileProps) {
  const [improvementLoading, setImprovementLoading] = useState<boolean>(false);
  const [improvementText, setImprovementText] = useState<string | null>(null);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [counts, setCounts] = useState<{ Pending: number; Active: number; Completed: number }>({ Pending: 0, Active: 0, Completed: 0 });
  const [collaborationCount, setCollaborationCount] = useState<number>(0);

  const [open, setOpen] = useState(false);

  const userProfile = useAppSelector(selectUser);

  console.log("User Profile in CreatorWithCompleteProfile:", userProfile);
  // const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch()

  const fetchImprovementText = async () => {
    try {
      const improvementText = await userApi.getImprovementText();
      return improvementText;
    } catch (error) {
      console.error("Error fetching improvement text:", error);
      return "Unable to fetch improvement suggestions at this time.";
    }
  };

  useEffect(() => {
    setImprovementLoading(true);
    fetchImprovementText().then((text) => {
      setImprovementText(text.data || "");
      setCollaborationCount(text?.collaborationCount);

      setImprovementLoading(false);
    });

    userApi
      .getCreatorHistoryData()
      .then((res) => {
        if (res?.data) {

          // dispatch(
          //   updatePendingCollaborationCount(res?.data.counts.Pending || 0)
          // );
          setCollaborations(res.data.collaborations || []);
          setCounts(res.data.counts || { Pending: 0, Active: 0, Completed: 0 });
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  if (improvementLoading) {
    return <CreatorWithCompleteProfileSkeleton />;
  }

  const handleFeature = async () => {
    setOpen(true)
  }

  return (
    <div className="flex flex-col lg:flex-col gap-6 pr-4">
      {/* Welcome Section */}
      <div className={`grid grid-cols-1  ${userProfile?.userType === "UGC" && !userProfile?.badge ? "md:grid-cols-1 lg:grid-cols-[2fr_2fr]" : "md:grid-cols-1 lg:grid-cols-1"
        } gap-6 w-full`}>
        <Card className="p-6 w-full flex gap-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div>
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
              <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Welcome Back, {fullName || "Creator"}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your creator dashboard is ready.<br /> Start exploring opportunities!
            </p>
          </div>
        </Card>

        {userProfile?.userType === "UGC" && !userProfile?.badge && <FeaturedCard handleFeature={handleFeature} />}
      </div>

      {/* AI Recommendation Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_2fr] gap-6 w-full">
        <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            AI Recommendations
          </h2>

          <div className="mt-6 bg-purple-gradient flex rounded-xl p-6 text-white flex-col gap-8 flex-1">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-4">
                <h1 className="font-medium text-lg">Total Collaboration</h1>
                <span className="text-5xl font-medium">{collaborationCount}</span>
              </div>
              <div>
                <Image src="/flex_user.svg" alt="flex user" width={50} height={40} />
              </div>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="font-medium text-lg">How You Can Improve</h1>
              <span>
                {improvementLoading ? (
                  <span>Loading suggestions...</span>
                ) : improvementText ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {improvementText
                      .split("\n")
                      .map((line) => line.replace(/^(\*|\-|\d+\.)\s*/, "").trim())
                      .filter((line) => line.length > 0)
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

        {/* Recently Worked With + Stats */}
        <div className={`grid grid-cols-1  ${counts?.Completed === 0 ?
          'md:grid-cols-1 lg:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-2'
          } gap-6 w-full h-full`}>
          {counts?.Completed > 0 && <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Recently Worked With:
            </h2>
            <div className="flex flex-col gap-4 flex-1 overflow-auto max-h-[400px]">
              {collaborations.map((collab) => (
                collab.status === "Completed" && <div key={collab._id} className="flex items-center gap-4 mt-2">
                  <Image src={collab.campaignPost || "/brandIcon.jpg"} alt={collab.brandName} width={70} height={70} className="rounded-full" />
                  <span className="text-lg text-gray-600 dark:text-gray-300">{collab.brandName}</span>
                </div>
              ))}
            </div>
          </Card>}

          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-4 justify-between h-full">
              {counts && [
                { label: "Ongoing Collaboration", count: counts.Active },
                { label: "Pending Opportunities", count: counts.Pending },
                { label: "Completed Collaboration", count: counts.Completed },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="flex flex-col items-start gap-4 px-2 py-5 bg-white dark:bg-gray-800 transition-colors duration-300"
                >
                  <p className="text-xl font-normal text-gray-700 dark:text-gray-300">{item.label}</p>
                  <span className="text-5xl text-blue-600 dark:text-blue-400 font-semibold">{item.count < 10 ? '0' + item.count : item.count}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Videos */}
      {collaborations.length > 0 && <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-gray-900 dark:text-white mb-4">Recent Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {collaborations
            .flatMap((c) => c.videos)
            .slice(0, 6)
            .map((video, idx) => {
              const isVideo = video.link?.endsWith(".mp4"); // basic check for direct video files

              return (
                video.status === "Approved" && <div key={idx} className="relative rounded-lg overflow-hidden">
                  {video.status === "Approved" && (
                    isVideo ? (
                      <video
                        controls
                        className="rounded-lg w-full max-h-48 bg-black"
                      >
                        <source src={video.link} type="video/mp4" />
                      </video>
                    ) : (
                      <a
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative w-full h-48"
                      >
                        <Image
                          src="/video-static-img.png"
                          alt="Video Thumbnail"
                          fill
                          className="rounded-lg object-cover cursor-pointer"
                        />
                      </a>
                    )
                  )}
                </div>
              );
            })}
        </div>

      </Card>}

      <FeaturedModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default CreatorWithCompleteProfile;
