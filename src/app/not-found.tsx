"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-center p-6 md:p-12 max-w-2xl mx-auto bg-white">
      <Image
        src={"/images/404/error.webp"}
        width={500}
        height={500}
        alt={"404"}
        className="w-full h-auto max-w-[500px]"
      />
      <p className="mt-8 md:mt-12 text-black text-lg md:text-2xl">
        The page you are looking for doesn’t exist or an error occurred.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="mt-12 md:mt-16 flex items-center gap-4 py-2 px-4 md:py-3 md:px-6"
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        Go to Home
      </Button>
    </div>
  );
}
