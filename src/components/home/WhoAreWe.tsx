"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WhoAreWe() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full px-6 lg:px-24 py-10 gap-10 mt-52 items-center max-w-[1440px] mx-auto font-poppins">
      {/* Video Section */}
      <motion.div
        className="flex justify-start h-full relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
          <Image src="https://d20cf3kfv1a9jn.cloudfront.net/images/hero.png" alt="Hero Image" width={600} height={600} className=" inset-0 object-fill rounded-lg z-0" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="flex flex-col justify-center space-y-8 h-full lg:py-24"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-[#352547]">
          Who We Are
        </h1>
        <p className="text-gray-900 text-sm md:text-md leading-relaxed">
          We’re Influenergy — an AI-powered platform that bridges the gap between brands and creators. Our platform streamlines Influencer collaborations through smart automation, saving time, maximizing campaign success, and ultimately delivering the best ROI
        </p>
        <motion.div
          className="flex items-center justify-center relative md:items-start md:justify-start"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl flex items-center text-sm px-3 py-5" size="sm">
            <Link href="/get-started">Start a UGC Camapaign</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
