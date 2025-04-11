import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Campaign } from "@/types/PostQuestionnaire";

const Post = ({ _id, campaignName, campaignPost }: Campaign) => {
  return (
    <Link href={`/dashboard/brand/posts/${encodeURIComponent(_id)}`}>
      <div className="w-[300px] rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2 ">
        {/* Content */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
            {campaignName.length > 50
              ? campaignName.slice(0, 50)+"..."
              : campaignName}
          </h3>
        </div>

        {/* Image */}
        <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
          <Image
            src={campaignPost || "https://placehold.co/600x400?text=Image\nNot+Available"}
            alt={campaignName}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default Post;
