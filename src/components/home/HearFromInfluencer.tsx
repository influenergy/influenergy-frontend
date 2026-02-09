"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userApi } from "@/services/userServices";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type Creator = {
  fullName: string;
  color?: string;
  profileIcon?: string;
};

const COLORS = [
  "#000", // muted red
  "#000", // muted blue
  "#000", // muted green
  "#000", // muted amber/brownish
  "#000", // muted violet
  "#000", // muted pink/maroon
  "#000", // muted teal
  "#000", // muted orange/burnt
];

export default function HearFromInfluencer() {
  const [activeCard, setActiveCard] = useState(0);
  const [creators, setCreators] = useState<Creator[]>([]);

  // Fetch creators from API
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await userApi.getRandomCreators();

        // assign random colors to each creator
        const withColors = (data.data || []).map((c: Creator) => ({
          ...c,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));

        setCreators(withColors);
        setActiveCard(Math.floor(withColors.length / 2)); // open middle
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };
    fetchCreators();
  }, []);

  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - activeCard);

    if (distance === 0) {
      return {
        height: "h-[350px] sm:h-[400px] md:h-[550px]",
        width: "w-56 sm:w-64 md:w-96",
        zIndex: "z-30",
        opacity: "opacity-100",
      };
    } else if (distance === 1) {
      return {
        height: "h-72 sm:h-80 md:h-[450px]",
        width: "w-14 sm:w-16 md:w-24",
        zIndex: "z-20",
        opacity: "opacity-90",
      };
    } else if (distance === 2) {
      return {
        height: "h-64 sm:h-72 md:h-96",
        width: "w-12 sm:w-14 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
      };
    } else {
      return {
        height: "h-48 sm:h-56 md:h-72",
        width: "w-10 sm:w-12 md:w-16",
        zIndex: "z-10",
        opacity: "opacity-50",
      };
    }
  };

  return (
    <motion.div
      className="w-full py-14 px-2 sm:px-4 bg-white relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
      id="influencers"
    >
      <motion.h1
        className="text-2xl md:text-3xl lg:text-4xl text-center mb-4"
      >
        <div className="flex flex-col justify-start items-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#352547]">
            Our Influencers
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
            Collaborate, create, and grow with top influencers
          </p>
        </div>
      </motion.h1>

      <div className="relative flex justify-center items-center overflow-hidden mx-32">
        <div className="flex items-center justify-center gap-1 md:gap-3">
          {creators.map((creator, index) => {
            const styles = getCardStyle(index);
            const isActive = index === activeCard;

            return (
              <motion.div
                key={creator.fullName + index}
                className={`transform transition-all duration-500 overflow-hidden relative cursor-pointer
                  ${styles.height} ${styles.width} ${styles.zIndex} ${styles.opacity}`}
                onClick={() => setActiveCard(index)}
              >
                {isActive ? (
                  <div className="relative h-full">
                    <Image
                      height={350}
                      width={350}
                      src={
                        creator.profileIcon ||
                        "https://via.placeholder.com/300x300.png?text=User"
                      }
                      alt={creator.fullName}
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute bottom-4 left-4 text-white font-bold tracking-wide text-sm sm:text-base md:text-lg">{creator.fullName}</p>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: creator.color,
                    }}
                  >
                    {/* Show user image with reduced opacity */}
                    <Image
                      height={150}
                      width={350}
                      src={
                        creator.profileIcon ||
                        "https://via.placeholder.com/300x300.png?text=User"
                      }
                      alt={creator.fullName}
                      className="w-full h-full object-cover opacity-50"
                    />
                    {/* Vertical name on top */}
                    <h3 className="absolute text-white font-bold tracking-wide text-sm sm:text-base md:text-lg [writing-mode:vertical-rl] rotate-180">
                      {creator.fullName}
                    </h3>
                  </div>
                )}

              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
              className="flex items-center relative justify-center mt-4 md:mt-8"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl flex items-center text-sm p-5 shadow-primary shadow-md" size="sm">
                <Link href="/get-started">Find Creators for Free</Link>
              </Button>
            </motion.div>
    </motion.div>
  );
}
