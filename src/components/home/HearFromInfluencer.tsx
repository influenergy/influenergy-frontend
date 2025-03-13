"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

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
  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const progressRef = useRef<HTMLDivElement>(null);

  // Influencer data with video URLs
  const influencers: Influencer[] = [
    {
      name: "MIKE",
      role: "CONTENT CREATOR",
      color: "#1B1F3B", // Deep Navy Blue for content creator (professional and creative)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/1.mov",
    },
    {
      name: "SAMITE",
      role: "LIFESTYLE BLOGGER",
      color: "#2F4858", // Rich Teal Blue for lifestyle (sophisticated yet modern)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/2.mov",
    },
    {
      name: "KAITY",
      role: "FASHION CREATOR",
      color: "#5C5470", // Elegant Deep Mauve for fashion (stylish and refined)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/3.mov",
    },
    {
      name: "OAKES",
      role: "BEAUTY EXPERT",
      color: "#4B0082", // Royal Indigo for beauty expert (luxurious and high-end)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/4.mov",
    },
    {
      name: "OAKES",
      role: "BEAUTY & FASHION",
      color: "#1F3A93", // Rich Royal Blue for beauty & fashion (bold and sophisticated)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/5.mov",
    },
    {
      name: "OAKES",
      role: "AI & TECH",
      color: "#0B5345", // Deep Emerald Green for AI & Tech (futuristic and professional)
      hasVideo: true,
      videoUrl: "/landing/hearfromus/6.mp4",
    },
  ];
  

  // Reset video and playing state when active card changes
  useEffect(() => {
    setIsPlaying(false);
    // setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeCard]);

  // Update current time while video is playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // const updateProgress = () => {
    //   setCurrentTime(video.currentTime);
    //   setDuration(video.duration);
    // };

    // video.addEventListener("timeupdate", updateProgress);
    // video.addEventListener("loadedmetadata", () => {
    //   setDuration(video.duration);
    // });

    // return () => {
    //   video.removeEventListener("timeupdate", updateProgress);
    // };
  }, [activeCard]);

  // Calculate height and scale based on distance from active card
  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - activeCard);

    if (distance === 0) {
      // Active card - largest
      return {
        height: "h-[450px] md:h-[550px]", // Increased from h-96 md:h-[450px]
        width: "w-72 md:w-96",
        zIndex: "z-30",
        opacity: "opacity-100",
        scale: "scale-100",
      };
    } else if (distance === 1) {
      // First closest cards - tall but thinner
      return {
        height: "h-96 md:h-[450px]", // Increased from h-80 md:h-96
        width: "w-20 md:w-24",
        zIndex: "z-20",
        opacity: "opacity-90",
        scale: "scale-95",
      };
    } else if (distance === 2) {
      // Furthest cards - shortest
      return {
        height: "h-80 md:h-96", // Increased from h-64 md:h-80
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
        scale: "scale-90",
      };
    } else if (distance == 3) {
      // Furthest cards - shortest
      return {
        height: "h-64 md:h-80", // Increased from h-56 md:h-64
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-70",
        scale: "scale-90",
      };
    } else if (distance == 4) {
      return {
        height: "h-60 md:h-72", // Modified height for distance 4
        width: "w-16 md:w-20",
        zIndex: "z-10",
        opacity: "opacity-60",
        scale: "scale-90",
      };
    } else {
      return {
        height: "h-56 md:h-64", // Modified height for else condition
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

  // const handleVideoProgress = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   const progressBar = progressRef.current;
  //   const video = videoRef.current;

  //   if (!progressBar || !video) return;

  //   const rect = progressBar.getBoundingClientRect();
  //   const clickPosition = e.clientX - rect.left;
  //   const clickPercentage = clickPosition / rect.width;

  //   const newTime = clickPercentage * video.duration;
  //   video.currentTime = newTime;
  //   setCurrentTime(newTime);
  // };

  // const formatTime = (seconds: number): string => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = Math.floor(seconds % 60);
  //   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  // };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // if (videoRef.current) {
    //   videoRef.current.currentTime = 0;
    //   setCurrentTime(0);
    // }
  };

  // Determine if controls should be visible
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
                {/* Background color or video */}
                {isActive && influencer.hasVideo && influencer.videoUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={influencer.videoUrl}
                      onEnded={handleVideoEnd}
                      playsInline
                      muted={isMuted}
                      loop={false}
                    />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 backdrop-blur-lg bg-opacity-40"
                    style={{
                      backgroundColor: influencer.color,
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Light border for glass effect
                      backdropFilter: "blur(10px)", // Glass blur effect
                      WebkitBackdropFilter: "blur(10px)", // Safari support
                    }}
                  />
                )}

                {/* Content */}
                {isActive ? (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 overflow-hidden">
                    {/* Video controls with conditional visibility */}
                    {influencer.hasVideo && (
                      <>
                        {/* Main play/pause button - visible only when not playing or on hover */}
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

                        {/* Video controls bar - visible only when not playing or on hover */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${
                            shouldShowControls ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* Time display and mute button */}
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
