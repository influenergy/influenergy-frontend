"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { authApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";

const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { token } = useParams();
  const router = useRouter();
  const controls = useAnimation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      return authApi.setPassword(data.token, data.password);
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Invalid request",
        description: "Token not found",
      });
      return;
    }

    resetPasswordMutation.mutate({
      token: token as string,
      password: data.newPassword,
    });
  };

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {resetPasswordMutation.isPending ? (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-gray-500">Resetting password...</p>
        </div>
      ) : (
        <>
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-8"
            variants={itemVariants}
          >
            Reset Your Password
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6 px-4"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className={`pr-10 h-12 ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.newPassword.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={"password"}
                  className={`pr-10 h-12 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Resetting...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </motion.form>

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
        </>
      )}
    </motion.div>
  );
}
