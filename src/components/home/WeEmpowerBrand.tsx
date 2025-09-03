"use client";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WeEmpowerBrand() {
  return (
    <div className="bg-[#fefaf6] w-full">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 px-6 md:px-16 lg:px-24 py-6 md:py-10 lg:py-16 gap-10 md:gap-16 items-start max-w-[1440px] mx-auto">

        {/* Left Column - Profile Card */}
        <motion.div
          className="flex justify-center items-center relative flex-1 h-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className=" w-full max-w-[500px] max-h-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="https://d20cf3kfv1a9jn.cloudfront.net/images/sandy.jpg"
              alt="Sandeep Ashdir"
              width={500}
              height={300}
              className="object-cover aspect-video"
            />
          </motion.div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white p-4 text-center rounded-b-xl w-[350px] rounded-2xl shadow-lg ">
            <h3 className="text-2xl font-bold text-gray-900">Sandeep Asdhir</h3>
            <p className="text-gray-600 mt-1">Founder & CEO, Influenergy</p>
            <motion.div
              initial={{ y: 5 }}
              whileHover={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className=" w-fit absolute bottom-3 right-3 -translate-x-1/2 flex space-x-4"
            >
              <Link
                href="https://www.linkedin.com/company/influenergy-marketing/"
                className={`bg-primary w-fit text-white border border-primary hover:bg-white hover:text-primary  transition-colors p-1 rounded-full hover:scale-105 flex items-center justify-center`}
              >
                <Linkedin className="h-4 w-4" fill="#fff" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="flex flex-col space-y-6  sm:mt-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold lg:whitespace-nowrap">
            A Message From Founder
          </h2>

          <p className="text-gray-700 text-lg leading-normal text-justify">
          When I launched Influenergy, I noticed two major issues in Influencer marketing: brands spent endless hours searching for the right creators, and creators faced unclear briefs, slow payments, and frustrating back-and-forth. The process was time-consuming, and both sides fell short.
            <br />
            <br />
            Influenergy is built to fix that. Our AI-Find tool instantly connects brands with vetted creators who perfectly match their niche, while our built-in contracts, payment options, and streamlined AI-briefs make campaigns simple and efficient.
            <br />
            <br />
            Whether you’re a brand aiming to scale campaigns or a creator seeking consistent work, we’re here to make success faster, easier, and stress-free.

          </p>
        </motion.div>
      </div>
    </div>
  );
}
