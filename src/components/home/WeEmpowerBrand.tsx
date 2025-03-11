"use client";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WeEmpowerBrand() {
  return (
    <div className="bg-[#fefaf6] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 lg:px-24 py-16 gap-10 md:gap-16 items-center max-w-[1440px] mx-auto ">
        {/* Left Column - Profile Card */}
        <motion.div
          className="flex justify-center items-center relative"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className=" w-full max-w-[500px] max-h-[500px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/landing/sandy.jpg"
              alt="Sandeep Ashdir"
              width={500}
              height={400}
              className="w-full object-contain"
            />
          </motion.div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white p-4 text-center rounded-b-xl w-[350px] rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900">Sandeep Asdhir</h3>
            <p className="text-gray-600 mt-1">Founder, CEO</p>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="flex flex-col space-y-6 sm:mt-5"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            We Empower Brands
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            Sandy is not afraid to roll up his sleeves and get things done,
            whether it is automating YouTube channels, designing clothes, or
            analyzing multi-million-dollar deals in the venture world. He is a
            passionate entrepreneur with a knack for content creation, a keen
            eye for trends, and a sharp financial mind.
          </p>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="#"
              className={`bg-primary w-fit text-white border border-primary hover:bg-white hover:text-primary  transition-colors p-2.5 rounded-full hover:scale-105 flex items-center justify-center`}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
