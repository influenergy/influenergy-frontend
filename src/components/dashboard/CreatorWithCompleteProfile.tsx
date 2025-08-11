import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { userApi } from "@/services/userServices";
import CreatorWithCompleteProfileSkeleton from "../Skeletons/CreatorWithCompleteProfileSkeleton";

interface CreatorWithCompleteProfileProps {
  fullName?: string;
}

function CreatorWithCompleteProfile({ fullName }: CreatorWithCompleteProfileProps) {
  const [improvementLoading, setImprovementLoading] = useState<boolean>(false);
  const [improvementText, setImprovementText] = useState<string | null>(null);
  const [collaborationCount, setCollaborationCount] = useState<number>(0);

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
  }, []);

  if (improvementLoading) {
    return <CreatorWithCompleteProfileSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-col gap-6 pr-4">
      {/* Welcome Section */}
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
            Your creator dashboard is ready. Start exploring opportunities!
          </p>
        </div>
      </Card>

      {/* AI Recommendation Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_2fr] gap-6 w-full">
        <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            AI Profile Recommendation
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
              <h1 className="font-medium text-lg">How to Improve</h1>
              <span>
                {improvementLoading ? (
                  <span>Loading suggestions...</span>
                ) : improvementText ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {improvementText
                      .split("\n")
                      .map((line) => line.replace(/^\*\s*/, "").trim())
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full h-full">
          <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Recently Worked With:
            </h2>
            <div className="flex flex-col gap-4 justify-between flex-1">
              {["Anthony Macky", "Jennifer Jane", "Alexander John", "Lisa Jacob"].map((name, idx) => (
                <div key={idx} className="flex items-center gap-4 mt-2">
                  <Image src="/brandIcon.jpg" alt={name} width={70} height={70} className="rounded-full" />
                  <span className="text-lg text-gray-600 dark:text-gray-300">{name}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-4 justify-between h-full">
              {[
                { label: "Ongoing Collaboration", count: "05" },
                { label: "Pending Opportunities", count: "05" },
                { label: "Completed Collaboration", count: "05" },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="flex flex-col items-start gap-4 px-2 py-5 bg-white dark:bg-gray-800 transition-colors duration-300"
                >
                  <p className="text-xl font-normal text-gray-700 dark:text-gray-300">{item.label}</p>
                  <span className="text-5xl text-blue-600 dark:text-blue-400 font-semibold">{item.count}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Videos */}
      <Card className="p-6 w-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-gray-900 dark:text-white">Recent Videos</h1>
        <div></div>
      </Card>
    </div>
  );
}

export default CreatorWithCompleteProfile;
