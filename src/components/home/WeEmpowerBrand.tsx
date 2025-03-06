"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WeEmpowerBrand() {
  return (
    <div className="bg-[#fefaf6] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 lg:px-24 py-20 md:py-28 gap-10 md:gap-16 items-center max-w-[1440px] mx-auto ">
        {/* Left Column - Profile Card */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-[400px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/landing/sandeep.png"
              alt="Sandeep Ashdhir"
              width={400}
              height={350}
              className="w-full object-cover"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white p-5 text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Sandeep Ashdhir
              </h3>
              <p className="text-gray-600 text-sm">Founder, CEO</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="flex flex-col space-y-6"
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

          <motion.blockquote
            className="border-l-4 border-primary pl-6 italic text-gray-600 my-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500
          </motion.blockquote>
        </motion.div>
      </div>
    </div>
  );
}
