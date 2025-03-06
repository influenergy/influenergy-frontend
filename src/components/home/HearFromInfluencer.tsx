"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function HearFromInfluencer() {
  const [activeCard, setActiveCard] = useState(2); // Middle card active initially

  // Influencer data
  const influencers = [
    { name: "MIKE", role: "CONTENT CREATOR", color: "#232323" },
    { name: "SAMITE", role: "LIFESTYLE BLOGGER", color: "#111927" },
    { name: "KAITY", role: "FASHION CREATOR", color: "#333", hasVideo: true },
    { name: "OAKES", role: "BEAUTY EXPERT", color: "#722f37" },
    { name: "LAUREN", role: "STYLE COACH", color: "#252934" },
  ];

  // Calculate height and scale based on distance from active card
  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - activeCard);

    if (distance === 0) {
      // Active card - largest
      return {
        height: "h-96 md:h-[450px]",
        width: "w-64 md:w-80",
        zIndex: "z-30",
        opacity: "opacity-100",
        scale: "scale-100",
      };
    } else if (distance === 1) {
      // First closest cards - tall but thinner
      return {
        height: "h-80 md:h-96",
        width: "w-20 md:w-24",
        zIndex: "z-20",
        opacity: "opacity-90",
        scale: "scale-95",
      };
    } else {
      // Furthest cards - shortest
      return {
        height: "h-64 md:h-80",
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
        scale: "scale-90",
      };
    }
  };

  return (
    <motion.div
      className="w-full py-20 md:py-28 px-4 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Hear from our Influencers
      </motion.h1>

      <div className="relative flex justify-center items-center overflow-hidden py-8">
        <div className="flex items-center justify-center gap-1 md:gap-3">
          {influencers.map((influencer, index) => {
            const styles = getCardStyle(index);
            return (
              <motion.div
                key={influencer.name}
                className={`transform transition-all duration-500 rounded-2xl overflow-hidden relative cursor-pointer
                  ${styles.height} ${styles.width} ${styles.zIndex} ${styles.opacity}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveCard(index)}
                whileHover={{ scale: index === activeCard ? 1.03 : 1.05 }}
              >
                {/* Background color */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: influencer.color }}
                />

                {/* Content */}
                {index === activeCard ? (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 overflow-hidden">
                    {influencer.hasVideo && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <motion.button
                          className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="text-black ml-1" size={30} />
                        </motion.button>
                      </motion.div>
                    )}
                    <motion.div
                      className="relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {influencer.name}
                      </h3>
                      <p className="text-white/80">{influencer.role}</p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform rotate-90 whitespace-nowrap text-white/80 font-bold tracking-wider text-sm md:text-base">
                      {influencer.name}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
