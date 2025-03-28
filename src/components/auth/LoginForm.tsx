"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowLeft, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { loginSchema } from "@/lib/AuthSchema";
import { LoginFormInput } from "./FormInput";
import { useAppDispatch, useAppSelector } from "@/store";
import { authApi } from "@/services/authServices";
import { useToast } from "@/hooks/use-toast";
import { setCredentials } from "@/store/features/authSlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const userType = useAppSelector((state) => state.auth.userType);

  if (!userType) {
    router.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userType: userType as "creator" | "brand",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      return authApi.login(data);
    },
    onSuccess: (data) => {
      if (userType !== null) {
        // Store authentication state
        dispatch(
          setCredentials({
            user: data?.data,
          })
        );

        // Clear browser history and replace current URL with dashboard
        // This prevents going back to login page
        router.replace("/dashboard");
      }
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to register. Please try again.",
      });
    },
  });



  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      toast({
        variant: "destructive",
        title: "Email is required",
        description: "Please enter your email to reset your password",
      });
      return;
    }

    if (!userType) {
      toast({
        variant: "destructive",
        title: "User type is required",
        description: "Please select your user type",
      });
      return;
    }

    try {
      setIsResetting(true);
      await authApi.forgotPassword(forgotPasswordEmail, userType);
      toast({
        title: "Email sent successfully",
        description: "Check your email to reset your password",
      });
      setForgotPasswordEmail("");
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send email",
        description:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Please check your email and try again",
      });
    } finally {
      setIsResetting(false);
    }
  };

  const imageUrl =
    userType === "creator"
      ? "https://d20cf3kfv1a9jn.cloudfront.net/images/login_creator.webp"
      : "https://d20cf3kfv1a9jn.cloudfront.net/images/brand_login.webp";

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div
        className="flex-1 flex justify-center items-center px-4 py-6 sm:py-8 md:p-12 lg:p-16 relative min-h-[70vh] md:min-h-screen"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-0 -right-36 -z-10 hidden md:block w-[300px] lg:w-[400px]"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/line1.png"
            alt=""
            width={400}
            height={150}
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 -right-36 -z-10 hidden md:block w-[300px] lg:w-[400px]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/line2.png"
            alt=""
            width={400}
            height={150}
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>

        <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-lg ">
          <Link href="/get-started">
            <motion.button
              className="text-sm flex items-center space-x-2 mb-4 text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </motion.button>
          </Link>
          <motion.h3
            className="text-black font-bold text-2xl sm:text-3xl text-left capitalize mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Login To Your {userType} Account
          </motion.h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-5"
          >
            <motion.div
              className="space-y-4 sm:space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm sm:text-base mb-1 block"
                >
                  Email
                </Label>
                <LoginFormInput
                  type="email"
                  placeholder="Enter Email Address"
                  register={register}
                  name="email"
                  error={errors.email}
                  icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm sm:text-base mb-1 block"
                >
                  Password
                </Label>
                <LoginFormInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  register={register}
                  name="password"
                  error={errors.password}
                  icon={
                    showPassword ? (
                      <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                    )
                  }
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary transition-all py-6 sm:py-7 text-white text-base sm:text-lg font-semibold font-poppins rounded-lg tracking-wider sm:tracking-widest disabled:opacity-70"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Moved Dialog outside of the form to prevent form submission */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                type="button"
                className="w-full justify-end"
              >
                Forgot Password?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Forgot Password</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="forgotEmail" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="forgotEmail"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="col-span-3"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isResetting}
                    className="bg-primary"
                  >
                    {isResetting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Email"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <p className="text-center text-sm sm:text-base text-muted-foreground font-light mt-10">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?role=${userType}`}
              className="font-medium text-primary hover:text-primary transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex md:w-[45%] lg:w-[40%] relative bg-gray-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-screen">
          <Image
            src={imageUrl}
            alt={`${userType} login background`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={80}
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}
