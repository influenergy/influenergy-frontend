"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MarqueeLogos } from "../magicui/marquee";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const imageList = [
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company1.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company2.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company3.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company-4.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company5.png" },
    { logo: "https://www.hostfluencer.com/lovable-uploads/37dff50a-de23-4743-b5c6-803312d8f98c.png" },
    { logo: "https://www.vbreathe.com/wp-content/uploads/2025/07/Logo-Small-1.png" },
    // { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company6.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company7.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company8.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company9.png" },
    { logo: "https://d20cf3kfv1a9jn.cloudfront.net/images/company10.jpg" },
  ];


  const videos = [
    "https://d20cf3kfv1a9jn.cloudfront.net/videos/video1.mp4",
    "https://d20cf3kfv1a9jn.cloudfront.net/videos/video2.mov",
    "https://d20cf3kfv1a9jn.cloudfront.net/videos/video3.mov",
    "https://d20cf3kfv1a9jn.cloudfront.net/videos/video4.mov",
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

  const handleClick = () => {
    const bookingUrl = "https://calendly.com/influenergy/30min";
    if (typeof window !== "undefined" && window.Calendly) {
      try {
        if (typeof window.Calendly.closePopupWidget === "function") {
          window.Calendly.closePopupWidget();
        }
        if (typeof window.Calendly.initPopupWidget === "function") {
          // Defer to next tick to avoid race conditions inside Calendly widget.js
          setTimeout(() => {
            window.Calendly.initPopupWidget({ url: bookingUrl });
          }, 0);
          return;
        }
      } catch {
        // Fallback below
      }
    }
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };


  return (
    <div className="relative w-full h-[500px] sm:h-[650px] md:h-[600px] flex items-center justify-center text-center">

      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-[60%_40%] w-full h-full absolute inset-0">

        <div className="text-black relative flex">
          {/* Centered Content */}
          <motion.div
            className="relative z-10 text-white px-6 md:px-8 flex items-start justify-center flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight font-mona max-w-[90vw] text-start mx-auto text-black ">
              AI-POWERED PLATFORM CONNECTING <br className="block sm:hidden" />
              BRANDS WITH CREATORS
            </h1>

            <p className="mt-3 md:mt-6 text-[clamp(1.025rem,0.9rem+1vw,1.475rem)] mx-auto  max-w-4xl md:max-w-5xl md:text-[1.65rem] lg:text-[1.45rem] font-poppins text-start text-black">
              Let’s create Influencers and UGC marketing campaigns that connect, inspire, and
              perform—empowering brands to grow
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-start flex items-start gap-4 justify-center"
            >
              <Button
                className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-xl px-9 py-7 text-lg border-primary border-2"
                onClick={() => router.push("/get-started")}
              >
                Start Free Campaign
              </Button>

              <Button className="mt-8 text-primary hover:bg-primary/90 bg-transparent border-primary border-2 hover:text-white rounded-xl px-10 py-7 text-lg" onClick={handleClick}>
                Get a Demo
              </Button>

            </motion.div>
          </motion.div>

          {/* Companies Bar - Repositioned for better centering */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center w-full">
            <motion.div
              className="relative -bottom-10 md:-bottom-14 px-3 md:px-6 py-2 md:py-4 w-10/12 lg:w-10/12  flex flex-col sm:flex-row items-center justify-between gap-4 rounded-full shadow-xl bg-white z-20 mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Replace static logos with Marquee component */}
              <div className="w-full overflow-hidden">
                <MarqueeLogos images={imageList} />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="hidden md:block relative w-full mx-auto overflow-hidden">
          {/* Gradient background fading from white to transparent */}
          <div className="absolute inset-0 z-50 bg-fade-gradient pointer-events-none h-[100%] " />

          {/* <Image src="/hero.jpg" alt="Hero Image" width={600} height={600} className="absolute inset-0 object-cover w-full h-full rounded-lg z-0" /> */}
          <div className="flex w-full max-w-2xl gap-4 max-h-[500px]">
            {/* Main Video */}
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

          </div>

        </div>
      </div>


    </div>
  );
}
