"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const imageList = [
    { logo: "/landing/company1.png" },
    { logo: "/landing/company2.png" },
    { logo: "/landing/company3.png" },
  ];

  return (
    <div className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] flex items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <Image
        src="/landing/image1.webp"
        alt="Landing Page Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content */}
      <motion.div
        className="relative z-10 text-white max-w-5xl px-6 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          YOUR CREATORS AND <br className="hidden sm:block" /> BRAND AGENCY
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl mx-auto max-w-3xl">
          Lets create AI & Tech Influencer campaigns that connect, inspire, and
          perform to empower brands.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-md px-8 py-6 text-lg"
            onClick={() => router.push("/get-started")}
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      {/* Companies Bar - Repositioned for better centering */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center w-full">
        <motion.div
          className="relative -bottom-14 px-6 py-4 w-11/12 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl shadow-xl bg-white z-20 mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-lg sm:text-xl font-semibold whitespace-nowrap">
            You are in a{" "}
            <Label className="text-primary text-lg font-semibold">
              Good Company
            </Label>
          </p>

          <div className="flex items-center gap-8 overflow-x-auto py-2 sm:py-0">
            {imageList.map((company, index) => (
              <Image
                src={company.logo}
                key={index}
                alt={`Partner company ${index + 1}`}
                width={100}
                height={50}
                className="object-contain h-12"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
