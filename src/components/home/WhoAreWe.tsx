"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function WhoAreWe() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsPlaying(true);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around w-full px-6 md:px-16 lg:px-24 py-10 md:py-10 gap-10 items-center max-w-[1440px] mx-auto">
      <motion.div
        className="flex justify-center h-full relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative">
          <VideoPlayer
            ref={videoRef}
            videoUrl="https://d20cf3kfv1a9jn.cloudfront.net/hearfromus/1/output.m3u8"
            muted={isMuted}
            isPlaying={isPlaying}
            onEnded={handleVideoEnd}
            className="rounded-3xl object-cover shadow-lg h-[500px] w-[400px]"
          />

          {/* Video Controls Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Play/Pause Button */}
            <div className="flex justify-center items-center h-full">
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
            </div>

            {/* Mute/Unmute Button */}
            <div className="flex justify-end">
              <motion.button
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
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
          We are Influenergy. An AI-powered CRM that connects
          between brands and creators, streamlining influencer collaboration
          with smart automation to maximize campaign success, time-efficiencey
          and ultimately yield the best ROI.
        </p>
        <motion.div
          className="flex items-center relative"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-full p-6  flex items-center">
            <Link href="/get-started">Explore Now</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
