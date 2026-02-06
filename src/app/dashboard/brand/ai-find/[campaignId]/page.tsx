"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useInfiniteFindAiCampaign } from "@/hooks/useFindAi";
import { Badge, ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import { CreatorAPIResponse } from "@/types/Creator";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/brand/Loader";
import { useEffect, useRef, useState } from "react";
import CardSkeleton from "@/components/common/CardSkeleton";
import ExploreCreatorCard from "@/components/brand/ExploreCreatorCard";
import InviteCreatorModal from "@/components/brand/InviteCreatorModal";
import { useQueryClient } from "@tanstack/react-query";
import { useToggleFavorite } from "@/hooks/usePost";
import ExploreCreatorsSkeleton from "@/components/Skeletons/ExploreCreatorsSkeleton";

const Levels = [
  {
    key: "level_1",
    img: "/bronze-award.svg",
  },
  {
    key: "level_2",
    img: "/gold-award.svg",
  },
  {
    key: "level_3",
    img: "/award.svg",
  },
];

export default function ProfileMatch() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const router = useRouter();

  // Filter states
  const [inviteModal, setInviteModal] = useState(false);


  const [filter, setFilters] = useState("");

  const [selectedCreator, setSelectedCreator] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setSelectedCreator(
      localStorage.getItem("selected-creator-campaign") || undefined
    );
  }, []);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteFindAiCampaign(campaignId as string, filter);

  const creators =
    data?.pages.flatMap((page) => page.data.creators) ?? [];


  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleSelecteCreatorForCampaign = (creatorId: string) => {
    setSelectedCreator(creatorId);
    setInviteModal(true);
  };

  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite({
    filters: filter, // Pass filters here
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploreCreators", filter] });
    },
  });

  const handleSort = (sort: string) => {
    let newSort = sort === filter? "" : sort;
    setFilters(newSort);
    router.replace(`/dashboard/brand/ai-find/${campaignId}?sort=${newSort}`);
  };


  if (status === "pending" && !data) {
    return <ExploreCreatorsSkeleton />;
  }
  if (status === "error") return <p>Failed to load creators</p>;

  if (creators.length === 0) {
    return (
      <div className="relative p-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-semibold text-gray-700">
            No creators found
          </p>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Try adjusting your filters or removing some selections to see more creators.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 flex flex-col gap-3">
      {/* Header with Back Button */}
      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-3 items-center pl-3 border-l-2">
        <p>Sort:</p>
        <div className="flex gap-3 md:space-x-0 md:space-y-0 items-center flex-wrap">
          <Button
            onClick={() => handleSort("recentlyCollaborated")}
            className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filter === "recentlyCollaborated"
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-500"
              }`}
          >
            Recently Collaborated
          </Button>
          <Button
            onClick={() => handleSort("favorites")}
            className={`bg-transparent border p-2 rounded-lg hover:bg-transparent hover:scale-105 ${filter === "favorites"
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-500"
              }`}
          >
            Favorites
          </Button>
        </div>
      </div>

      {/* ⭐ Matched Creators */}
      {creators.length > 0 &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creators.map((creator) => {
            // const isExpanded = expanded[creator.creator._id] || false;
            // const badge = creator.creator.badge;
            // const level = Levels.find((l) => l.key === badge);
            // const badgePrice = creator.creator.badgePrice || "";

            return (
              <ExploreCreatorCard
                key={creator.creator._id}
                creator={creator.creator}
                isToggling={isToggling}
                onToggleFavorite={() =>
                  toggleFavorite({ creatorId: creator.creator._id })
                }
                onInvite={() =>
                  handleSelecteCreatorForCampaign(creator.creator._id)
                }
                similarity={creator.similarity}
              />
            );
          })}
        </div>
      }


      {/* Load More */}
      <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-4">
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>


      {inviteModal && selectedCreator && (
        <InviteCreatorModal
          creatorId={selectedCreator}
          onClose={() => setInviteModal(false)}
        />

      )}

    </div>
  );
}

