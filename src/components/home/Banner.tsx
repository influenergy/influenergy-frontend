'use client';

import React from 'react';
import { motion } from 'framer-motion';
// import Link from 'next/link';

function Banner() {

  return (
    <div className="w-full bg-green-100 border-b border-green-200 overflow-hidden py-2">
    <motion.div
      className="flex whitespace-nowrap text-center text-sm font-medium text-red-600 gap-32 justify-between"
      animate={{ x: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
    >
      {/* repeat this span for smooth loop */}
      <span className="inline-block text-lg ">
        🔥 New! OM KOP Brand onboarded. <span className="underline">Login to learn more.</span>
      </span>
      <span className="inline-block text-lg ">
        🔥 New! OM KOP Brand onboarded. <span className="underline">Login to learn more.</span>
      </span>
    </motion.div>
  </div>
  
  );
}

export default Banner;
