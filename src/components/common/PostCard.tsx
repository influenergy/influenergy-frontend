import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Eye, Play } from "lucide-react";

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
      className="rounded-md max-w-[300px] max-h-[500px] shadow-lg relative cursor-pointer"
      onClick={handleVideoClick}
    >
      <div className="flex justify-center items-center rounded-md relative">
        <Image
          src={data.image || "/images/login.webp"}
          width={200}
          height={200}
          alt=""
          className="object-cover rounded-md"
        />
        {data.isPublic === "pending" ? (
          <div className="absolute w-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-2 rounded-md flex items-center z-10">
            <Eye className="h-4 w-4 mr-1 text-white" />
            <p className="text-sm text-white">Under Review</p>
          </div>
        ) : data.isPublic === "public" ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white rounded-full p-2 bg-opacity-70 backdrop-blur-sm cursor-pointer">
              <Play className="h-6 w-6" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white rounded-full p-2 bg-opacity-70 backdrop-blur-sm cursor-pointer">
              <Play className="h-6 w-6" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
      </div>
      <div className="mt-2 p-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">{data.title}</p>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
