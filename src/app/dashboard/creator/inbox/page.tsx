"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence } from "framer-motion";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TabLoading } from "@/components/inbox/TabLoading";
import { useCollaborationStatusDetails } from "@/hooks/useQueryCampaigns";
import { Collaboration } from "@/types/Collaboration";

const InboxCard = dynamic(() => import("@/components/inbox/InboxCard"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[64px] rounded-xl mt-4 animate-pulse bg-gray-200" />
  ),
});

const Page = () => {
  const [activeTab, setActiveTab] = useState("");

  const { data: campaignsData } = useCollaborationStatusDetails(activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AnimatePresence mode="wait">
      <Tabs defaultValue="" onValueChange={handleTabChange}>
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger
              value="Pending"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Pending Opportunities
            </TabsTrigger>
            <TabsTrigger
              value="Active"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Ongoing Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="Completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Completed Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="Payment"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Payment
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="Active" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Active" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Active"}
                        title={
                          collaboration?.campaignId?.campaignName || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignPost ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Active" &&
              (!campaignsData?.collaborations ||
                campaignsData.collaborations.length === 0) && (
                <div className="text-center p-10">
                  No active collaborations found.
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Pending" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Pending" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Pending"}
                        title={
                          collaboration?.campaignId?.campaignName || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignPost ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Pending" &&
              (!campaignsData?.collaborations ||
                campaignsData.collaborations.length === 0) && (
                <div className="text-center p-10">
                  No pending collaborations found.
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Completed" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Completed" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Completed"}
                        title={
                          collaboration?.campaignId?.campaignName || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignPost ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Completed" &&
              (!campaignsData?.collaborations ||
                campaignsData.collaborations.length === 0) && (
                <div className="text-center p-10">
                  No completed collaborations found.
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Payment" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Payment" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Payment"}
                        title={
                          collaboration?.campaignId?.campaignName || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignPost ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Payment" &&
              (!campaignsData?.collaborations ||
                campaignsData.collaborations.length === 0) && (
                <div className="text-center p-10">
                  No payment collaborations found.
                </div>
              )}
          </Suspense>
        </TabsContent>
      </Tabs>

      {activeTab == "" && (
        <div className="w-full flex flex-col items-center justify-center  min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center">
          <Image
            src="/images/Inbox/intro.png"
            alt=""
            width={280}
            height={280}
            className="mx-auto"
            priority
          />
          <div className="space-y-2 sm:space-y-3 max-w-xl mx-auto">
            <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900">
              Welcome to the inbox. <br /> Collaboration opportunities from
              brands will appear here.
            </h3>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Page;
