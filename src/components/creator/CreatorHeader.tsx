import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/CreatorDetails";
import { ChevronsLeft } from "lucide-react";

const CreatorHeader = ({ creator }: UserProfile) => {
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
      >
        <ChevronsLeft className="h-5 w-5" />
        Back
      </button>
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row items-center md:items-start gap-5">
        <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0">
          <Image
            src={creator?.profileIcons || "/images/placeholder.png"}
            alt={creator?.fullName}
            fill
            sizes="(max-width: 768px) 128px, 160px"
            className="rounded-full object-cover"
          />
        </div>
        <div className="p-2 w-full text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
            {creator?.fullName || "Not Available"}
            {creator?.isEmailVerified && (
              <MdVerified className="text-blue-500" />
            )}
          </h1>
          <p className="text-gray-600">
            {creator?.profile?.category.join(", ") || "Not Available"}
          </p>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            {creator?.profile?.aboutYourself || "Not Available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default CreatorHeader;
