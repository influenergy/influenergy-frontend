"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ComingSoon from "@/components/common/ComingSoon";

export default function Page() {

  return (
    <div className="min-h-[calc(100vh-80px)] relative px-4 sm:px-8 py-5 overflow-hidden bg-white">
      <div className="h-full relative z-10">
        <ComingSoon />
      </div>

      {/* Decorative elements with adjusted positioning */}
      <motion.div
        className="absolute bottom-0 -left-24 hidden md:block w-[300px] lg:w-[400px] pointer-events-none z-10"
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
        className="absolute top-0 -right-24 hidden md:block w-[300px] lg:w-[400px] pointer-events-none z-10"
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
