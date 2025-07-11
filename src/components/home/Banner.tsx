'use client';

import React from 'react';
// import Link from 'next/link';

function Banner() {

  return (
    <div className="w-full bg-green-300 border-b border-green-400 overflow-hidden py-2 flex justify-between content-center items-center">
      <div
        className="flex items-center whitespace-nowrap text-center text-sm font-medium text-red-600 justify-center content-center w-full"
        // animate={{ x: ["100%", "-100%"] }}
        // transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
      >
        {/* repeat this span for smooth loop */}
        <span className="inline-block text-lg text-center ">
          Unleash your creativity with Filmora’s intuitive video editor—seamless, powerful, and tailored for influencers and brands &nbsp; 
          <a
            className="underline"
            href="https://filmora.wondershare.com/?utm_source=instagram&utm_medium=banner&utm_campaign=partnership&utm_term=jeev&utm_content=image_21111744_2025-04-23"
            target="_blank"
            rel="noopener noreferrer"
          >
             TRY NOW.
          </a>

        </span>
        {/* <span className="inline-block text-lg ">
          Unleash your creativity with Filmora’s intuitive video editor—seamless, powerful, and tailored for influencers and brands &nbsp; 
          <a
            className="underline"
            href="https://filmora.wondershare.com/?utm_source=instagram&utm_medium=banner&utm_campaign=partnership&utm_term=jeev&utm_content=image_21111744_2025-04-23"
            target="_blank"
            rel="noopener noreferrer"
          >
            TRY NOW.
          </a>

        </span> */}
      </div>
    </div>

  );
}

export default Banner;
