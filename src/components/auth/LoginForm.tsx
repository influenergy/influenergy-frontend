"use client";
import { useForm, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { loginSchema } from "@/lib/AuthSchema";
import { LoginFormInput } from "./FormInput";
import { authApi } from "@/services/api";

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const user = localStorage.getItem("userType");
  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    router.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userType: "creator",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      console.log(data);
      return authApi.login(data);
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/questionnaire");
    }
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
            className="text-black font-bold text-2xl sm:text-3xl text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Login To Your Account
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
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm sm:text-base mb-1 block"
                >
                  Enter Email
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
                className="w-full bg-[#7877e6] hover:bg-[#6564d8] transition-all py-6 sm:py-7 text-white text-base sm:text-lg font-semibold font-poppins rounded-lg tracking-wider sm:tracking-widest disabled:opacity-70"
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

              <p className="text-center text-sm sm:text-base text-muted-foreground font-light">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#7877e6] hover:text-[#6564d8] transition-colors"
                >
                  Sign Up
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
            src="/images/login.webp"
            alt="Login illustration"
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
