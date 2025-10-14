"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";


export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(
      typeof navigator !== "undefined" ? navigator.onLine : true
    );
    const { toast } = useToast();
  
    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);
  
    // Helper to check network before performing an action
    const checkNetwork = (): boolean => {
      if (!isOnline) {
        toast({
          variant: "destructive",
          title: "No network connection",
          description: "You’re currently offline. Please connect to perform this action.",
        });
        return false;
      }
      return true;
    };
  
    return { isOnline, checkNetwork };
  }
  