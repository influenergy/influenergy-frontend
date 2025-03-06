"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegistrationSuccess() {
  const { width, height } = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Cleanup confetti after certain duration
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const [showConfetti, setShowConfetti] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-white">
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 text-center "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-5/6 ">
          <motion.div variants={itemVariants} className="w-full">
            <Image
              src="/auth/brand.webp"
              alt="Brand logo"
              height={400}
              width={200}
              className="object-contain ml-16"
              priority
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
            className="absolute -bottom-10 w-full h-full"
          >
            <Image
              src="/auth/celebration.png"
              alt="Person with coffee and tote bag"
              fill
              className="object-cover -rotate-45"
              priority
            />
          </motion.div>
        </div>
        <motion.h1
          className="text-3xl md:text-4xl text-black font-mono"
          variants={itemVariants}
        >
          Woohooo!
        </motion.h1>
        <motion.p
          className="text-center text-gray-700 text-lg md:text-xl"
          variants={itemVariants}
        >
          Registration Successful! We Will Get Back To You Soon.
          <br />
          Till Then Explore More.
        </motion.p>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Home
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative elements with animated opacity */}
      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-0 right-0 -z-10"
      >
        <Image
          src="/images/line1.png"
          width={300}
          height={300}
          alt=""
          className="w-[200px] sm:w-[300px]"
          priority={false}
        />
      </motion.div>
      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 -left-10 -z-10"
      >
        <Image
          src="/images/line1.png"
          width={300}
          height={300}
          alt=""
          className="w-[200px] sm:w-[300px]"
          priority={false}
        />
      </motion.div>

      {/* Confetti effect */}
      {showConfetti && isMounted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={100}
          gravity={0.05}
        />
      )}
    </div>
  );
}
