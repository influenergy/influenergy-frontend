"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

export const useRouteProtection = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};
