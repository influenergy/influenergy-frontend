"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
// import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { MarqueeLogos } from "../magicui/marquee";

export default function HeroSection() {
  const router = useRouter();
  const imageList = [
    { logo: "/landing/marquee/company1.png" },
    { logo: "/landing/marquee/company2.png" },
    { logo: "/landing/marquee/company3.png" },
    { logo: "/landing/marquee/company-4.png" },
    { logo: "/landing/marquee/company5.png" },
    { logo: "/landing/marquee/company6.png" },
    { logo: "/landing/marquee/company7.png" },
    { logo: "/landing/marquee/company8.png" },
    { logo: "/landing/marquee/company9.png" },
  ];

  return (
    <div className="relative w-full h-[600px] sm:h-[650px] md:h-[600px] flex items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <Image
        src="/landing/hero.webp"
        alt="Landing Page Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Centered Content */}
      <motion.div
        className="relative z-10 text-white px-6 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight font-mona max-w-[90vw] text-center mx-auto">
          AI-POWERED SOLUTION CONNECTING <br className="block sm:hidden" />
          BRANDS WITH CREATORS
        </h1>

        <p className="mt-6 text-[clamp(1.125rem,0.9rem+1vw,1.875rem)] mx-auto max-w-4xl font-poppins">
          Let’s create Influencers and UGC campaigns that connect, inspire, and
          perform—empowering brands to grow
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-xl px-9 py-7 text-lg"
            onClick={() => router.push("/get-started")}
          >
            Start Free
          </Button>
        </motion.div>
      </motion.div>

      {/* Companies Bar - Repositioned for better centering */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center w-full">
        <motion.div
          className="relative -bottom-14 px-6 py-4 w-10/12 lg:w-8/12  flex flex-col sm:flex-row items-center justify-between gap-4 rounded-full shadow-xl bg-white z-20 mx-auto"
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
  );
}
