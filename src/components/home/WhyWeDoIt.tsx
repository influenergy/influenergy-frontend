"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function WhyWeDoIt() {
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
    <div className="bg-[#f7f6ff] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 lg:px-24 py-16 gap-10 items-center max-w-[1440px] mx-auto">
        {/* Left Column - Feature Cards */}
        <motion.div
          className="relative w-full space-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* AI-Powered Recommendations Card */}
          <motion.div
            className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-6"
            variants={item}
          >
            {/* Arrow 1 */}
            <motion.div
              className="hidden md:block"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Image
                src="/landing/whywedo/arrow1.png"
                width={80}
                height={80}
                alt="Arrow"
                className="mr-10"
              />
            </motion.div>

            <motion.div
              className="flex items-start gap-5 bg-white shadow-md p-6 rounded-xl max-w-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-16 w-16 bg-[#f0f2ff] rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/landing/whywedo/sparkle.png"
                  width={32}
                  height={32}
                  alt="AI Recommendations Icon"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  AI-Powered Recommendations
                </h3>
                <p className="text-gray-600 text-base">
                  AI-powered platform that connects brands, UGC creators, and
                  influencers.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Effortless Brand-Creator Connections Card */}
          <motion.div
            className="w-full flex flex-col md:flex-row md:items-center md:justify-evenly gap-6"
            variants={item}
          >
            <motion.div
              className="flex items-start gap-5 bg-white shadow-md p-6 rounded-xl max-w-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-16 w-16 bg-[#f0f2ff] rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/landing/whywedo/user.png"
                  width={32}
                  height={32}
                  alt="Brand-Creator Icon"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Effortless Brand-Creator Connections
                </h3>
                <p className="text-gray-600 text-base">
                  We streamline onboarding & brand-creator connections.
                </p>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
              className="hidden md:block"
              animate={{ x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >
              <Image
                src="/landing/whywedo/arrow2.png"
                width={80}
                height={80}
                alt="Arrow"
              />
            </motion.div>
          </motion.div>

          {/* Data-Driven Insights Card */}
          <motion.div
            className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-6"
            variants={item}
          >
            <motion.div
              className="flex items-start gap-5 bg-white shadow-md p-6 rounded-xl max-w-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-16 w-16 bg-[#f0f2ff] rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/landing/whywedo/box.png"
                  width={32}
                  height={32}
                  alt="Data Insights Icon"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Data-Driven Insights
                </h3>
                <p className="text-gray-600 text-base">
                  We help brands maximize ROI with data-backed insights.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="flex flex-col space-y-6 px-0 md:px-5"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Why We Do It
          </h2>
          <p className="text-gray-600 text-lg font-light">
            Finding the right creator for your brand should not be a hassle.
          </p>

          <div className="mt-6">
            <p className="text-xl leading-relaxed mb-8">
              Today consumers trust real stories from real creators. We empower
              brands to partner with UGC creators who drive genuine engagement,
              conversions, and ROI.
            </p>

            <motion.div
              className="flex items-center relative"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-full p-6  flex items-center">
                <Link href="/get-started">Explore Now</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
