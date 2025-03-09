"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function WhoAreWe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-full px-6 md:px-16 lg:px-24 py-20 md:py-28 gap-10 items-center max-w-[1440px] mx-auto">
      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/landing/whoarewe.webp"
          alt="Who we are"
          width={500}
          height={500}
          className="rounded-3xl object-cover shadow-lg"
        />
      </motion.div>

      <motion.div
        className="flex flex-col justify-start space-y-8 h-full"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Who We Are
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          We are Influenergy, the AI-powered bridge between brands and UGC
          creators. We simplify the influencer collaboration process by
          automating creator-brand matching and maximizing campaign impact.
        </p>
        <motion.div
          className="flex items-center relative"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-full p-6  flex items-center">
            <Link href="/get-started">Explore Now</Link>
          </Button>
          <div className="bg-primary rounded-full p-3.5 absolute left-32 ml-1 hover:bg-primary/90">
            <Link href="/get-started">
              <MoveUpRight size={20} className="text-white" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
