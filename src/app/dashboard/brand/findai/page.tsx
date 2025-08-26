"use client";
import { AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, lazy, Suspense } from "react";
// import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import Loader from "@/components/brand/Loader";

const AIFindTab = lazy(() => import("@/components/brand/AIFindTab"));
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
const TabLoading = () => <Loader />;

export default function Page() {
  const [activeTab, setActiveTab] = useState("ai");
  // const { data: campaigns, isLoading, isError } = useFindAiCampaignsList();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AnimatePresence mode="wait">
      <Tabs defaultValue="ai" onValueChange={handleTabChange} className="dark:bg-background h-full">
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full ">
            <TabsTrigger
              value="ai"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm "
            >
              <span className="flex items-center gap-1">
                <span>AI Find</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Pending Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Active Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Completed Collaboration
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="ai" className="w-full mt-5 sm:mt-8 mb-5 md:mb-10 dark:bg-background">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "ai" && <AIFindTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="active" className="w-full mt-0  pt-5 md:pt-8 mb-5 md:mb-10 dark:bg-background">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "active" && <ActiveCollaborationTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="pending" className="w-full mt-0 dark:bg-background pt-5 md:pt-8 mb-5 md:mb-10">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "pending" && <PendingCollaborationTab />}
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
