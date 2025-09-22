"use client";

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/authServices";
import { useToast } from "@/hooks/use-toast";
import { setCredentials } from "@/store/features/authSlice";
import { useAppSelector } from "@/store";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const userType = useAppSelector((state) => state.auth.userType);

  const googleAuthMutation = useMutation({
    mutationFn: async ({
      token,
      userType,
    }: {
      token: string;
      userType: string;
    }) => {
      if (!userType) {
        throw new Error("Please select a user type before logging in.");
      }
      return authApi.googleAuth(token, userType);
    },
    onSuccess: (data) => {
      console.log("✅ Google login successful:", data);

      dispatch(
        setCredentials({
          user: data?.data,
        })
      );

      toast({
        title: "Login Successful 🎉",
        description: "Redirecting you to the dashboard...",
      });

      router.replace("/dashboard");
    },
    onError: (error: unknown) => {
      console.error("❌ Google login error:", error);

      let message = "Google login failed. Please try again.";

      if (typeof error === "object" && error !== null) {
        const axiosError = error as {
          response?: { data?: { message?: string }; status?: number };
          code?: string;
          message?: string;
        };

        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        } else if (axiosError.code === "ERR_NETWORK") {
          message =
            "Network error. Please check your connection or CORS settings.";
        } else if (axiosError.message) {
          message = axiosError.message;
        }
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            googleAuthMutation.mutate({
              token: credentialResponse.credential,
              userType: userType || "",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Missing Token",
              description:
                "Google did not return a credential. Please try again.",
            });
          }
        }}
        onError={() => {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Google login was not successful.",
          });
        }}
        theme="outline"
        size="large"
        promptMomentNotification={(notification) => {
          const type = notification.getMomentType();

          console.log("📢 One Tap Status:", type);

          if (notification.isDismissedMoment()) {
            console.log("ℹ️ User dismissed the One Tap prompt");
          }
          if (notification.isSkippedMoment()) {
            console.log("⚠️ One Tap skipped:", notification.getSkippedReason());
          }
          if (notification.isNotDisplayed()) {
            console.log(
              "❌ One Tap not displayed:",
              notification.getNotDisplayedReason()
            );
          }
        }}
      />

      {googleAuthMutation.isPending && (
        <p className="text-sm text-gray-500 mt-2">Logging you in...</p>
      )}
    </div>
  );
};

export default GoogleAuth;
