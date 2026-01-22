"use client";
import { AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, lazy, Suspense } from "react";
// import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "@/components/brand/Loader";
import ShortlistedApplications from "@/components/brand/ShortlistedApplications";
import { CampaignManagerGridSkeleton } from "@/components/Skeletons/CampaignManagerGridSkeleton";

import { Info } from "lucide-react";

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
    <CampaignManagerGridSkeleton count={6} />
  </div>
);
export default function Page() {
  const [activeTab, setActiveTab] = useState("Waiting Approval");
  // const { data: campaigns, isLoading, isError } = useFindAiCampaignsList();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const TabInfo = ({ text }: { text: string }) => (
    <span className="relative group inline-flex">
      <Info
        size={14}
        className="ml-1 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
      />

      <span className="pointer-events-none absolute z-50 hidden group-hover:block w-64 rounded-md bg-black px-3 py-2 text-xs text-white shadow-lg -top-2 left-5">
        {text}
      </span>
    </span>
  );

  return (
    <AnimatePresence mode="wait">
      <Tabs defaultValue="Waiting Approval" onValueChange={handleTabChange} className="dark:bg-background h-full">
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full">
            <TabsTrigger
              value="Waiting Approval"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              <span className="flex items-center gap-1">
                Campaign Applications
                {/* <TabInfo text="This section shows all campaign collaborations that need your action — review applications, send offers, or reject creators." /> */}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="active"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              <span className="flex items-center gap-1">
                Active Collaboration
                {/* <TabInfo text="This section shows ongoing campaign collaborations where creators are working and you can review their submitted work." /> */}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              <span className="flex items-center gap-1">
                Completed Collaboration
                {/* <TabInfo text="This section shows campaign collaborations that have been marked as completed by the brand." /> */}
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

        <TabsContent value="active" className="w-full mt-0  pt-5 md:pt-8 mb-5 md:mb-10 dark:bg-background">
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
