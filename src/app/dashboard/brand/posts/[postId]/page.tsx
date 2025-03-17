"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
  selectCurrentPost,
  selectPostLoading,
} from "@/store";
import {
  fetchCampaignById,
  clearCurrentCampaign,
} from "@/store/features/postSlice";

const Page = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const campaign = useAppSelector(selectCurrentPost);
  const isLoading = useAppSelector(selectPostLoading);

  useEffect(() => {
    if (postId) {
      dispatch(fetchCampaignById(postId as string));
    }

    // Clean up when unmounting
    return () => {
      dispatch(clearCurrentCampaign());
    };
  }, [dispatch, postId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading campaign details...</span>
      </div>
    );
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return <PostDescription data={campaign} />;
};

export default Page;
