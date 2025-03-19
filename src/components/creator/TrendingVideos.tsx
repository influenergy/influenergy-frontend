import React from "react";
// import Image from "next/image";
import { Play } from "lucide-react";
// import { UserProfile } from "@/types/CreatorDetails";

const TrendingVideos = () => {
  // { creator }: UserProfile
  // const { trendingVideos } = creator;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <Play className="text-primary h-5 w-5" />
        Creator&apos;s Trending Videos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {trendingVideos && trendingVideos.map((video, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm border"
          >
            <div className="relative h-48 w-full">
              <Image
                src={video?.url}
                alt={video?.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
            <p className="p-2 text-center text-sm truncate">{video?.caption}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TrendingVideos;
