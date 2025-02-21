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
    <div className="min-h-screen flex items-center justify-center p-4">
      {userType === "creator" ? (
        <CreatorQuestionnaire />
      ) : (
        <BrandQuestionnaire />
      )}
    </div>
  );
}
