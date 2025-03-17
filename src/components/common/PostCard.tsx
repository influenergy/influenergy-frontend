import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Eye, Play } from "lucide-react";

interface PostCardProps {
  status?: "Under Review" | null;
  isVideo?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ status }) => {
  return (
    <Card className="rounded-md max-w-[300px] shadow-lg relative">
      <div className="flex justify-center items-center rounded-md relative">
        <Image
          src="/images/login.webp"
          width={400}
          height={300}
          alt="card image"
          className="object-contain rounded-md"
        />
        {status === "Under Review" && (
          <div className="absolute top-2 left-2 bg-white bg-opacity-90 backdrop-blur-sm p-1 rounded-md flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <p className="text-xs">{status}</p>
          </div>
        )}
         <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
       
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white rounded-full p-2 bg-opacity-70 backdrop-blur-sm cursor-pointer">
              <Play className="h-6 w-6" />
            </div>
          </div>
      
      </div>
      <div className="mt-2 p-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            Travel | Lifestyle | Outdoors
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
