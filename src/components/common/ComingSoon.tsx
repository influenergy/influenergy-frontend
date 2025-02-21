import React from "react";
import Image from "next/image";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="flex justify-center mb-4">
        <Image
          src="/images/coming-soon.png"
          width={300}
          height={300}
          alt="Coming soon icon"
          className="text-blue-500"
        />
      </div>
      <h2 className="text-4xl font-bold text-gray-900 my-10">Coming Soon!</h2>
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-4">
          We{"'"}re working on something amazing. Stay tuned for
          <br /> exciting updates and new features!
        </p>
        <Link href="/" className="text-blue-500 italic underline">
          Back to Home
        </Link>
      </div>
      <Image
        src="/images/line1.png"
        width={300}
        height={300}
        alt="Decorative line"
        className="absolute top-0 right-0"
      />
      <Image
        src="/images/line1.png"
        width={300}
        height={300}
        alt="Decorative line"
        className="absolute bottom-0 -left-10"
      />
    </div>
  );
};

export default ComingSoon;
