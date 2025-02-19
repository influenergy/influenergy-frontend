"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { profileSchema } from "@/lib/ProfileSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type ProfileFormData = yup.InferType<typeof profileSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Add your API call here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gray-50 relative overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-4xl font-semibold text-center mb-8 text-black">
          Lets Complete Your Profile
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <input
                {...register("name")}
                className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-2 focus:border-primary font-light transition-all duration-300 rounded-xl text-base sm:text-lg"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Business Email</Label>
              <input
                {...register("businessEmail")}
                className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-2 focus:border-primary font-light transition-all duration-300 rounded-xl text-base sm:text-lg"
                placeholder="Enter your business email"
              />
              {errors.businessEmail && (
                <p className="text-sm text-red-500">
                  {errors.businessEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Company Website</Label>
              <input
                {...register("companyWebsite")}
                className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-2 focus:border-primary font-light transition-all duration-300 rounded-xl text-base sm:text-lg"
                placeholder="Add company website"
              />
              <p className="text-xs text-gray-500">e.g : https://example.com</p>
              {errors.companyWebsite && (
                <p className="text-sm text-red-500">
                  {errors.companyWebsite.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Number of Employees</Label>
              <input
                {...register("employeeCount")}
                type="number"
                className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-2 focus:border-primary font-light transition-all duration-300 rounded-xl text-base sm:text-lg"
                placeholder="Enter employee count"
              />
              {errors.employeeCount && (
                <p className="text-sm text-red-500">
                  {errors.employeeCount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              className="bg-primary text-white px-8 py-6 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
        {/* Decorative lines - hide on smaller screens */}
        <motion.div
          className="absolute -bottom-10 -left-24 hidden lg:block w-[300px] lg:w-[400px]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
          className="absolute top-0 -right-10 z-10 hidden lg:block w-[300px] lg:w-[400px]"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/line1.png"
            alt="Decorative line"
            width={400}
            height={100}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
