"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function WhoAreWe() {
  const videos = [
    "/video1.mp4",
    "/video2.mov",
    "/video3.mov",
    "/video4.mov",
  ];

  const [mainIndex, setMainIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto rotate main video every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Auto-play the video when mainIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  }, [mainIndex]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full px-6 md:px-16 lg:px-24 py-10 gap-10 md:mt-4 items-center max-w-[1440px] mx-auto font-poppins">
      {/* Video Section */}
      <motion.div
        className="flex justify-start h-full relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex w-full max-w-2xl gap-4 max-h-[500px]">
          {/* Main Video */}
          <div className="flex-1 rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              key={mainIndex}
              src={videos[mainIndex]}
              className="w-full h-full object-cover rounded-xl aspect-[9/16] max-h-[500px]"
              controls={false}
              muted
              autoPlay
              playsInline
            />
          </div>

          {/* Side Thumbnails */}
          <div className="flex flex-col gap-3 w-40">
            {videos
              .filter((_, idx) => idx !== mainIndex)
              .map((video) => {
                const actualIndex = videos.findIndex((v) => v === video);
                return (
                  <motion.div
                    key={video}
                    className="flex-1 rounded-xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setMainIndex(actualIndex)}
                  >
                    <video
                      src={video}
                      className="w-full h-full object-cover"
                      muted
                    />
                  </motion.div>
                );
              })}
          </div>
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="flex flex-col justify-center space-y-8 h-full "
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Who We Are
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          We’re Influenergy — an AI-powered platform that bridges the gap
          between brands and creators. Our platform streamlines Influencer
          collaborations through smart automation, saving time, maximizing
          campaign success, and ultimately delivering the best ROI.
        </p>
        <motion.div
          className="flex items-center relative"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="text-white bg-primary hover:bg-primary/90 border border-primary rounded-xl px-8 py-5 flex items-center text-lg" size="lg">
            <Link href="/get-started">Join Influenergy</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
