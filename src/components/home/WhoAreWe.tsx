"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WhoAreWe() {
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full px-6 md:px-16 lg:px-24 py-10 gap-10 md:mt-4 items-center max-w-[1440px] mx-auto font-poppins">
      {/* Video Section */}
      <motion.div
        className="flex justify-start h-full relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
          <Image src="/hero.jpg" alt="Hero Image" width={600} height={600} className="absolute inset-0 object-cover w-full h-full rounded-lg z-0" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="flex flex-col justify-center space-y-8 h-full "
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Who We Are
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          We’re Influenergy — an AI-powered platform that bridges the gap
          between brands and creators. Our platform streamlines Influencer
          collaborations through smart automation, saving time, maximizing
          campaign success, and ultimately delivering the best ROI.
        </p>
        <motion.div
          className="flex items-center relative"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl px-8 py-5 flex items-center text-lg" size="lg">
            <Link href="/get-started">Join Influenergy</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
