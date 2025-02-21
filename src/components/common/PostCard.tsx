import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";

const PostCard = () => {
  return (
    <Card className="rounded-md w-full shadow-lg">
      <div className="flex justify-center items-center rounded-md">
        <Image
          src="/images/login.webp"
          width={400}
          height={300}
          alt="card image"
          className="object-contain rounded-md"
        />
      </div>
      <div className="mt-2 p-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            {" "}
            Travel | Lifestyle | Outdoors
          </p>
          <p className="font-bold text-primary text-md">$300</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-black text-sm">Engagement Rate</p>
          <p className="font-bold text-primary text-md">10%</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-black text-sm">Followers</p>
          <p className="font-bold text-primary text-md">1.5K</p>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
