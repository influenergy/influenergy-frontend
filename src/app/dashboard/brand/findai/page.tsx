"use client";
import { Loader2, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useCampaigns } from "@/hooks/useQueryCampaigns";
import { Campaign } from "@/types/PostQuestionnaire";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { data, isLoading, error } = useCampaigns();

  // Extract campaigns from the response and provide a default empty array
  const campaigns: Campaign[] = data?.campaigns || [];

  if (error) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Not able to fetch campaigns data</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Generating your perfect matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center w-full text-red-500 mb-4">
        Not able to fetch campaigns data
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <div className="py-3 container mx-auto px-4 space-y-4">
        <p>Creator List</p>
        <div className="flex gap-4">
          {campaigns.map((campaign: Campaign) => (
            <div key={campaign._id} className="relative">
              <Link
                href={`/dashboard/brand/posts/${encodeURIComponent(
                  campaign._id
                )}`}
              >
                <div className="w-[300px] rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2 ">
                  {/* Content */}
                  <div className="mb-3">
                    <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
                      {campaign.campaignName}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
                    <Image
                      src={campaign.campaignPost || "/images/login.webp"}
                      alt={campaign.campaignName}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  <Button className="bg-primary w-full text-lg">
                    AI Find <Sparkles className=" h-7 w-7" />
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
