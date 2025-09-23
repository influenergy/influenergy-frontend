"use client";

import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
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
      if (!userType)
        throw new Error("Please select a user type before logging in.");
      return authApi.googleAuth(token, userType);
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data?.data }));
      toast({ title: "Login Successful 🎉", description: "Redirecting..." });
      router.replace("/dashboard");
    },
    onError: (error: unknown) => {
      let message = "Google login failed. Please try again.";
      if (typeof error === "object" && error !== null) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          code?: string;
          message?: string;
        };
        message =
          axiosError.response?.data?.message ||
          (axiosError.code === "ERR_NETWORK"
            ? "Network error. Please check your connection."
            : axiosError.message || message);
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
    },
  });

  // Custom login handler
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse.access_token) {
        googleAuthMutation.mutate({
          token: tokenResponse.access_token,
          userType: userType || "",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Missing Token",
          description: "Google did not return a token. Try again.",
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Google login was not successful.",
      });
    },
  });

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => login()}
        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-2xl hover:bg-gray-100 transition"
      >
        {/* Google "G" Logo SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        <span>Google</span>
      </button>

      {googleAuthMutation.isPending && (
        <p className="text-sm text-gray-500 mt-2">Logging you in...</p>
      )}
    </div>
  );
};

export default GoogleAuth;
