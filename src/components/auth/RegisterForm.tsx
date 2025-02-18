"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter,useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
import { registerSchema } from "@/lib/AuthSchema";
import { RegisterFormInput } from "./FormInput";
import { authApi } from "@/services/api";

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const userType = useSearchParams().get("role");

  if (!userType) {
    router.push("/");
    return;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      // return Promise.resolve();

      return authApi.register({
        full_name: data.fullName,
        email: data.email,
        password: data.password,
        userType: userType,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/verify-email");
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Form submission started", data);
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

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
            alt="Decorative line"
            width={400}
            height={100}
            className="w-full h-auto"
            priority
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
            alt="Decorative line"
            width={400}
            height={100}
            className="w-full h-auto"
          />
        </motion.div>

        <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-lg space-y-6 md:space-y-8">
          <motion.h3
            className="text-[#7877e6] font-bold text-2xl sm:text-3xl text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create Account
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
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                register={register}
                name="confirmPassword"
                error={errors.confirmPassword}
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

              <motion.div
                className="flex items-start sm:items-center gap-2 text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Checkbox
                  className="mt-1 sm:mt-0 text-[#7877e6] bg-white border-[#7877e6] 
                  data-[state=checked]:bg-[#7877e6] data-[state=checked]:border-[#7877e6]"
                  checked={watch("terms") ?? false} // Ensure default value is boolean
                  onCheckedChange={(checked) =>
                    setValue("terms", Boolean(checked))
                  } // Explicitly cast to boolean
                />

                <p className="text-xs sm:text-sm font-light">
                  I accept all{" "}
                  <Link
                    href="/terms"
                    className="underline text-[#7877e6] hover:text-[#6564d8] transition-colors"
                  >
                    terms of use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline text-[#7877e6] hover:text-[#6564d8] transition-colors"
                  >
                    privacy policy
                  </Link>
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
                className="w-full bg-[#7877e6] hover:bg-[#6564d8] transition-all py-6 sm:py-7 text-white 
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

              <p className="text-center text-sm sm:text-base text-muted-foreground font-light">
                Already have an account?{" "}
                <Link
                  href={`/login?role=${userType}`}
                  className="font-medium text-[#7877e6] hover:text-[#6564d8] transition-colors"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </form>
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
            src="/images/register.webp"
            alt="Register illustration"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
