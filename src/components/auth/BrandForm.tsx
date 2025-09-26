"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Loader2, Mail, UserRound, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
import { brandRegisterSchema } from "@/lib/AuthSchema";
import { RegisterFormInput } from "./FormInput";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/services/authServices";
import { useState } from "react";
import Footer from "../home/Footer";
import GoogleAuth from "./GoogleAuth";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

type BrandRegisterFormData = yup.InferType<typeof brandRegisterSchema>;

interface BrandRegister {
  fullName: string;
  companyEmail: string;
  companyName?: string;
  companyWebsite?: string;
  password: string;
}

export default function BrandRegisterForm({ userType }: { userType: string }) {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<BrandRegisterFormData>({
    resolver: yupResolver(brandRegisterSchema),
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: BrandRegisterFormData) => {
      if (!authApi?.brandRegister) {
        throw new Error("Registration service is not available");
      }
      const obj: BrandRegister = {
        fullName: data.fullName,
        companyEmail: data.companyEmail,
        password: data.password,
      };
      if (data.companyName) {
        obj["companyName"] = data.companyName;
      }
      if (data.companyWebsite) {
        obj["companyWebsite"] = data.companyWebsite;
      }
      return authApi.brandRegister(obj);
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data?.data }))
      router.replace("/dashboard");
      reset();
    },
    onError: (error: unknown) => {
      console.error("Registration error:", error);
      const description = isAxiosError(error)
        ? error.response?.data?.message
        : (error as Error)?.message;
      toast({
        variant: "destructive",
        title: "Registeration failed",
        description: description || "Failed to register. Please try again.",
      });
    },
  });

  const onSubmit = async (data: BrandRegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <>

      <div className="relative w-full min-h-screen flex flex-col overflow-hidden ">
        {registerMutation.isPending && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-primary">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Creating account...</span>
            </div>
          </div>
        )}

        <div className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden relative">

          <motion.div
            className="flex-1 flex justify-center items-center px-4 py-6 sm:py-8 md:p-12 lg:p-16 relative min-h-[70vh] md:min-h-screen"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >


            <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-lg space-y-6 md:space-y-8">
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
                className="text-primary font-bold text-2xl sm:text-3xl text-left capitalize"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create Your {userType} Account
              </motion.h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 sm:space-y-10"
              >
                <motion.div
                  className="space-y-4 sm:space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <RegisterFormInput
                    type="text"
                    placeholder="Full Name*"
                    register={register}
                    name="fullName"
                    error={errors.fullName}
                    icon={<UserRound className="h-5 w-5 sm:h-6 sm:w-6" />}
                  />

                  <RegisterFormInput
                    type="text"
                    placeholder="Company Name"
                    register={register}
                    name="companyName"
                    error={errors.companyName}
                    icon={<UserRound className="h-5 w-5 sm:h-6 sm:w-6" />}
                  />

                  <RegisterFormInput
                    type="email"
                    placeholder="Company Email Address*"
                    register={register}
                    name="companyEmail"
                    error={errors.companyEmail}
                    icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
                  />

                  <RegisterFormInput
                    type="text"
                    placeholder="Company Website"
                    register={register}
                    name="companyWebsite"
                    error={errors.companyWebsite}
                    icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
                  />

                  <RegisterFormInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    register={register}
                    name="password"
                    error={errors.password}
                    icon={showPassword ? (
                      <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                    onTogglePassword={() => setShowPassword((p) => !p)}
                  />

                  <RegisterFormInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    register={register}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    icon={showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                    onTogglePassword={() => setShowConfirmPassword((p) => !p)}
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
                      checked={watch("terms") ?? false}
                      onCheckedChange={async (checked) => {
                        setValue("terms", Boolean(checked));
                        await trigger("terms"); // Trigger validation for 'terms' field
                      }}
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
          </motion.div>

          <motion.div
            className="hidden md:flex md:w-[45%] lg:w-[40%] relative bg-gray-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full">
              <Image
                src={`https://d20cf3kfv1a9jn.cloudfront.net/images/register_brand1.webp`}
                alt=""
                fill
                className="object-cover object-center"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                priority
              />
            </div>
          </motion.div>
        </div>
        {/* <section className="bg-[#f5f2ff] py-16 px-4 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center max-w-5xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Brand Testimonials
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mb-10">
                iscover how leading brands have experienced growth, innovation, and success through our partnerships.
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
                      <span className="text-gray-400 block">Brand</span>
                      <p className="font-semibold text-black">Starkbucks</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Joined On</span>
                      <p className="font-semibold text-black">12th Sep 2025</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Total Collaboration</span>
                      <p className="font-semibold text-black">51</p>
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

        <Footer />
      </div>

    </>
  );
}
