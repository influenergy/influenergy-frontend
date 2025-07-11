'use client';

import React from 'react';

function Banner() {
  return (
    <div className="w-full bg-green-300 border-b border-green-400 py-2 px-4 flex items-center justify-center overflow-x-auto">
      <div
        className="
          text-center 
          text-sm 
          md:text-base 
          font-medium 
          text-red-600 
          animate-none 
          md:animate-marquee
          whitespace-normal 
          md:whitespace-nowrap
        "
      >
        <span className="inline-block">
          Unleash your creativity with Filmora’s intuitive video editor — seamless, powerful, and tailored for influencers and brands.&nbsp;
          <a
            className="underline"
            href="https://filmora.wondershare.com/?utm_source=instagram&utm_medium=banner&utm_campaign=partnership&utm_term=jeev&utm_content=image_21111744_2025-04-23"
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
