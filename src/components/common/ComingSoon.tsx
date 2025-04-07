import React from "react";
import Image from "next/image";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-white p-4">
      <div className="flex justify-center mb-4 md:mb-8">
      <div className="relative h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full flex items-center justify-center">
        <Image
        src="/images/comingsoon.png"
        fill
        alt="Coming soon icon"
        priority
        />
      </div>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4 text-center">Coming Soon</h2>
      <div className="text-center max-w-3xl px-2 md:px-4 mt-2 md:mt-3">
      <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-6 leading-7 md:leading-8">
        Thank You for being an early adopter of <span className="text-primary">Influenergy</span>. Stay tuned! Exciting features on the way.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center text-primary hover:text-secondary transition-colors font-medium"
      >
        Back to Home
      </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
