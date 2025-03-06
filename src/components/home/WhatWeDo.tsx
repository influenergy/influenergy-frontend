"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatWeDo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-6 md:px-16 lg:px-24 py-20 md:py-28 gap-10 md:gap-16 items-center max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col justify-start mb-10">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            What We Do
          </h1>
          <p className="text-gray-600 font-light text-lg leading-relaxed">
            We simplify the process of finding, connecting, and collaborating
            with top creators and influencers for your brand.
          </p>
        </div>

        <div className="flex flex-col space-y-8">
          <motion.div
            className="flex items-start gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-16 w-16 bg-[#f0f2ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <Image
                src="/landing/whatwedo/bulb.png"
                width={32}
                height={32}
                alt="AI Solution Icon"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-2">
                AI Powered Solution
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                AI-powered platform that connects brands, UGC creators, and
                influencers
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-16 w-16 bg-[#f0f2ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <Image
                src="/landing/whatwedo/sparkle.png"
                width={32}
                height={32}
                alt="Marketing Icon"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-2">
                Smarter Influencer Marketing
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our technology makes influencer marketing smarter, faster, and
                more efficient.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Images grid */}
      <motion.div
        className="grid grid-cols-2 gap-5 md:gap-6 place-content-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="relative h-44 sm:h-48 md:h-56 aspect-square rounded-tl-3xl overflow-hidden shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/landing/whatwedo/1.webp"
            fill
            alt="Influencer marketing image 1"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="relative h-44 sm:h-48 md:h-56 aspect-square rounded-full overflow-hidden shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/landing/whatwedo/2.webp"
            fill
            alt="Influencer marketing image 2"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="relative h-44 sm:h-48 md:h-56 aspect-square rounded-b-3xl overflow-hidden shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/landing/whatwedo/3.webp"
            fill
            alt="Influencer marketing image 3"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="relative h-44 sm:h-48 md:h-56 aspect-square rounded-tr-3xl rounded-b-3xl overflow-hidden shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/landing/whatwedo/4.webp"
            fill
            alt="Influencer marketing image 4"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
