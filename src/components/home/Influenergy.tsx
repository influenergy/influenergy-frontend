"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InfluEnergySection() {
  return (
    <div className="w-full flex justify-center items-center flex-col text-center px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#EAE6FA] h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] mt-10 font-nirmala">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-9xl mx-auto"
      >
        <p className="font-black text-black leading-tight text-[clamp(2rem,5vw,4.5rem)]">
          OUR
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
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full object-cover inline-block align-middle mx-1 sm:mx-2 shadow-md"
            />
          </motion.span>
          POWERFUL 
          <span className="text-primary"> AI-FIND </span>TOOL  CONNECTS 
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
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full object-cover inline-block align-middle mx-1 sm:mx-2 shadow-md"
            />
          </motion.span>
          CREATOR AND
          
          BRANDS UNLOCKING PARTNERSHIPS
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
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full object-cover inline-block align-middle mx-1 sm:mx-2 shadow-md"
            />
          </motion.span>
          THAT
          <span className="text-primary"> DELIVER RESULTS </span> 
          
        </p>
      </motion.div>
    </div>
  );
}
