"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence } from "framer-motion";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TabLoading } from "@/components/inbox/TabLoading";

const InboxCard = dynamic(() => import("@/components/inbox/InboxCard"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[64px] rounded-xl mt-4 animate-pulse bg-gray-200" />
  ),
});

const Page = () => {
  const [activeTab, setActiveTab] = useState("");
  // const { data: campaigns, isLoading, isError } = useFindAiCampaignsList();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <AnimatePresence mode="wait">
      <Tabs defaultValue="" onValueChange={handleTabChange}>
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger
              value="ongoing"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Ongoing Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Pending Opportunities
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Completed Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Payment
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="ongoing" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "ongoing" && (
              <InboxCard
                status={"ongoing"}
                title={
                  "We are seeking a passionate Fitness Black Female Influencer"
                }
                image={"https://avatar.iran.liara.run/public/boy"}
              />
            )}
          </Suspense>
        </TabsContent>

        <TabsContent value="pending" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "pending" && (
              <InboxCard
                status={"pending"}
                title={
                  "We are seeking a passionate Fitness Black Female Influencer"
                }
                image={"https://avatar.iran.liara.run/public/boy"}
              />
            )}
          </Suspense>
        </TabsContent>

        <TabsContent value="completed" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "completed" && (
              <InboxCard
                status={"completed"}
                title={
                  "We are seeking a passionate Fitness Black Female Influencer"
                }
                image={"https://avatar.iran.liara.run/public/boy"}
              />
            )}
          </Suspense>
        </TabsContent>

        <TabsContent value="payment" className="w-full mt-5 sm:mt-8 px-5">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "payment" && (
              <InboxCard
                status={"payment"}
                title={
                  "We are seeking a passionate Fitness Black Female Influencer"
                }
                image={"https://avatar.iran.liara.run/public/boy"}
              />
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
