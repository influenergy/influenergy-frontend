import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PostDescriptionProps {
  data: {
    _id: string;
    image: string;
    title: string;
    description: string;
    createdAt: string;
    requirement: {
      location: string;
      minFollowers: string;
      minEngagement: string;
    };
    offerDescription: string;
    campaignName: string;
    campaignPost: string;
  };
}

const Post = ({ data }: PostDescriptionProps) => {
  console.log("data", data._id);
  return (
    <Link href={`/dashboard/brand/posts/${encodeURIComponent(data._id)}`}>
      <div className="w-[300px] rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2 ">
        {/* Content */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
            {data.campaignName}
          </h3>
        </div>

        {/* Image */}
        <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
          <Image
            src={data.campaignPost || "/images/login.webp"}
            alt={data.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default Post;
