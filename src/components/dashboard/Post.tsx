import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
interface PostDescriptionProps {
  data: {
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
      <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow p-4 space-y-4">
        {/* Image */}
        <div className="aspect-video relative rounded-md overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2">{data.title}</h3>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Calendar className="h-4 w-4" />
            <span>{data.createdAt}</span>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{data.requirement.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>Min. Followers: {data.requirement.minFollowers}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Min. Engagement: {data.requirement.minEngagement}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {data.description.split("|").map((category, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {category.trim()}
              </span>
            ))}
          </div>
        </div>

      </div>
    </Link>
  );
};

export default Post;
