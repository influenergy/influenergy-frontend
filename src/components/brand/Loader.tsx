import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-[75vh] flex flex-col items-center justify-center gap-5">
      <Image
        src="/images/AIFind/loader.webp"
        alt=""
        width={200}
        height={200}
        className="object-cover"
      />
      <p className="text-gray-500 text-center">
        AI magic is happening. We are matching your requirements with the
        desired creators!{" "}
      </p>
    </div>
  );
};

export default Loader;
