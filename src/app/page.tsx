"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full h-screen bg-white">
      <div className="mx-auto max-w-screen h-full">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[60%_40%] h-full">
          {/* Left Section */}
          <div className="space-y-8 flex flex-col justify-center px-5 md:px-10 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="space-y-5 pl-10">
                <h1 className="text-2xl font-medium md:text-4xl lg:text-5xl ml-10">
                  Join{" "}
                  <span className="text-[#7C3AED] font-bold">Influenergy</span>
                </h1>
                <p className="mt-5 text-xl text-gray-800">
                  Your Premier AI & Tech Influencer Marketing Agency
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4 px-5 md:px-14"
            >
              <Link
                href="/login?role=brand"
                className="group"
              >
                <div className="flex cursor-pointer h-48 w-52 flex-col  justify-between rounded-2xl bg-[#F4F3FF] p-6 transition-all hover:bg-[#7C3AED] hover:text-white">
                  <Image
                    src="/images/Home/icon.png"
                    alt="Brand Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <div>
                    <p className="text-sm">I'm a</p>
                    <p className="font-semibold text-gray-800 tracking-wide ">
                      Brand or Agency
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login?role=creator"
                className="group"
              >
                <div className="flex cursor-pointer h-48 w-52 flex-col  justify-between rounded-2xl bg-[#F4F3FF] p-6 transition-all hover:bg-[#7C3AED] hover:text-white">
                  <Image
                    src="/images/Home/icon1.png"
                    alt="Creator Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <div>
                    <p className="text-sm">I'm a</p>
                    <p className="font-semibold text-gray-800 tracking-wide">
                      Creator
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Section */}
          <motion.div className="relative bg-[#7877e6] h-full hidden lg:block">
            <div className="absolute -left-28 top-1/2  -translate-y-1/2">
              <Image
                src="/images/Home/image.png"
                alt="Influencer"
                width={250}
                height={250}
                className="relative object-contain"
                priority
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -left-16 top-48 -translate-x-1/2 transform rounded-full bg-white p-4 shadow-lg"
              >
                <div className="h-28 w-28 flex flex-col justify-center items-center gap-2">
                  <Image
                    src="/images/Home/icon2.png"
                    alt="Trust"
                    width={50}
                    height={50}
                  />
                  <p className="text-sm text-center text-gray-600">
                    100% Trusted Influencers
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col justify-around items-center h-full w-full ml-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-full bg-transparent p-4 border border-white"
              >
                <div className="h-28 w-28 flex flex-col justify-center items-center gap-2">
                  <Image
                    src="/images/Home/icon4.png"
                    alt="Trust"
                    width={50}
                    height={50}
                  />
                  <p className="text-sm text-center text-white">Play Video</p>
                </div>
              </motion.div>

              <Image
                src="/images/Home/image2.png"
                alt="Influencer"
                width={250}
                height={250}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
