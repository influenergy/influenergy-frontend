"use client";
import { AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, lazy, Suspense } from "react";
// import { useFindAiCampaignsList } from "@/hooks/useFindAi";
import { Loader2 } from "lucide-react";

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
const TabLoading = () => (
  <div className="h-[50vh] w-full flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <p className="text-gray-600">Loading content...</p>
    </div>
  </div>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState("ai");
  // const { data: campaigns, isLoading, isError } = useFindAiCampaignsList();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AnimatePresence mode="wait">
      <Tabs defaultValue="ai" onValueChange={handleTabChange}>
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger
              value="ai"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              <span className="flex items-center gap-1">
                <span>AI Find</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Active Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Pending Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs sm:text-sm md:text-base"
            >
              Completed Collaboration
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="ai" className="w-full mt-5 sm:mt-8">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "ai" && <AIFindTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="active" className="w-full mt-5 sm:mt-8">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "active" && <ActiveCollaborationTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="pending" className="w-full mt-5 sm:mt-8">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "pending" && <PendingCollaborationTab />}
          </Suspense>
        </TabsContent>

        <TabsContent value="completed" className="w-full mt-5 sm:mt-8">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "completed" && <CompletedCollaborationTab />}
          </Suspense>
        </TabsContent>
      </Tabs>
    </AnimatePresence>
  );
}

/**
  - ai find , pending collaboration, active collaboration, completed collaboration
  - profile card
  - profile card details
  - send collaboaration request
  - wallet api
 * */
