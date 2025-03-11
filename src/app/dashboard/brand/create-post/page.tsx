import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the PostQuestionnaire component with no SSR
const PostQuestionnaire = dynamic(
  () => import("@/components/questionnaire/PostQuestionnaire"),
  { ssr: false } // This ensures the component only renders on the client side
);

const Page = () => {
  return <div className="w-full h-full flex justify-center">
    <PostQuestionnaire />
  </div>;
};

export default Page;
