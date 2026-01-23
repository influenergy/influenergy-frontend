"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence } from "framer-motion";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TabLoading } from "@/components/inbox/TabLoading";
import { useCollaborationStatusDetails } from "@/hooks/useQueryCampaigns";
import { Collaboration } from "@/types/Collaboration";
import { pendingCollaborationCount, useAppSelector } from "@/store";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

const InboxCard = dynamic(() => import("@/components/inbox/InboxCard"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[64px] rounded-xl mt-4 animate-pulse bg-gray-200" />
  ),
});



const Page = () => {
  const DEFAULT_TAB = "Waiting Approval";
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const pendingCollabCount = useAppSelector(pendingCollaborationCount);
  const {
    data: campaignsData,
    isLoading,
    refetch,
  } = useCollaborationStatusDetails(activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const VALID_TABS = [
    "Waiting Approval",
    "Offer Accepted",
    "Active",
    "Completed",
  ];

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab && VALID_TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <AnimatePresence mode="wait">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col h-full dark:bg-foreground">
        <div className="overflow-auto sticky top-0 z-10 bg-background">
          <TabsList className="w-full">
            <TabsTrigger
              value="Waiting Approval"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm relative"
            >
              <div className="flex items-center gap-1">
                <span>All Opportunities</span>
                {/* {pendingCollabCount !== 0 && (
                  <Badge variant="destructive" className="pointer-events-none">
                    {pendingCollabCount}
                  </Badge>
                )} */}
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="Offer Accepted"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Accepted Collaboration
            </TabsTrigger>

            <TabsTrigger
              value="Active"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Ongoing Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="Completed"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Completed Collaboration
            </TabsTrigger>
            {/* <TabsTrigger
              value="Payment"
              className="h-12 sm:h-16 w-1/2 xs:w-1/4 text-xs md:text-sm"
            >
              Payment
            </TabsTrigger> */}
          </TabsList>
        </div>

        {activeTab == "" && (
          <div className="w-full flex flex-col items-center justify-center  min-h-[calc(100vh-16rem)] px-2 sm:px-4 md:px-6 py-4 sm:py-6 gap-4 sm:gap-6 text-center dark:bg-background flex-1">
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
              alt=""
              width={280}
              height={280}
              className="mx-auto"
              priority
            />
            <div className="space-y-2 sm:space-y-3 max-w-xl mx-auto">
              <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200">
                Welcome to the inbox. <br /> Collaboration opportunities from
                brands will appear here.
              </h3>
            </div>
          </div>
        )}

        {/* Use Suspense with lazy loaded components */}
        <TabsContent value="Active" className="w-full mt-0 px-2 sm:px-4 bg-gray-50 dark:bg-background h-full pb-5 md:pb-10 pt-5 md:pt-8 flex-1">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Active" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:gap-10">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Active"}
                        paymentStatus={collaboration?.paymentStatus}
                        tab={"Active"}
                        title={
                          collaboration?.campaignId?.campaignTitle || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignImage ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                        refetch={refetch}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Active" &&
              (!campaignsData?.collaborations ||
                (campaignsData.collaborations.length === 0 && !isLoading)) && (
                <div className="text-center p-10">
                  <Image
                    src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                    alt=""
                    width={280}
                    height={280}
                    className="mx-auto"
                    priority
                  />
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200  mt-2">
                    Welcome to the inbox. <br /> No ongoing collaborations
                    found.
                  </h3>
                </div>
              )}
          </Suspense>
        </TabsContent>


        <TabsContent value="Offer Accepted" className="w-full mt-0 px-2 sm:px-4 bg-gray-50 dark:bg-background h-full pb-5 md:pb-10 pt-5 md:pt-8 flex-1">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Offer Accepted" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:gap-10">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Offer Accepted"}
                        paymentStatus={collaboration?.paymentStatus}
                        tab={"Offer Accepted"}
                        title={
                          collaboration?.campaignId?.campaignTitle || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignImage ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                        refetch={refetch}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Offer Accepted" &&
              (!campaignsData?.collaborations ||
                (campaignsData.collaborations.length === 0 && !isLoading)) && (
                <div className="text-center p-10">
                  <Image
                    src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                    alt=""
                    width={280}
                    height={280}
                    className="mx-auto"
                    priority
                  />
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200  mt-2">
                    Welcome to the inbox. <br /> No Accepted collaborations
                    found.
                  </h3>
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Waiting Approval" className="w-full mt-0 px-2 sm:px-4 bg-gray-50 pt-5 md:pt-8 flex-1 dark:bg-background h-full">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Waiting Approval" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:gap-10">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Waiting Approval"}
                        paymentStatus={collaboration?.paymentStatus}
                        tab={"Waiting Approval"}
                        title={
                          collaboration?.campaignId?.campaignTitle || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignImage ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                        refetch={refetch}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Waiting Approval" &&
              (!campaignsData?.collaborations ||
                (campaignsData.collaborations.length === 0 && !isLoading)) && (
                <div className="text-center p-10">
                  <Image
                    src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                    alt=""
                    width={280}
                    height={280}
                    className="mx-auto"
                    priority
                  />
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900  mt-2 dark:text-gray-200">
                    Welcome to the inbox. <br /> No pending collaborations
                    found.
                  </h3>
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Completed" className="w-full mt-0 px-2 sm:px-4 bg-gray-50 dark:bg-background pb-3 md:pb-10 pt-5 md:pt-8 flex-1 h-full ">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Completed" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Completed"}
                        paymentStatus={collaboration?.paymentStatus}
                        tab={"Completed"}
                        title={
                          collaboration?.campaignId?.campaignTitle || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignImage ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                        refetch={refetch}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Completed" &&
              (!campaignsData?.collaborations ||
                (campaignsData.collaborations.length === 0 && !isLoading)) && (
                <div className="text-center p-10">
                  <Image
                    src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                    alt=""
                    width={280}
                    height={280}
                    className="mx-auto"
                    priority
                  />
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200  mt-2">
                    Welcome to the inbox. <br /> No completed collaborations
                    found.
                  </h3>
                </div>
              )}
          </Suspense>
        </TabsContent>

        <TabsContent value="Payment" className="w-full mt-0 px-2 sm:px-4 bg-gray-50 dark:bg-background pb-3 md:pb-10 pt-5 md:pt-8 flex-1">
          <Suspense fallback={<TabLoading />}>
            {activeTab === "Payment" &&
              campaignsData?.collaborations?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {campaignsData.collaborations.map(
                    (collaboration: Collaboration, index: number) => (
                      <InboxCard
                        key={collaboration._id || index}
                        status={"Payment"}
                        paymentStatus={collaboration?.paymentStatus}
                        tab={"Payment"}
                        title={
                          collaboration?.campaignId?.campaignTitle || "No Title"
                        }
                        image={
                          collaboration?.campaignId?.campaignImage ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        data={collaboration}
                        refetch={refetch}
                      />
                    )
                  )}
                </div>
              )}
            {activeTab === "Payment" &&
              (!campaignsData?.collaborations ||
                (campaignsData.collaborations.length === 0 && !isLoading)) && (
                <div className="text-center p-10">
                  <Image
                    src="https://d20cf3kfv1a9jn.cloudfront.net/images/intro.png"
                    alt=""
                    width={280}
                    height={280}
                    className="mx-auto"
                    priority
                  />
                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200  mt-2">
                    Welcome to the inbox. <br /> No payment collaborations
                    found.
                  </h3>
                </div>
              )}
          </Suspense>
        </TabsContent>
      </Tabs>


    </AnimatePresence>
  );
};

export default Page;
