"use client";
import BrandQuestionnaire from "@/components/questionnaire/BrandQuestionnaire";
import CreatorQuestionnaire from "@/components/questionnaire/CreatorQuestionnaire";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle localStorage in useEffect to avoid SSR issues
    setUserType(searchParams.get("role"));
    setIsLoading(false);

    if (!searchParams.get("role")) {
      router.push("/");
    }
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7877e6]"></div>
      </div>
    );
  }

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
