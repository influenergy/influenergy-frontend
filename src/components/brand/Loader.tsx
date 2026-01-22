import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Image
        src="https://d20cf3kfv1a9jn.cloudfront.net/images/loader.webp"
        alt="Loading"
        width={300}
        height={300}
        className="object-cover w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3"
        priority
      />

      <p className="text-black dark:text-white text-center text-lg sm:text-xl font-semibold">
        Getting your inbox ready…
      </p>

      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center">
        Fetching your latest collaborations
      </p>
    </div>
  );
};

export default Loader;
