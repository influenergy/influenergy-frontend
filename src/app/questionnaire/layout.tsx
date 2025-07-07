"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 max-w-full">
      {children}
      <motion.div
        className="absolute bottom-0 left-0 hidden lg:block w-[200px] lg:w-[200px] "
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src="/images/line1.png"
          alt="Decorative line"
          width={250}
          height={200}
          className="w-full h-auto object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 z-10 hidden lg:block  w-[200px] lg:w-[200px]"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/line1.png"
          alt="Decorative line"
          width={250}
          height={200}
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  );
}
