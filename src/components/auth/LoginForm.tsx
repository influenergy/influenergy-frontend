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
import creatorHeroImg from "../../../public/Rectangle 4587.png";
import sittingImg from "../../../public/sitting.png";
import Footer from "../home/Footer";
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

  // const imageUrl =
  //   userType === "creator"
  //     ? "https://d20cf3kfv1a9jn.cloudfront.net/images/login_creator.webp"
  //     : "https://d20cf3kfv1a9jn.cloudfront.net/images/brand_login.webp";
  const imageUrl =
    userType === "creator"
      ? creatorHeroImg
      : "https://d20cf3kfv1a9jn.cloudfront.net/images/brand_login.webp";

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden ">
      <div className="w-full">
        {/* Form container, ensure it's above the background */}
        <motion.div
          className="relative z-10 flex-1 flex justify-center items-center  sm:px-8 md:px-9 lg:px-10 py-3 md:py-6 lg:py-8 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section className="flex w-full flex-col">
            <div className=" top-4 flex items-center px-4 mb-4">

              <Link href="/get-started">
                <motion.button
                  className="text-sm flex items-center space-x-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-2 md:gap-8 lg:gap-12">
              <div className="w-full border rounded-[7%] px-5 py-10 shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)]">
                <motion.h3
                  className="text-black font-bold text-1xl sm:text-2xl text-left capitalize mb-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Log In To Your {userType} Account
                </motion.h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 sm:space-y-5 "
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
                        autoComplete="current-password"
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
                      className="w-full bg-primary hover:bg-primary transition-all py-4 sm:py-5 text-white text-base sm:text-lg font-semibold font-poppins rounded-lg tracking-wider sm:tracking-widest disabled:opacity-70"
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
                  <div className="w-full flex justify-end items-center">
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        type="button"
                        className="inline-flex"
                      >
                        Forgot Password?
                      </Button>
                    </DialogTrigger>
                  </div>
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
                          onChange={(e) =>
                            setForgotPasswordEmail(e.target.value)
                          }
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
              {/* Image Section */}
              <motion.div
                className="bg-gray-50 hidden md:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full hidden md:block rounded-[7%] overflow-hidden bg-transparent hover:scale-[1.02] transition fade-in-out duration-300">
                  <Image
                    src={imageUrl}
                    alt={`${userType} login background`}
                    fill
                    className="object-fill bg-transparent z-0"
                    quality={80}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>

      {/* SUCCESS STORIES SECTION */}
      <section className="bg-[#f5f2ff] py-16 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Our creator success stories
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mb-10">
            Explore real-life examples of how creators are using Influenery to
            connect with top brands and achieve their goals.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col sm:flex-row w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-dashed border-[#c8c8f1]"
          >
            {/* Image */}
            <div className="w-full sm:w-[261px] h-[240px] sm:h-auto relative">
              <Image
                src={sittingImg}
                alt="Creator Success Stories"
                fill
                className="object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-6 w-full">
              <div className="flex flex-col sm:flex-row gap-6 mb-4 ">
                <div>
                  <span className="text-gray-400 block">Creator</span>
                  <p className="font-semibold text-black">Adam</p>
                </div>
                <div>
                  <span className="text-gray-400 block">Joined On</span>
                  <p className="font-semibold text-black">12th Sep 2025</p>
                </div>
                <div>
                  <span className="text-gray-400 block">Videos Created</span>
                  <p className="font-semibold text-black">451</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                Adam, a lifestyle creator from Austin, turned his passion for
                self-care and storytelling into a thriving career. Through
                Influenery, he connected with over 15 brands in 8 months — creating
                authentic product videos that reached 1M+ viewers. He doubled his
                income and landed a long-term brand deal, all while working from his
                home studio.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* METRICS ROW */}
      <div className="w-full py-12 px-4 text-center grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-700">Trusted by brands</p>
          <h3 className="text-6xl font-bold text-[#8055FE]">100+</h3>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-700">Home to Creators</p>
          <h3 className="text-6xl font-bold text-[#8055FE]">170+</h3>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-700">Average earning </p>
          <h3 className="text-6xl font-bold text-[#8055FE]">
            125k{" "}
            <span className="text-sm font-bold text-[#8055FE]">per annum</span>
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}
