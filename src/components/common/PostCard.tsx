import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Eye, Play, X } from "lucide-react";

interface PostCardProps {
  data: {
    image: string;
    title: string;
    isPublic: string;
    videoLink?: string;
    _id?: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const handleVideoClick = () => {
    if (data.videoLink) {
      window.open(data.videoLink, "_blank");
    }
  };
  return (
    <Card
      className="rounded-md w-full max-w-[300px] shadow-lg relative cursor-pointer h-full"
      onClick={handleVideoClick}
    >
      <div className="flex justify-center items-center rounded-md relative w-full aspect-square">
        <Image
          src={data.image || "/video-preview.svg"}
          fill
          alt={data.title || "Post image"}
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
        />
        {data.isPublic === "pending" ? (
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-md flex justify-center items-center z-10">
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-white" />
            <p className="text-xs sm:text-sm text-white">Under Review</p>
          </div>
        ) : data.isPublic === "approved" ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white rounded-full p-1.5 sm:p-2 bg-opacity-70 backdrop-blur-sm cursor-pointer">
              <Play className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full flex items-center justify-center rounded-full p-1.5 sm:p-2  backdrop-blur-sm cursor-pointer">
              <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              <p className="text-xs sm:text-sm text-white">Rejected</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
      </div>
      <div className="mt-2 p-2 flex justify-between items-center">
        <div className="flex flex-col justify-between items-center">
          <h3>Video Title</h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
            {data.title}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <h3>Status</h3>
          <p className={`${data.isPublic === "pending" ? 'text-yellow-500': data.isPublic === "approved"? 'text-green-500' : 'text-red-500'} text-xs sm:text-sm line-clamp-2`}>
            <span className={`${data.isPublic === "pending" ? 'bg-yellow-500': data.isPublic === "approved"? 'bg-green-500' : 'bg-red-500'} h-3 w-3 rounded-full inline-block mr-1`} />
            {data.isPublic.slice(0,1).toUpperCase() + data.isPublic.slice(1)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
