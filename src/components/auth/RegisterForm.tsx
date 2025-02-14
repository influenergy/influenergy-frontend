"use client";
import { useForm, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Mail, User, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";

const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .required("Required"),

  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
  userType: yup.string().oneOf(['creator', 'brand']).required(),
  terms: yup
    .boolean()
    .transform((value) => (value === "on" ? true : value)) // ✅ Converts "on" to true
    .oneOf([true], "You must accept the terms")
    .required(),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  name: keyof RegisterFormData;
  error?: FieldError;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const FormInput = ({ type, placeholder, register, name, error, icon, showPassword, onTogglePassword }: FormInputProps) => (
  <div className="space-y-2 relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border-b h-12 w-full px-5 focus:outline-none focus:border-b-2 focus:border-b-[#7877e6] font-light transition-all duration-300"
      />
      {onTogglePassword ? (
        <div 
          onClick={onTogglePassword}
          className="absolute right-4 top-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-300"
        >
          {icon}
        </div>
      ) : (
        <div className="absolute right-4 top-5 text-gray-400">
          {icon}
        </div>
      )}
    </motion.div>
    {error && (
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-sm text-red-500"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      userType: 'creator'
    }
  });

  const userType = watch("userType");

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      console.log(data);
      // const registerData = {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      //   password: data.password,
      //   userType: data.userType,
      // };
      // return authApi.register(registerData);
      return Promise.resolve(data);
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

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div 
        className="flex-1 flex justify-center items-center p-4 md:p-8 relative h-full overflow-y-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src="/images/line1.png" 
          alt="Logo" 
          width={400} 
          height={100} 
          className="absolute top-0 -right-36 -z-10 hidden md:block"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img 
          src="/images/line2.png" 
          alt="Logo" 
          width={400} 
          height={100} 
          className="absolute bottom-0 -right-36 -z-10 hidden md:block"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="max-w-2xl w-full space-y-8">
          <motion.h3 
            className="text-[#7877e6] font-bold text-3xl text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create Account
          </motion.h3>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10">
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormInput
                type="text"
                placeholder="Full Name"
                register={register}
                name="fullName"
                error={errors.fullName}
                icon={<UserRound className="h-6 w-6" />}
              />

              <FormInput
                type="email"
                placeholder="Email Address"
                register={register}
                name="email"
                error={errors.email}
                icon={<Mail className="h-6 w-6" />}
              />

              <FormInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                register={register}
                name="password"
                error={errors.password}
                icon={showPassword ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <FormInput
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                register={register}
                name="confirmPassword"
                error={errors.confirmPassword}
                icon={showPassword ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <motion.div
                className="flex items-center gap-2 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Checkbox
                  className="text-[#7877e6] bg-white border-[#7877e6] data-[state=checked]:bg-[#7877e6] data-[state=checked]:border-[#7877e6]"
                  {...register('terms')}
                />
                <p className="text-sm font-light">
                  I accept all{" "}
                  <Link href="/terms" className="underline text-[#7877e6] hover:text-[#6564d8] transition-colors">
                    terms of use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline text-[#7877e6] hover:text-[#6564d8] transition-colors">
                    privacy policy
                  </Link>
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-[#7877e6] hover:bg-[#6564d8] transition-all py-5 text-white text-lg font-semibold font-poppins rounded-full tracking-widest"
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

              <p className="text-center text-muted-foreground font-light">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[#7877e6] hover:text-[#6564d8] transition-colors">
                  Login
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>

      <motion.div 
        className="hidden md:block h-screen"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={"/images/register.webp"}
          className="w-full h-full object-contain"
          width={800}
          height={800}
          alt="register"
        />
      </motion.div>
    </div>
  );
}
