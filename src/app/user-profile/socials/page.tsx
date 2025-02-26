"use client";
// import { Button } from "@/components/ui/button";
// import { socialSchema } from "@/lib/SocialSchema";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
import Image from "next/image";
// import { SocialLinkInput } from "@/components/userProfile/SocialLinkInput";
import ComingSoon from "@/components/common/ComingSoon";

// type ProfileFormData = yup.InferType<typeof socialSchema>;

export default function Page() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<ProfileFormData>({
  //   resolver: yupResolver(socialSchema),
  // });

  // const onSubmit = async (data: ProfileFormData) => {
  //   try {
  //     console.log(data);
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     // Add your API call here
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* <div className="max-w-4xl mx-auto mt-10">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Linked Accounts
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Connect your social media accounts to enhance your profile
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4">
            {["instagram", "snapchat", "tiktok"].map((platform) => (
              <SocialLinkInput
                key={platform}
                name={platform as "instagram" | "snapchat" | "tiktok"}
                icon={`${platform}.webp`}
                register={register}
                error={errors[platform as "instagram" | "snapchat" | "tiktok"]}
              />
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="bg-primary text-white w-full w:2/4 md:w-3/4 px-8 h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div> */}
      <ComingSoon/>
      {/* Decorative left lines  */}
      <motion.div
        className="absolute -bottom-5 -left-24 hidden md:block w-[300px] lg:w-[400px]"
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

      {/* Decorative right lines  */}

      <motion.div
        className="absolute -top-1 -right-24 z-10 hidden md:block w-[300px] lg:w-[400px]"
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
  );
}
