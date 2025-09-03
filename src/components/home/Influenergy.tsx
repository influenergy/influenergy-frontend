"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InfluEnergySection() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#EAE6FA] pt-10 pb-20 font-nirmala rounded-lg">
      
      {/* Animated Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full max-w-2xl aspect-[16/9] mb-10"
      >
        <Image
          src="https://d20cf3kfv1a9jn.cloudfront.net/images/group.svg"
          alt="Influenergy Group"
          fill
          priority
          className="object-contain md:object-contain rounded-xl"
        />
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <p className="font-semibold text-black leading-normal text-[clamp(1.5rem,4vw,1.8rem)] px-2">
          OUR POWERFUL
          <span className="text-primary"> AI-FIND TOOL</span> 
           CONNECTS
          CREATORS AND BRANDS UNLOCKING PARTNERSHIPS 
          THAT <span className="text-primary"> DELIVER RESULTS</span>
        </p>
      </motion.div>
    </div>
  );
}
