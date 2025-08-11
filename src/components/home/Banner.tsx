'use client';

import React from 'react';

function Banner() {
  return (
    <div className="w-full bg-green-300 border-b border-green-400 py-2 px-4 flex items-center justify-center overflow-x-hidden">
      <div
        className="
          text-center
          text-xs
          md:text-base
          font-medium
          text-red-600
          animate-none
          md:animate-marquee
          whitespace-normal
        "
      >
        <span className="inline-block">
          Unleash your creativity with Filmora’s intuitive video editor — seamless, powerful, and tailored for influencers and brands.&nbsp;
          <a
            className="underline"
            href="http://bit.ly/4lmhmoa"
            target="_blank"
            rel="noopener noreferrer"
          >
            TRY NOW.
          </a>
        </span>
      </div>
    </div>
  );
}

export default Banner;
