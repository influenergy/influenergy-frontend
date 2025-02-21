"use client";
import PostDescription from "@/components/dashboard/PostDescription";
import React from "react";
import { useParams} from "next/navigation";
import { DESCRIPTION } from "@/constants/Description";

const Page = () => {
  const { postId } = useParams();

  const description = DESCRIPTION.filter((item) => {
    return item.id == postId;
  });

  return <PostDescription data={description[0]} />;
};

export default Page;
