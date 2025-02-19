import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Calendar, MapPin, Users, BarChart } from "lucide-react";

interface PostData {
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
}

interface PostDescriptionProps {
  data: PostData;
}

const PostDescription = ({ data }: PostDescriptionProps) => {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      {/* Header with image and basic info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image container */}
        <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Basic info */}
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {data.title}
          </h3>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{data.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.requirement.location}</span>
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <p className="text-gray-600">Min Followers</p>
                <p className="font-medium">{data.requirement.minFollowers}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <p className="text-gray-600">Min Engagement</p>
                <p className="font-medium">{data.requirement.minEngagement}</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {data.description.split("|").map((category, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
              >
                {category.trim()}
              </span>
            ))}
          </div>
          {/* Preview of markdown content */}
          <div className="mt-4 pt-4 border-t">
              <ReactMarkdown>{data.offerDescription}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
