"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useFindAiCampaign } from "@/hooks/useFindAi";
import { Loader2 } from "lucide-react";
import { CreatorAPIResponse } from "@/types/Creator";
import { useParams } from "next/navigation";


export default function ProfileMatch() {
  const { campaignId } = useParams();
  const {
    data: creatorsData,
    isLoading,
    isError,
  } = useFindAiCampaign(campaignId as string);
  const creators: CreatorAPIResponse[] = creatorsData?.data || [];
  console.log("creatorsData", creators);

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading creators...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading creators</p>
      </div>
    );
  }

  if (creators.length == 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">No creators found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Creators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {creators?.map((data: CreatorAPIResponse) => (
          <div
            key={data.creatorId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={data?.profileIcon || "/images/login.webp"}
              alt={data?.creator?.fullName}
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">

                <div className="flex flex-col justify-start items-start  w-full">
                  <p className="text-lg font-semibold flex items-center gap-3">
                    {data?.creator?.fullName}{" "}
                    <MdVerified className=" text-blue-500 h-5 w-5" />
                  </p>
                  <p className="text-gray-600 text-sm text-start ">
                    {data?.creator?.profile?.category?.join(", ")}
                  </p>{" "}
                </div>

                <div className="flex flex-col items-end  w-full ">
                  <p className="text-gray-800 font-semibold text-right text-xs">
                    {data?.creator.profile?.socialLinks?.primary?.followers}
                  </p>
                  <p>Followers</p>
                </div>
              </div>
              <div className="h-0.5 bg-gray-200 w-full"/>
              <div className="flex items-center mt-2 space-x-4">
                {data?.creator?.profile?.socialLinks?.primary?.platform && (
                  <Link
                    className="text-xs text-primary"
                    href={data?.creator?.profile?.socialLinks?.primary?.link || "#"}
                  >
                    {data?.creator?.profile?.socialLinks?.primary?.platform}
                  </Link>
                )}
                {data?.creator?.profile?.socialLinks?.secondary?.platform && (
                  <Link
                    className="text-xs text-primary"
                    href={data?.creator?.profile?.socialLinks?.secondary?.link || '#'}
                  >
                    {data?.creator?.profile?.socialLinks?.secondary?.platform}
                  </Link>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-700">Price Per Video</p>
                <p className="text-lg font-bold">
                 $ {data?.creator.profile?.budgetVideo}
                </p>
              </div>
              <Link
                href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${data.creatorId}`}
              >
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-primary text-white hover:text-primary hover:bg-white"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
