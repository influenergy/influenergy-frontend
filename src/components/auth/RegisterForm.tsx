"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Loader2, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
import { registerSchema } from "@/lib/AuthSchema";
import { RegisterFormInput } from "./FormInput";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/services/authServices";
import Footer from "../home/Footer";
import GoogleAuth from "./GoogleAuth";


type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm({ userType }: { userType: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      if (!authApi?.creatorRegister) {
        throw new Error("Registration service is not available");
      }
      return authApi.creatorRegister({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Registration successful. Please verify your email.",
      });
      router.push(`/verify-email?email=${watch("email")}`);
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to register. Please try again.",
      });
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="realtive w-full min-h-screen flex flex-col  overflow-hidden relative">
      <div className="w-full">
        {/* Main content */}
        <motion.div
          className="relative z-10 flex-1 flex justify-center items-center  sm:px-8 md:px-9 lg:px-10 py-3 md:py-6 lg:py-8 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section className="flex w-full flex-col">
            <div className="top-4 flex items-center px-4 mb-4">

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
                  className="text-primary font-bold text-2xl sm:text-3xl text-left capitalize mb-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Create your {userType} account
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
                    <RegisterFormInput
                      type="text"
                      placeholder="Full Name"
                      register={register}
                      name="fullName"
                      error={errors.fullName}
                      icon={<UserRound className="h-5 w-5 sm:h-6 sm:w-6" />}
                    />

                    <RegisterFormInput
                      type="email"
                      placeholder="Email Address"
                      register={register}
                      name="email"
                      error={errors.email}
                      icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
                    />

                    <RegisterFormInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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

                    <RegisterFormInput
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      register={register}
                      name="confirmPassword"
                      error={errors.confirmPassword}
                      icon={
                        showConfirmPassword ? (
                          <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                        ) : (
                          <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                        )
                      }
                      showPassword={showConfirmPassword}
                      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />

                    <motion.div
                      className="flex items-start sm:items-center gap-2 text-gray-500 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Checkbox
                        className="mt-1 sm:mt-0 text-primary bg-white border-primary 
                  data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        checked={watch("terms") ?? false} // Ensure default value is boolean
                        onCheckedChange={(checked) =>
                          setValue("terms", Boolean(checked))
                        } // Explicitly cast to boolean
                      />

                      <p className="text-xs sm:text-sm font-light">
                        I accept all{" "}
                        <a

                          href="https://d20cf3kfv1a9jn.cloudfront.net/docs/Influenergy - Terms of Service.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-primary hover:text-[#6564d8] transition-colors"
                        >
                          terms of use
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://d20cf3kfv1a9jn.cloudfront.net/docs/Influenergy - Privacy Policy.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-primary hover:text-[#6564d8] transition-colors"
                        >
                          privacy policy
                        </a>
                      </p>
                    </motion.div>
                    {errors.terms && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">
                        {errors.terms.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-[#6564d8] transition-all py-6 sm:py-7 text-white 
                  text-base sm:text-lg font-semibold font-poppins rounded-lg tracking-wider sm:tracking-widest 
                  disabled:opacity-70"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                 
                  </motion.div>
                </form>

                <motion.div
                    className="space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                   

                    <p className="text-center my-5 text-gray-400 font-[400]">Or continue with</p>

<GoogleAuth />

                    <p className="text-center text-sm sm:text-base text-muted-foreground font-light">
                      Already have an account?{" "}
                      <Link
                        href={`/login?role=${userType}`}
                        className="font-medium text-primary hover:text-[#6564d8] transition-colors"
                      >
                        Login
                      </Link>
                    </p>
                  </motion.div>
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
                    src={"https://d20cf3kfv1a9jn.cloudfront.net/images/Rectangle 4587.png"}
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

        <motion.div
          className="hidden md:flex md:w-[45%] lg:w-[40%] relative bg-gray-50"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full">
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/register.webp"
              alt="Register illustration"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* SUCCESS STORIES SECTION */}
      {/* <section className="bg-[#f5f2ff] py-16 px-4 sm:px-8">
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
            <div className="w-full sm:w-[261px] h-[240px] sm:h-auto relative">
              <Image
                src="https://d20cf3kfv1a9jn.cloudfront.net/images/sitting.png"
                alt="Creator Success Stories"
                fill
                className="object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
              />
            </div>

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
      </section> */}

      {/* METRICS ROW */}
      {/* <div className="w-full py-12 px-4 text-center grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white max-w-6xl mx-auto">
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
      </div> */}

      <Footer />
    </div>
  );
}
