import Image from "next/image";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface Creator {
  id: string;
  name: string;
  image: string;
  price: number;
  categories: string[];
  engagementRate: number;
  followers: number;
}

interface FindCardProps {
  creator?: Creator;
  isLoading?: boolean;
}

const FindCard: FC<FindCardProps> = ({
  creator = {
    id: "1",
    name: "John Doe",
    image: "/images/register.webp",
    price: 300,
    categories: ["Travel", "Lifestyle", "Outdoors"],
    engagementRate: 10,
    followers: 1500,
  },
  isLoading = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-lg p-4 shadow-lg bg-white w-full animate-pulse">
        <div className="h-[300px] sm:h-[400px] w-full bg-gray-200 rounded-lg" />
        <div className="mt-4 space-y-2 px-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-white w-full group"
    >
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={imageError ? "/images/fallback.jpg" : creator.image}
          className="object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
          fill
          alt={creator.name}
          onError={() => setImageError(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white mb-1">
              {creator.name}
            </h3>
            <p className="text-2xl font-semibold text-white">
              ${formatNumber(creator.price)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col space-y-3 px-2">
        <div className="flex flex-wrap gap-2">
          {creator.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Engagement Rate</span>
            <span className="text-sm font-semibold text-primary">
              {creator.engagementRate}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Followers</span>
            <span className="text-sm font-semibold text-primary">
              {formatNumber(creator.followers)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FindCard;
