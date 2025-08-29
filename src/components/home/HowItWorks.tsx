"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 py-6 md:py-10 lg:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          How It Works
        </h1>
        <p className="text-gray-700 text-base font-light ">
          Tell us what you need - your goals, product, and target audience and let AI curate your brief
        </p>
      </div>
      <div className="grid lg:grid-cols-2 w-full gap-8 lg:gap-12 items-stretch  ">
        {/* Right side brand images */}
        <motion.div
          className="flex flex-col justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >


          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Step 1 */}
            <motion.div
              className="w-full rounded-2xl p-4 md:p-5 bg-[#e6e6ff] transform transition-all duration-300 hover:shadow-lg"
              variants={item}
            >
              <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm -rotate-6">
                <Image
                  src="https://d20cf3kfv1a9jn.cloudfront.net/images/user.png"
                  alt="Create Account Icon"
                  height={35}
                  width={35}
                  quality={100}
                />
              </div>
              <h2 className="text-lg font-bold mt-4 md:mt-5">
                Create Your Campaign
              </h2>
              <p className="text-gray-600 text-base mt-2 ">
                Tell us what you need—your goals, product, and target audience
                in a simplified brief
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="w-full rounded-2xl p-4 md:p-5 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg"
              variants={item}
            >
              <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm rotate-6">
                <Image
                  src="https://d20cf3kfv1a9jn.cloudfront.net/images/sparkle.png"
                  alt="AI Feature Icon"
                  height={40}
                  width={40}
                  quality={100}
                />
              </div>
              <h2 className="text-lg font-bold mt-4 md:mt-5">
                AI Powered Matching
              </h2>
              <p className="text-base  mt-2 text-gray-600">
                Our AI-Find matches your brand with verified creators that fit your brand
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="w-full rounded-2xl p-4 md:p-5 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg"
              variants={item}
            >
              <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm rotate-6">
                <Image
                  src="https://d20cf3kfv1a9jn.cloudfront.net/images/review.png"
                  alt="AI Feature Icon"
                  height={40}
                  width={40}
                  quality={100}
                />
              </div>
              <h2 className="text-lg font-bold mt-4 md:mt-5">
                Review & Approve
              </h2>
              <p className="text-base  mt-2 text-gray-600">
                Browse curated matches, review content examples, and approve
                your favorites
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="w-full rounded-2xl p-4 md:p-5 bg-[#e6e6ff] transform transition-all duration-300 hover:shadow-lg"
              variants={item}
            >
              <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm -rotate-6">
                <Image
                  src="https://d20cf3kfv1a9jn.cloudfront.net/images/Group.png"
                  alt="Collaboration Icon"
                  height={45}
                  width={45}
                  quality={100}
                />
              </div>
              <h2 className="text-lg font-bold mt-4 md:mt-5">
                Collaborate & Launch
              </h2>
              <p className="text-base  mt-2 text-gray-600">
                Message, pay, and launch content—all in one seamless platform
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {/* <div className="mt-6 flex-1"> */}
            <video
              controls
              width="100%"
              height="100%"
              style={{ borderRadius: '12px', height: '100%', background: '#000' }}
              className="w-full h-full object-contain rounded-lg bg-black"
            >
              {/* <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" /> */}
              <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
