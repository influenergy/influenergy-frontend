"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/authServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader } from "@/components/common/Loader";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function VerificationComplete() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const params = useParams();
  const token = params.token;

  // Email verification query
  const {
    isLoading: verifying,
    data,
    error,
  } = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => authApi.verifyEmail(token as string),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });


  // Resend verification mutation
  const { mutate: resendVerification, isPending: resending } = useMutation({
    mutationFn: (email: string) => authApi.resendVerificationEmail(email),
    onSuccess: () => {
      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link",
        duration: 5000,
      });
      setEmail("");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "Failed to resend verification email",
          variant: "destructive",
          duration: 5000,
        });
      }
    },
  });

  const handleResendVerification = () => {
    setEmailError("");
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    resendVerification(email);
  };

  // Animation controls
  const controls = useAnimation();
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  if (verifying) {
    return <Loader />;
  }

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!error && data?.success ? (
        // Success UI
        <>
          <motion.div
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <div className="bg-violet-100 p-4 rounded-full">
              <motion.svg
                className="w-16 h-16 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Your Verification is Completed!
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 text-center mb-8"
            variants={itemVariants}
          >
            Your verification process has been completed. Go to Dashboard to
            complete your profile
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </>
      ) : (
        // Error/Resend UI
        <>
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="bg-violet-100 p-6 rounded-full shadow-lg">
              <motion.svg
                className="w-20 h-20 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-6 text-center"
            variants={itemVariants}
          >
            Verification Failed
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-600 text-center mb-12 max-w-2xl"
            variants={itemVariants}
          >
            The verification link has expired. Please request a new verification
            email below.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center items-center gap-4 w-full max-w-2xl px-4"
          >
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-96 h-14 text-lg border-2 border-gray-300 rounded-xl focus:border-violet-500 focus:ring-violet-500 transition-all"
            />
            <div className="flex flex-col w-full sm:w-auto gap-1">
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {emailError}
                </motion.p>
              )}
              <Button
                className="w-full sm:w-auto px-8 py-6 mt-3 bg-violet-600 text-white text-lg rounded-xl font-semibold hover:bg-violet-700 transition-all transform hover:scale-105 shadow-lg disabled:bg-violet-400 disabled:cursor-not-allowed"
                onClick={handleResendVerification}
                disabled={resending}
              >
                {resending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Resend Verification"
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}

      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <Image
          src="/images/line1.png"
          width={300}
          height={300}
          alt="Decorative line"
          className="absolute top-0 right-0"
        />
      </motion.div>
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <Image
          src="/images/line2.png"
          width={300}
          height={300}
          alt="Decorative line"
          className="absolute bottom-0 -left-10"
        />
      </motion.div>
    </motion.div>
  );
}
