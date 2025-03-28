"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useFindAiCampaign } from "@/hooks/useFindAi";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { CreatorAPIResponse } from "@/types/Creator";
import { useParams, useRouter } from "next/navigation";

export default function ProfileMatch() {
  const { campaignId } = useParams();
  const router = useRouter();
  const {
    data: creatorsData,
    isLoading,
    isError,
  } = useFindAiCampaign(campaignId as string);
  const creators: CreatorAPIResponse[] = creatorsData?.data || [];

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
    <div className="container mx-auto mt-8 px-5">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 mb-5"
      >
        <ChevronsLeft className="h-5 w-5" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Creators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {creators?.map((data: CreatorAPIResponse) => (
          <div
            key={data?.creatorId}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <Image
              src={data?.creator?.profileIcon || "/images/login.webp"}
              alt={data?.creator?.fullName}
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="flex flex-col p-4 flex-grow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col justify-start items-start  w-full">
                  <p className="text-lg font-semibold flex items-center gap-1">
                    {data?.creator?.fullName?.length > 10
                      ? `${data.creator.fullName.slice(0, 10)}...`
                      : data.creator.fullName}
                    <MdVerified className=" text-blue-500 h-5 w-5" />
                  </p>
                  <p className="text-gray-600 text-sm text-start ">
                    {`${data?.creator?.profile?.category?.[0]?.slice(0, 20)}${
                      data?.creator?.profile?.category?.[0] &&
                      data?.creator?.profile?.category?.[0].length > 10
                        ? "..."
                        : ""
                    }`}
                  </p>{" "}
                </div>

                <div className="flex flex-col items-end  w-full ">
                  <p className="text-gray-800 font-semibold text-right text-sm">
                    {data?.creator?.profile?.socialLinks?.primary?.followers}
                  </p>
                  <p className="text-sm">Followers</p>
                </div>
              </div>
              <div className="h-0.5 bg-gray-200 w-full" />
              <div className="flex items-center mt-2 space-x-2">
                {data?.creator?.profile?.socialLinks?.primary?.platform && (
                  <Link
                    className="text-xs text-primary"
                    href={
                      data?.creator?.profile?.socialLinks?.primary?.link || "#"
                    }
                  >
                    {data?.creator?.profile?.socialLinks?.primary?.platform}
                  </Link>
                )}
                {data?.creator?.profile?.socialLinks?.primary?.platform &&
                  data?.creator?.profile?.socialLinks?.secondary?.platform && (
                    <span className="text-gray-300">|</span>
                  )}
                {data?.creator?.profile?.socialLinks?.secondary?.platform && (
                  <Link
                    className="text-xs text-primary"
                    href={
                      data?.creator?.profile?.socialLinks?.secondary?.link ||
                      "#"
                    }
                  >
                    {data?.creator?.profile?.socialLinks?.secondary?.platform}
                  </Link>
                )}
              </div>
            </div>

            <div className="p-4 pt-0 mt-auto">
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-700">Price Per Video</p>
                <p className="text-lg font-bold">
                  $ {data?.creator?.profile?.budgetVideo}
                </p>
              </div>
              <Link
                href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${
                  data?.creatorId
                }?similarity=${(data?.similarity * 100).toFixed(2) || 10}`}
              >
                <Button
                  variant="outline"
                  className="w-full bg-primary text-white border border-primary hover:text-primary hover:bg-white "
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
