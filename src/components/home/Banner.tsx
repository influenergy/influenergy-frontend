'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function Banner() {
  const bannerText = (
    <span className="inline-block mx-8">
      <span className="text-red-600 font-semibold">New!</span> We have onboarded a new brand –{' '}
      <Link
        href="/brands/om-kop"
        className="text-red-600 underline hover:text-red-800 font-semibold"
      >
        OM KOP Brand
      </Link>. Login to know more.
    </span>
  );

  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 overflow-hidden">
    <motion.div
      className="flex whitespace-nowrap text-center text-sm font-medium text-red-600 gap-32 justify-between"
      animate={{ x: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
    >
      {/* repeat this span for smooth loop */}
      <span className="inline-block ">
        🔥 New! OM KOP Brand onboarded. <span className="underline">Login to learn more.</span>
      </span>
      <span className="inline-block ">
        🔥 New! OM KOP Brand onboarded. <span className="underline">Login to learn more.</span>
      </span>
    </motion.div>
  </div>
  
  );
}

export default Banner;
