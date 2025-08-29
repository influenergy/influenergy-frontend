import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Image
        src="https://d20cf3kfv1a9jn.cloudfront.net/images/loader.webp"
        alt=""
        width={300}
        height={300}
        className="object-cover w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3"
      />
      <p className="text-black dark:text-white text-center text-xl sm:text-2xl font-semibold">
        AI magic is happening. We are matching your requirements with the
        desired creators!
      </p>
    </div>
  );
};

export default Loader;
