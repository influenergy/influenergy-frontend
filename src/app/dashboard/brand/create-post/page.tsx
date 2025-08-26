"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ProductUrlModal } from "@/components/questionnaire/ProductUrlModal";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText } from "lucide-react";

// Dynamically import the PostQuestionnaire component with no SSR
const PostQuestionnaire = dynamic(
  () => import("@/components/questionnaire/PostQuestionnaire"),
  { ssr: false } // This ensures the component only renders on the client side
);

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [generatedData, setGeneratedData] = useState<Record<string, unknown> | null>(null);

  const handleURLModalClose = () => {
    setShowUrlModal(false);
    // setShowQuestionnaire(true);
  };

  const handleAIGenerationSuccess = (campaignData: Record<string, unknown>) => {
    console.log(campaignData)
    setGeneratedData(campaignData);
    setShowModal(false);
    setShowQuestionnaire(true);
  };

  const handleSkipAIGeneration = () => {
    setShowModal(false);
    setShowQuestionnaire(true);
  };

  // If user closes modal without generating, show questionnaire
  useEffect(() => {
    if (!showModal && !showQuestionnaire) {
      setShowQuestionnaire(true);
    }
  }, [showModal, showQuestionnaire]);

  return (
    <div className="w-full h-full flex justify-center dark:bg-background">
      {showModal && (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-background">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center dark:bg-gray-300">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Campaign
                </h2>
                <p className="text-gray-600">
                  Choose how you&apos;d like to start creating your campaign
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => {
                    console.log("clickedddd")
                    setShowUrlModal(true)
                    // setShowModal(false)
                  }}
                  className="w-full bg-primary hover:bg-transparent hover:text-primary text-white py-3"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate with AI from Product URL
                </Button>

                <Button
                  onClick={handleSkipAIGeneration}
                  variant="outline"
                  className="w-full py-3"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Start from Scratch
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQuestionnaire && (
        <PostQuestionnaire
          mode="create"
          defaultValues={generatedData || {}}
          startAtReview={Boolean(generatedData)}
        />
      )}

      <ProductUrlModal
        isOpen={showUrlModal}
        onClose={handleURLModalClose}
        onSuccess={handleAIGenerationSuccess}
      />
    </div>
  );
};

export default Page;
