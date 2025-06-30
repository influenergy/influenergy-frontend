"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { setUserType } from "@/store/features/authSlice";

export default function GetStarted() {
  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleUserTypeSelection = (type: string, link: string) => {
    dispatch(setUserType(type));
    router.push(`${link}`);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <div className="mx-auto max-w-screen h-full">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[60%_40%] h-full min-h-screen">
          {/* Left Section */}
          <div className="space-y-8 flex flex-col justify-center px-4 sm:px-6 md:px-10 h-full py-8 md:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-10"
            >
              <div className="space-y-4 sm:space-y-5 pl-2 sm:pl-6 md:pl-10">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl ml-2 sm:ml-6 md:ml-10 font-poppins font-medium">
                  Join{" "}
                  <span className="text-primary font-bold font-mona">
                    Influenergy
                  </span>
                </h1>
                <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-gray-800 font-poppins">
                  Your Premier AI & Tech Influencer Marketing Agency
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-4 px-2 sm:px-5 md:px-14 w-full"
            >
              <Link
                href="/login"
                className="group w-full sm:w-auto"
                onClick={() => handleUserTypeSelection("brand", "/login")}
              >
                <div className="flex cursor-pointer h-40 sm:h-48 w-full sm:w-52 flex-col justify-between rounded-2xl bg-[#F4F3FF] p-4 sm:p-6 transition-all hover:bg-[#7C3AED] hover:text-white">
                  <Image
                    src="/images/Home/icon.png"
                    alt="Brand Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-poppins">I am a</p>
                    <p className="font-semibold tracking-wide font-poppins text-base sm:text-lg">
                      Brand or Agency
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/login"
                className="group w-full sm:w-auto"
                onClick={() => handleUserTypeSelection("creator", "/login")}
              >
                <div className="flex cursor-pointer h-40 sm:h-48 w-full sm:w-52 flex-col justify-between rounded-2xl bg-[#F4F3FF] p-4 sm:p-6 transition-all hover:bg-[#7C3AED] hover:text-white">
                  <Image
                    src="/images/Home/icon1.png"
                    alt="Brand Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-poppins">I am a</p>
                    <p className="font-semibold tracking-wide font-poppins text-base sm:text-lg">
                      Creator
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Section */}
          <motion.div className="relative bg-primary h-full hidden lg:block">
            <div className="absolute -left-20 xl:-left-28 top-1/2 -translate-y-1/2">
              <Image
                src="/images/Home/image.png"
                alt="Influencer"
                width={180}
                height={180}
                className="relative object-contain"
                priority
              />
            </div>

            <div className="flex flex-col justify-around items-center h-full w-full ml-4 xl:ml-10">
              <Image
                src="/images/Home/image2.png"
                alt="Influencer"
                width={180}
                height={180}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
