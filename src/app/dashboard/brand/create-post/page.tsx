"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";


// Dynamically import the PostQuestionnaire component with no SSR
const PostQuestionnaire = dynamic(
  () => import("@/components/questionnaire/PostQuestionnaire"),
  { ssr: false } // This ensures the component only renders on the client side
);

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [generatedData, setGeneratedData] = useState<Record<string, unknown> | null>(null);

  // If user closes modal without generating, show questionnaire
  useEffect(() => {
    if (!showModal && !showQuestionnaire) {
      setShowQuestionnaire(true);
    }
  }, [showModal, showQuestionnaire]);

  // Prefill from sessionStorage when arriving from brand posts AI generation
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("aiGeneratedCampaign");
      if (stored) {
        const parsed = JSON.parse(stored);
        setGeneratedData(parsed);
        setShowModal(false);
        setShowQuestionnaire(true);
        sessionStorage.removeItem("aiGeneratedCampaign");
      }
    } catch { }
  }, []);

  return (
    <div className="w-full h-full flex justify-center dark:bg-background">
     
        <PostQuestionnaire
          mode="create"
          defaultValues={generatedData || {}}
          startAtReview={Boolean(generatedData)}
        />
     

    </div>
  );
};

export default Page;
