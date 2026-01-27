"use client";
import { AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, lazy, Suspense, useEffect } from "react";
import Loader from "@/components/brand/Loader";
import ShortlistedApplications from "@/components/brand/ShortlistedApplications";
import { CampaignManagerGridSkeleton } from "@/components/Skeletons/CampaignManagerGridSkeleton";

import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useBrandNotificationCounts } from "@/hooks/useNotificationCounts";
import ApplicationsReceivedSkeleton from "@/components/Skeletons/ApplicationsReceivedSkeleton";

const AIFindTab = lazy(() => import("@/components/brand/AIFindTab"));
const ApplicationsReceived = lazy(() => import("@/components/brand/ApplicationsReceived"));
const ActiveCollaborationTab = lazy(
  () => import("@/components/brand/ActiveCollaborationTab")
);
const PendingCollaborationTab = lazy(
  () => import("@/components/brand/PendingCollaborationTab")
);
const CompletedCollaborationTab = lazy(
  () => import("@/components/brand/CompletedCollaborationTab")
);

// Loading component for Suspense fallback
const TabLoading = () => (
  <div className="w-full mt-5 sm:mt-8 mb-5 md:mb-10">
    <ApplicationsReceivedSkeleton />
  </div>
);

export default function Page() {
  const DEFAULT_TAB = "Waiting Approval";
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  const { data: notificationCounts } = useBrandNotificationCounts();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const VALID_TABS = [
    "Waiting Approval",
    "active",
    "completed",
  ];

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab && VALID_TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const TabInfo = ({ text }: { text: string }) => (
    <span className="relative inline-flex items-center ml-0.5">
      <span className="group relative">
        <Info
          size={14}
          className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        />

        <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute z-[100] w-56 sm:w-64 rounded-lg bg-gray-900 dark:bg-gray-800 px-3 py-2.5 text-xs leading-relaxed text-white shadow-xl bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-normal after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-gray-900 dark:after:border-t-gray-800">
          {text}
        </span>
      </span>
    </span>
  );


  return (
    <AnimatePresence mode="wait">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="dark:bg-background h-full">
        <div className="overflow-visible sticky top-0 z-10 bg-background pb-2">
          <TabsList className="w-full !overflow-visible relative">
            <TabsTrigger
              value="Waiting Approval"
              className="relative h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm overflow-visible"
            >
              <span className="flex items-center gap-1.5">
                <span>Campaign Applications</span>
                <TabInfo text="This section shows all campaign collaborations that need your action — review applications, send offers, or reject creators." />
                {notificationCounts?.allOpportunities > 0 && (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full z-20">
                    {notificationCounts.allOpportunities}
                  </span>
                )}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="active"
              className="relative h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm overflow-visible"
            >
              <span className="flex items-center gap-1.5 ">
                <span>Active Collaboration</span>
                <TabInfo text="This section shows ongoing campaign collaborations where creators are working and you can review their submitted work." />
                {notificationCounts?.ongoingCollaboration > 0 && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full z-20">
                    {notificationCounts.ongoingCollaboration}
                  </span>
                )}
              </span>

            </TabsTrigger>

            <TabsTrigger
              value="completed"
              className="relative h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm overflow-visible"
            >
              <span className="flex items-center gap-1.5">
                <span>Completed Collaboration</span>
                <TabInfo text="This section shows campaign collaborations that have been marked as completed." />
                {notificationCounts?.completedCollaboration > 0 && (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full">
                    {notificationCounts.completedCollaboration}
                  </span>
                )}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="Waiting Approval" className="w-full mt-5 sm:mt-8 mb-5 md:mb-10 dark:bg-background">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Waiting Approval" && <ApplicationsReceived />}
          </Suspense>
        </TabsContent>

        <TabsContent value="shortlisted" className="w-full mt-5 sm:mt-8 mb-5 md:mb-10 dark:bg-background">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "shortlisted" && <ShortlistedApplications />}
          </Suspense>
        </TabsContent>

        <TabsContent value="active" className="w-full mt-0 pt-5 md:pt-8 mb-5 md:mb-10 dark:bg-background">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "active" && <ActiveCollaborationTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="offered" className="w-full mt-0 dark:bg-background pt-5 md:pt-8 mb-5 md:mb-10">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "offered" && <PendingCollaborationTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="completed" className="w-full mt-0 dark:bg-background pt-5 md:pt-8 mb-5 md:mb-10">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "completed" && <CompletedCollaborationTab />}
          </Suspense>
        </TabsContent>
      </Tabs>
    </AnimatePresence>
  );
}