"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

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

  // max-w-[1440px]

  return (
    <div className="bg-white w-full mx-auto px-6 lg:px-20 xl:px-24 py-6 md:py-16">
      <div className="mb-8 flex flex-col justify-center items-center text-center gap-3">
        <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-[#352547]">
          How It Works
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
          Get started in minutes and begin collaborating with top brands. Our streamlined process makes influencer marketing simple and effective.
        </p>
      </div>
      <div className="grid w-full gap-8 lg:gap-12 items-stretch  ">
        {/* Right side brand images */}
        <motion.div
          className="flex flex-col justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Step 1 */}
            <motion.div
              className="relative w-full rounded-2xl p-4 md:p-5 bg-white transform transition-all duration-300 hover:shadow-lg border border-gray-300"
              variants={item}
            >
              <p className="absolute -right-3 -top-3 bg-primary rounded-full text-white w-7 py-0.5 text-center">01</p>
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
                Launch Your Camapign
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Sign up and build your creator profile with your content style, audience demographics, and areas of expertise.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="relative w-full rounded-2xl p-4 md:p-5 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg border border-gray-300"
              variants={item}
            >
              <p className="absolute -right-3 -top-3 bg-primary rounded-full text-white w-7 px-1 py-0.5 text-center">02</p>
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
                AI Matchmaking
              </h2>
              <p className="text-sm mt-2 text-gray-600">
                Browse through curated campaigns from top brands or get personalized recommendations based on your profile.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="relative w-full rounded-2xl p-4 md:p-5 bg-white transform transition-all duration-300 hover:shadow-lg border border-gray-300"
              variants={item}
            >
              <p className="absolute -right-3 -top-3 bg-primary rounded-full text-white w-7 px-1 py-0.5 text-center">03</p>
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
                Collaborate & Deliver
              </h2>
              <p className="text-sm mt-2 text-gray-600">
                Apply to campaigns, negotiate terms, and communicate directly with brands through our secure platform.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="relative w-full rounded-2xl p-4 md:p-5 bg-[#fff9f2] transform transition-all duration-300 hover:shadow-lg border border-gray-300"
              variants={item}
            >
              <p className="absolute -right-3 -top-3 bg-primary rounded-full text-white w-7 px-1 py-0.5 text-center">04</p>
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
                Approve & Get Paid
              </h2>
              <p className="text-sm mt-2 text-gray-600">
                Deliver your content, track performance, and receive secure payments once the work is approved.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center relative"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl flex items-center text-sm p-5 shadow-primary shadow-md" size="sm">
            <Link href="/get-started">Connect with Collaborators</Link>
          </Button>
        </motion.div>

      </div>
    </div >
  );
}
