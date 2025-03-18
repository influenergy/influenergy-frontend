"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

type Influencer = {
  name: string;
  role: string;
  color: string;
  hasVideo: boolean;
  videoUrl?: string;
};

export default function HearFromInfluencer() {
  const [activeCard, setActiveCard] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const influencers: Influencer[] = [
    {
      name: "MIKE",
      role: "CONTENT CREATOR",
      color: "#1B1F3B",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/1/output.m3u8",
    },
    {
      name: "SAMITE",
      role: "LIFESTYLE BLOGGER",
      color: "#2F4858",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/2/output.m3u8",
    },
    {
      name: "KAITY",
      role: "FASHION CREATOR",
      color: "#5C5470",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/3/output.m3u8",
    },
    {
      name: "OAKES",
      role: "BEAUTY EXPERT",
      color: "#4B0082",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/4/output.m3u8",
    },
    {
      name: "OAKES1",
      role: "BEAUTY & FASHION",
      color: "#1F3A93",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/5/output.m3u8",
    },
    {
      name: "OAKES2",
      role: "AI & TECH",
      color: "#0B5345",
      hasVideo: true,
      videoUrl:
        "https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/6/output.m3u8",
    },
  ];

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeCard]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  }, [activeCard]);

  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - activeCard);

    if (distance === 0) {
      return {
        height: "h-[450px] md:h-[550px]",
        width: "w-72 md:w-96",
        zIndex: "z-30",
        opacity: "opacity-100",
        scale: "scale-100",
      };
    } else if (distance === 1) {
      return {
        height: "h-96 md:h-[450px]",
        width: "w-20 md:w-24",
        zIndex: "z-20",
        opacity: "opacity-90",
        scale: "scale-95",
      };
    } else if (distance === 2) {
      return {
        height: "h-80 md:h-96",
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
        scale: "scale-90",
      };
    } else if (distance == 3) {
      return {
        height: "h-64 md:h-80",
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
        scale: "scale-90",
      };
    } else if (distance == 4) {
      return {
        height: "h-60 md:h-72",
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-60",
        scale: "scale-90",
      };
    } else {
      return {
        height: "h-56 md:h-64",
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-50",
        scale: "scale-85",
      };
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const shouldShowControls = !isPlaying || isHovering;

  return (
    <motion.div
      className="w-full py-10 px-4 bg-white relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
      id="influencers"
    >
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Hear from our Influencers
      </motion.h1>

      <div className="relative flex justify-center items-center overflow-hidden py-2">
        <div className="flex items-center justify-center gap-1 md:gap-3">
          {influencers.map((influencer, index) => {
            const styles = getCardStyle(index);
            const isActive = index === activeCard;
            return (
              <motion.div
                key={influencer.name}
                className={`transform transition-all duration-500 overflow-hidden relative cursor-pointer
                  ${styles.height} ${styles.width} ${styles.zIndex} ${styles.opacity}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveCard(index)}
                onMouseEnter={() => isActive && setIsHovering(true)}
                onMouseLeave={() => isActive && setIsHovering(false)}
                whileHover={{ scale: isActive ? 1.03 : 1.05 }}
              >
                {isActive && influencer.hasVideo && influencer.videoUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    <VideoPlayer
                      ref={videoRef}
                      videoUrl={influencer.videoUrl}
                      muted={isMuted}
                      isPlaying={isPlaying}
                      onEnded={handleVideoEnd}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 backdrop-blur-lg bg-opacity-40"
                    style={{
                      backgroundColor: influencer.color,
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  />
                )}

                {isActive ? (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 overflow-hidden">
                    {influencer.hasVideo && (
                      <>
                        <motion.div
                          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            shouldShowControls ? "opacity-100" : "opacity-0"
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: shouldShowControls ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePlayPause}
                          >
                            {isPlaying ? (
                              <Pause className="text-black" size={30} />
                            ) : (
                              <Play className="text-black ml-1" size={30} />
                            )}
                          </motion.button>
                        </motion.div>

                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${
                            shouldShowControls ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <motion.button
                              className="p-2 text-white hover:bg-white/20 rounded-full"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={toggleMute}
                            >
                              {isMuted ? (
                                <VolumeX size={18} />
                              ) : (
                                <Volume2 size={18} />
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform rotate-90 whitespace-nowrap text-white/80 font-bold tracking-wider text-sm md:text-base">
                      {influencer.role}
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

