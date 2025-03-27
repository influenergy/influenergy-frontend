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
    <div className="flex flex-col lg:flex-row w-full px-6 md:px-12 lg:px-20 xl:px-24 py-14 gap-8 lg:gap-16 items-center max-w-[1440px] mx-auto">
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          How It works
        </h1>
        <p className="font-light text-lg text-gray-600 mb-8">
          AI Powered match making in 4 simple steps!
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Step 1 */}
          <motion.div
            className="w-full rounded-2xl p-4 md:p-6 bg-[#e6e6ff] transform transition-all duration-300 hover:shadow-lg"
            variants={item}
          >
            <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm -rotate-6">
              <Image
                src="/landing/howitworks/user.png"
                alt="Create Account Icon"
                height={35}
                width={35}
                quality={100}
              />
            </div>
            <h2 className="text-xl font-bold mt-4 md:mt-5">Create Account</h2>
            <p className="font-light text-sm md:text-base mt-2 text-gray-700">
              Join today to connect, collaborate, & grow. Create your account
              and unlock exclusive opportunities.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="w-full rounded-2xl p-4 md:p-6 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg"
            variants={item}
          >
            <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm rotate-6">
              <Image
                src="/landing/howitworks/image.png"
                alt="Post Ads Icon"
                height={45}
                width={45}
                quality={100}
              />
            </div>
            <h2 className="text-xl font-bold mt-4 md:mt-5">
              Post & Create Ads
            </h2>
            <p className="font-light text-sm md:text-base mt-2 text-gray-700">
              Effortlessly post and create targeted ads to attract influencers
              who align with your brand.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="w-full rounded-2xl p-4 md:p-6 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg"
            variants={item}
          >
            <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm rotate-6">
              <Image
                src="/landing/howitworks/sparkle.png"
                alt="AI Feature Icon"
                height={40}
                width={40}
                quality={100}
              />
            </div>
            <h2 className="text-xl font-bold mt-4 md:mt-5">
              Utilize AI Feature
            </h2>
            <p className="font-light text-sm md:text-base mt-2 text-gray-700">
              Leverage our advanced AI feature to effectively discover
              influencers who perfectly match your brands goals.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="w-full rounded-2xl p-4 md:p-6 bg-[#e6e6ff] transform transition-all duration-300 hover:shadow-lg"
            variants={item}
          >
            <div className="h-14 md:h-16 w-14 md:w-16 flex justify-center items-center bg-white rounded-lg shadow-sm -rotate-6">
              <Image
                src="/landing/howitworks/Group.png"
                alt="Collaboration Icon"
                height={45}
                width={45}
                quality={100}
              />
            </div>
            <h2 className="text-xl font-bold mt-4 md:mt-5">
              Seamless Collaboration
            </h2>
            <p className="font-light text-sm md:text-base mt-2 text-gray-700">
              Connect, create, and watch your brand grow.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side brand images */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col gap-10"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex h-full justify-center md:justify-end gap-6 mt-4">
          <motion.div
            className="h-full rounded-2xl"
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-lg">
              <Image
                src="/landing/howitworks/updateImage.webp"
                alt="How it works illustration"
                height={750}
                width={750}
                className="object-cover w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
