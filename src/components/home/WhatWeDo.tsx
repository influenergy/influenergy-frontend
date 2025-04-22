"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatWeDo() {
  return (
    <div className="w-full  flex items-center justify-center my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full px-6 sm:px-12  py-2 md:py-2 gap-8 md:gap-12 items-start max-w-7xl">
        {/* Left column - Text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 md:mb-0 "
        >
          <div className="flex flex-col justify-start mb-8">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              What We Do
            </h1>
            <p className="text-gray-600 font-light text-lg leading-relaxed">
              We simplify the process of connecting with high-performing UGC
              creators through AI-powered matchmaking
            </p>
          </div>

          <div className="flex flex-col space-y-8">
            <motion.div
              className="flex items-start gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Image
                  src="/landing/whatwedo/sparkle.png"
                  width={35}
                  height={35}
                  alt="Marketing Icon"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  AI Powered Solution
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  AI-Find tool that seamless finds the best creator for brands
                  to use for UGC & Influencer Campaigns
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Image
                  src="/landing/whatwedo/bulb.png"
                  width={35}
                  height={35}
                  alt="AI Solution Icon"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  Time Saving Influencer Marketing
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Save time on creator discovery with custom briefs &
                  personalized pitches tailored to your brand
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Image
                  src="/landing/whatwedo/payment.png"
                  width={35}
                  height={35}
                  alt="AI Solution Icon"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  Flexible Payment Plans & Seamless Transactions
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Our payment options and built-in transaction tools make it
                  easy to pay creators securely and on your terms
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right column - Images grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 place-content-center w-full max-w-md mx-auto md:max-w-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative aspect-square rounded-tl-3xl overflow-hidden shadow-md"
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
            className="relative  aspect-square rounded-full overflow-hidden shadow-md"
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
            className="relative  aspect-square rounded-b-3xl overflow-hidden shadow-md"
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
            className="relative  aspect-square rounded-tr-3xl rounded-b-3xl overflow-hidden shadow-md"
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
    </div>
  );
}
