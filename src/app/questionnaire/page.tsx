"use client";
import BrandQuestionnaire from "@/components/questionnaire/BrandQuestionnaire";
import CreatorQuestionnaire from "@/components/questionnaire/CreatorQuestionnaire";
import { useAppSelector } from "@/store";

export default function QuestionnairePage() {
  const userType = useAppSelector((state) => state.auth.userType);
  if (!userType) {
    return null;
  }

  return (
    <div className="h-full flex items-center justify-center relative">
      {userType === "creator" ? (
        <CreatorQuestionnaire />
      ) : (
        <BrandQuestionnaire />
      )}
    </div>
  );
}
