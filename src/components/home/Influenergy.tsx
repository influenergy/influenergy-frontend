"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InfluEnergySection() {
  return (
    <div className="w-full flex justify-center items-center flex-col text-center px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#EAE6FA] h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] mt-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-9xl mx-auto"
      >
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
          <span className="text-[#6C63FF]">INFLUENERGY</span>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/landing/circleImage1.png"
              alt="Icon"
              width={70}
              height={70}
              className="rounded-full object-cover inline-block align-middle mx-2 shadow-md"
            />
          </motion.span>
          CONNECTS GLOBAL <br className="hidden md:block" />
          CREATORS WITH BRANDS,{" "}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/landing/circleImage2.png"
              alt="Icon"
              width={70}
              height={70}
              className="rounded-full object-cover inline-block align-middle mx-2 shadow-md"
            />
          </motion.span>
          <br className="hidden md:block" />
          TO CREATE
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/landing/circleImage3.png"
              alt="Icon"
              width={70}
              height={70}
              className="rounded-full object-cover inline-block align-middle mx-2 shadow-md"
            />
          </motion.span>
          CROSS-CULTURAL PARTNERSHIPS.
        </p>
      </motion.div>
    </div>
  );
}
