import React from "react";
import Image from "next/image";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-white to-gray-50">
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
          <Image
            src="/images/comingsoon.png"
            width={80}
            height={80}
            alt="Coming soon icon"
            className="text-indigo-600"
          />
        </div>
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h2>
      <div className="text-center max-w-2xl px-4">
        <p className="text-lg text-gray-600 mb-6">
          Are you Ready to get something new from us. ThankYou for being a
          <br />
          early adopter of <span className="text-indigo-600">Influenergy</span>. Stay tuned! Exciting features on the way.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
