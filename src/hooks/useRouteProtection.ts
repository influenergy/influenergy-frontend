"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store";

export const useRouteProtection = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Prevent hydration issues

  useEffect(() => {
    if (!isAuthenticated && isAuthChecked) {
      if (pathname !== "/login") {
        router.push("/login");
      }
    } else {
      setIsAuthChecked(true);
    }
  }, [isAuthenticated, isAuthChecked, pathname, router]);

  return isAuthenticated;
};
