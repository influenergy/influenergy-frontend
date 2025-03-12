import React from "react";
import Image from "next/image";
import Link from "next/link";
interface PostDescriptionProps {
  data: {
    id: string;
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
  };
}

const Post = ({ data }: PostDescriptionProps) => {
  return (
    <Link href={`/dashboard/brand/posts/${encodeURIComponent(data.id)}`}>
      <div className="max-w-[300px] rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2 ">
        {/* Content */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
            {data.title}
          </h3>
        </div>

        {/* Image */}
        <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
          <Image
            src={data.image}
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
