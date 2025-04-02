import React from "react";
import { Loader2, Play } from "lucide-react";
import { useGetCreatorVideos } from "@/hooks/useFindAi";
import Image from "next/image";
import Link from "next/link";
interface Video {
  _id: string;
  videoLink?: string;
  title: string;
  image: string;
  caption?: string;
  isPublic: string;
  addedAt: string;
}

const TrendingVideos: React.FC<{ creatorId: string }> = ({ creatorId }) => {
  const {
    data: trendingVideos,
    isLoading,
    isError,
  } = useGetCreatorVideos(creatorId);

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Videos are not able fetched</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <Play className="text-primary h-5 w-5" />
        Creator&apos;s Trending Videos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingVideos.videos.videos.length > 0 ? (
          trendingVideos.videos.videos.map((video: Video, index: number) => (
            <Link
              href={video?.videoLink || "#"}
              key={index}
              className="rounded-lg overflow-hidden shadow-sm border"
              target="_blank"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={video?.image}
                  alt={video?.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center  transition-opacity bg-black/30">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <p className="p-2 text-center text-sm truncate">{video?.title}</p>
            </Link>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-red-500">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingVideos;
