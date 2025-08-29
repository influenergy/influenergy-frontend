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
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Cleanup confetti after certain duration
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image container with improved responsive layout */}
        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mb-6">
          <motion.div
            variants={itemVariants}
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/celebration.png"
              alt="Celebration"
              width={400}
              height={400}
              className="object-contain "
              priority
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative w-full h-full flex justify-center items-center z-20"
          >
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/brand.webp"
              alt="Brand logo"
              height={200}
              width={200}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <motion.h1
          className="text-3xl md:text-4xl text-primary font-bold"
          variants={itemVariants}
        >
          Woohooo!
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 text-base sm:text-lg md:text-xl px-4"
          variants={itemVariants}
        >
          Registration Successful! We will get back to you soon.
          <br />
          Till then explore more.
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

      {/* Decorative elements with responsive positioning */}
      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-0 right-0 w-1/2 max-w-[250px] -z-10"
      >
        <Image
          src="/images/line1.png"
          width={250}
          height={250}
          alt="Decorative line"
          className="w-full h-auto"
          priority={false}
        />
      </motion.div>

      <motion.div
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 w-1/2 max-w-[250px] -z-10"
      >
        <Image
          src="/images/line1.png"
          width={250}
          height={250}
          alt="Decorative line"
          className="w-full h-auto"
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
          confettiSource={{
            x: width / 2,
            y: height / 3,
            w: 0,
            h: 0,
          }}
        />
      )}
    </div>
  );
}
