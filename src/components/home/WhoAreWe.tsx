"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WhoAreWe() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] w-full px-6 lg:px-18 pt-[65%] md:pt-[45%] lg:pt-[20%] items-center justify-center mx-auto font-poppins">
      {/* Video Section */}
      <motion.div
        className="flex justify-start h-full relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src="https://d20cf3kfv1a9jn.cloudfront.net/images/hero.png" alt="Hero Image" width={800} height={800} className=" inset-0 object-fill rounded-lg z-0" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="flex flex-col justify-center items-center lg:items-start space-y-4 h-full mt-[10%] lg:-ml-[140%] lg:-mt-[90%]"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col space-y-5 mb-[4%]">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-[#352547] text-center lg:text-start">
            Who We Are
          </h1>
          <p className="text-gray-900 text-sm md:text-base leading-relaxed text-center md:text-start">
            We’re Influenergy an AI-powered platform that bridges the gap between brands and creators. Our platform streamlines Influencer collaborations through smart automation, saving time, maximizing campaign success, and ultimately delivering the best ROI.
          </p>
        </div>

        <div className="lg:ml-[55%]">
          <motion.div
            className="flex items-center justify-center relative lg:items-start lg:justify-start"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl flex items-center text-sm p-5 shadow-primary shadow-md" size="sm">
              <Link href="/get-started">Start a UGC Campaign </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
