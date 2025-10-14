"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useFindAiCampaign } from "@/hooks/useFindAi";
import { ChevronsLeft } from "lucide-react";
import { CreatorAPIResponse } from "@/types/Creator";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/brand/Loader";


const Levels = [
  {
      key: "level_1",
      title: "Level 1 - Rising Creator",
      img: "/bronze-award.svg",
      text: "Unlocked instantly when you join the program.",
      price: "50"
  },
  {
      key: "level_2",
      title: "Level 2 - Active Creator",
      img: "/gold-award.svg",
      text: "Unlock after completing 3 successful collaborations.",
      price: "100"
  },
  {
      key: "level_3",
      title: "Level 3 - Pro Creator",
      img: "/award.svg",
      text: "Unlock after completing 10 successful collaborations.",
      price: "150"
  },
];

export default function ProfileMatch() {

  const { campaignId } = useParams();
  const router = useRouter();
  const {
    data: creatorsData,
    isLoading,
    isError,
    isFetched
  } = useFindAiCampaign(campaignId as string, localStorage.getItem("selected-creator-campaign") || "");

  const creators: CreatorAPIResponse[] = creatorsData?.data?.matchedCreators || [];
  const favCreators: CreatorAPIResponse[] = creatorsData?.data?.favoriteCreators || [];
  const selectedCreator: CreatorAPIResponse = creatorsData?.data?.selectedCreator || {};

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader />
        </div>
      </div>
    );
  }
  if (isFetched) {
    localStorage.removeItem("selected-creator-campaign")
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
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600  transition-colors duration-200 flex items-center gap-1 mb-5"
        >
          <ChevronsLeft className="h-5 w-5" />
          Back
        </button>
        <p className="text-red-500">No creators found</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-8 px-4 sm:px-5">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white duration-200 flex items-center gap-1 mb-5"
      >
        <ChevronsLeft className="h-5 w-5" />
        Back
      </button>
      {selectedCreator?.creatorId && (
        <>
          <h2 className="text-2xl font-bold mb-4">Selected Creator</h2>
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full mb-4 md:mb-6">
            <div
              key={selectedCreator?.creatorId}
              className="bg-white dark:bg-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full pt-[60%]">
                <Image
                  src={selectedCreator?.creator?.profileIcon || "/images/placeholder.png"}
                  alt={selectedCreator?.creator?.fullName}
                  fill
                  className="absolute top-0 left-0 object-cover"
                />
              </div>

              <div className="flex flex-col p-3 sm:p-4 flex-grow  dark:bg-gray-300">
                <div className="flex items-start justify-between mb-2 dark:bg-gray-300">
                  <div className="flex flex-col justify-start items-start w-1/2">
                    <div className="flex items-center gap-1 w-full">
                      <p className="text-sm sm:text-base font-semibold truncate max-w-[90%] dark:text-black">
                        {selectedCreator?.creator?.fullName}
                      </p>
                      <MdVerified className="text-blue-500 h-4 w-4 flex-shrink-0" />
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm truncate w-full dark:text-black">
                      {selectedCreator?.creator?.profile?.category?.[0] || "No category"}
                    </p>
                  </div>

                  <div className="flex flex-col items-end w-1/2">
                    <p className="text-gray-800 font-semibold text-right text-xs sm:text-sm dark:text-black">
                      {selectedCreator?.creator?.profile?.socialLinks?.primary?.followers || "0"}
                    </p>
                    <p className="text-xs sm:text-sm dark:text-black">Followers</p>
                  </div>
                </div>

                <div className="h-0.5 bg-gray-200 dark:bg-gray-600  w-full" />

                <div className="flex items-center mt-2 space-x-2 min-h-[1.5rem]">
                  {selectedCreator?.creator?.profile?.socialLinks?.primary?.platform && (
                    <Link
                      className="text-xs text-primary truncate max-w-[45%]"
                      href={
                        selectedCreator?.creator?.profile?.socialLinks?.primary?.link || "#"
                      }
                      title={
                        selectedCreator?.creator?.profile?.socialLinks?.primary?.platform
                      }
                    >
                      {selectedCreator?.creator?.profile?.socialLinks?.primary?.platform}
                    </Link>
                  )}

                  {selectedCreator?.creator?.profile?.socialLinks?.primary?.platform &&
                    selectedCreator?.creator?.profile?.socialLinks?.secondary?.platform && (
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                    )}

                  {selectedCreator?.creator?.profile?.socialLinks?.secondary?.platform && (
                    <Link
                      className="text-xs text-primary truncate max-w-[45%]"
                      href={
                        selectedCreator?.creator?.profile?.socialLinks?.secondary?.link || "#"
                      }
                      title={
                        selectedCreator?.creator?.profile?.socialLinks?.secondary?.platform
                      }
                    >
                      {selectedCreator?.creator?.profile?.socialLinks?.secondary?.platform}
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-3 sm:p-4 pt-0 mt-auto dark:bg-gray-300">
                <div className="mt-3 sm:mt-4 flex justify-between items-center">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-black">Price Per Video</p>
                  <p className="text-sm sm:text-lg font-bold dark:text-black">
                    $ {selectedCreator?.creator?.profile?.budgetVideo || "N/A"}
                  </p>
                </div>
                <Link
                  href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${selectedCreator?.creatorId}?similarity=${(selectedCreator?.similarity * 100).toFixed(2) || 10}`}
                  className="block mt-2 sm:mt-3"
                >
                  <Button
                    variant="outline"
                    className="w-full bg-primary text-white border border-primary hover:text-primary dark:hover:bg-gray-300  hover:bg-white text-xs sm:text-sm py-1 sm:py-2"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {
        favCreators.length > 0 && <>
          <h2 className="text-2xl font-bold mb-4">Favorite Creators</h2>
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full mb-4 md:mb-6">
            {favCreators.map((data: CreatorAPIResponse) => (
              <div
                key={data?.creatorId}
                className="bg-white dark:bg-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
              >
                <div className="relative w-full pt-[60%]">
                  <Image
                    src={data?.creator?.profileIcon || "/images/placeholder.png"}
                    alt={data?.creator?.fullName}
                    fill
                    className="absolute top-0 left-0 object-cover"
                  />
                </div>
                <div className="flex flex-col p-3 sm:p-4 flex-grow dark:bg-gray-300">
                  <div className="flex items-start justify-between mb-2 dark:bg-gray-300">
                    <div className="flex flex-col justify-start items-start w-1/2">
                      <div className="flex items-center gap-1 w-full">
                        <p className="text-sm sm:text-base font-semibold truncate max-w-[90%] dark:text-black">
                          {data?.creator?.fullName}
                        </p>
                        <MdVerified className="text-blue-500 h-4 w-4 flex-shrink-0" />
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm truncate w-full dark:text-black">
                        {data?.creator?.profile?.category?.[0] || "No category"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end w-1/2">
                      <p className="text-gray-800 font-semibold text-right text-xs sm:text-sm dark:text-black">
                        {data?.creator?.profile?.socialLinks?.primary?.followers ||
                          "0"}
                      </p>
                      <p className="text-xs sm:text-sm dark:text-black">Followers</p>
                    </div>
                  </div>
                  <div className="h-0.5 bg-gray-200  dark:bg-gray-600 w-full" />
                  <div className="flex items-center mt-2 space-x-2 min-h-[1.5rem]">
                    {data?.creator?.profile?.socialLinks?.primary?.platform && (
                      <Link
                        className="text-xs text-primary truncate max-w-[45%]"
                        href={
                          data?.creator?.profile?.socialLinks?.primary?.link || "#"
                        }
                        title={
                          data?.creator?.profile?.socialLinks?.primary?.platform
                        }
                      >
                        {data?.creator?.profile?.socialLinks?.primary?.platform}
                      </Link>
                    )}
                    {data?.creator?.profile?.socialLinks?.primary?.platform &&
                      data?.creator?.profile?.socialLinks?.secondary?.platform && (
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                      )}
                    {data?.creator?.profile?.socialLinks?.secondary?.platform && (
                      <Link
                        className="text-xs text-primary truncate max-w-[45%]"
                        href={
                          data?.creator?.profile?.socialLinks?.secondary?.link ||
                          "#"
                        }
                        title={
                          data?.creator?.profile?.socialLinks?.secondary?.platform
                        }
                      >
                        {data?.creator?.profile?.socialLinks?.secondary?.platform}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0 mt-auto dark:bg-gray-300">
                  <div className="mt-3 sm:mt-4 flex justify-between items-center">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-black">
                      Price Per Video
                    </p>
                    <p className="text-sm sm:text-lg font-bold dark:text-black">
                      $ {data?.creator?.profile?.budgetVideo || "N/A"}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${data?.creatorId
                      }?similarity=${(data?.similarity * 100).toFixed(2) || 10}`}
                    className="block mt-2 sm:mt-3"
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-primary text-white border border-primary hover:text-primary dark:hover:bg-gray-300 hover:bg-white text-xs sm:text-sm py-1 sm:py-2"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>)
            )}
          </div>
        </>
      }
      <div>

      </div>
      <h2 className="text-2xl font-bold mb-4">Creators</h2>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
        {creators?.map((data: CreatorAPIResponse) => {
          const badge = data?.creator.badge
          const level = Levels.filter(l => l.key === badge)[0]

          return <div
            key={data?.creatorId}
            className="bg-white dark:bg-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
          >
            <div className="relative w-full pt-[60%]">
              <Image
                src={data?.creator?.profileIcon || "/images/placeholder.png"}
                alt={data?.creator?.fullName}
                fill
                className="absolute top-0 left-0 object-contain"
              />
              {/* {data?.creator?.badge && ( */}
              {/* <span className="absolute top-1 right-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {data.creator?.badgePrice ? data.creator?.badgePrice : data.creator?.profile?.budgetVideo} $
              </span> */}

              {data?.creator.badge && (
                <div className="absolute top-1 left-1 w-8 h-8">
                  <Image src={level.img} alt={level.text} fill
                    className="object-contain" />
                </div>
              )}
              {/* )} */}
            </div>
            <div className="flex flex-col p-3 sm:p-4 flex-grow dark:bg-gray-300">
              <div className="flex items-start justify-between mb-2 dark:bg-gray-300">
                <div className="flex flex-col justify-start items-start w-1/2">
                  <div className="flex items-center gap-1 w-full">
                    <p className="text-sm sm:text-base font-semibold truncate max-w-[90%] dark:text-black">
                      {data?.creator?.fullName}
                    </p>
                    <MdVerified className="text-blue-500 h-4 w-4 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm truncate w-full dark:text-black">
                    {data?.creator?.profile?.category?.[0] || "No category"}
                  </p>
                </div>

                <div className="flex flex-col items-end w-1/2">
                  <p className="text-gray-800 font-semibold text-right text-xs sm:text-sm dark:text-black">
                    {data?.creator?.profile?.socialLinks?.primary?.followers ||
                      "0"}
                  </p>
                  <p className="text-xs sm:text-sm dark:text-black">Followers</p>
                </div>
              </div>
              <div className="h-0.5 bg-gray-200  dark:bg-gray-600 w-full" />
              <div className="flex items-center mt-2 space-x-2 min-h-[1.5rem]">
                {data?.creator?.profile?.socialLinks?.primary?.platform && (
                  <Link
                    className="text-xs text-primary truncate max-w-[45%]"
                    href={
                      data?.creator?.profile?.socialLinks?.primary?.link || "#"
                    }
                    title={
                      data?.creator?.profile?.socialLinks?.primary?.platform
                    }
                  >
                    {data?.creator?.profile?.socialLinks?.primary?.platform}
                  </Link>
                )}
                {data?.creator?.profile?.socialLinks?.primary?.platform &&
                  data?.creator?.profile?.socialLinks?.secondary?.platform && (
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                  )}
                {data?.creator?.profile?.socialLinks?.secondary?.platform && (
                  <Link
                    className="text-xs text-primary truncate max-w-[45%]"
                    href={
                      data?.creator?.profile?.socialLinks?.secondary?.link ||
                      "#"
                    }
                    title={
                      data?.creator?.profile?.socialLinks?.secondary?.platform
                    }
                  >
                    {data?.creator?.profile?.socialLinks?.secondary?.platform}
                  </Link>
                )}
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-0 mt-auto dark:bg-gray-300">
              <div className="mt-3 sm:mt-4 flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-black">
                  Price Per Video
                </p>
                <p className="text-sm sm:text-lg font-bold dark:text-black">
                  $ {data?.creator?.badge? data?.creator?.badgePrice : data?.creator?.profile?.budgetVideo || "N/A"}
                </p>
              </div>
              <Link
                href={`/dashboard/brand/findai/campaign/${campaignId}/creator/${data?.creatorId
                  }?similarity=${(data?.similarity * 100).toFixed(2) || 10}`}
                className="block mt-2 sm:mt-3"
              >
                <Button
                  variant="outline"
                  className="w-full bg-primary text-white border border-primary hover:text-primary dark:hover:bg-gray-300 hover:bg-white text-xs sm:text-sm py-1 sm:py-2"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}
