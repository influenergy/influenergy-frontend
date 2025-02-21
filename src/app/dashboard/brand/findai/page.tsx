"use client";
import { useState } from "react";
import FindCard from "@/components/dashboard/FindCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type CreatorType = "ugc" | "influencer";

interface CreatorSection {
  type: CreatorType;
  title: string;
  data: any[];
}

const CreatorsList = ({ type, title, data }: CreatorSection) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link
        href={`/dashboard/brand/findai/${type}`}
        className="text-primary hover:text-primary/80 underline text-lg transition-colors"
      >
        View All
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((_, index) => (
        <FindCard key={index} />
      ))}
    </div>
  </motion.div>
);

const GenerateView = ({ onGenerate }: { onGenerate: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-[75vh] flex flex-col justify-center items-center"
  >
    <div className="flex flex-col items-center max-w-lg px-4 gap-10 text-center">
      <Image
        src="/images/logo.svg"
        width={300}
        height={300}
        alt="Influenergy Logo"
        className="animate-float"
      />
      <p className="text-lg text-gray-700">
        Experience the magic of{" "}
        <Link
          href="/dashboard"
          className="text-primary hover:text-primary/80 underline"
        >
          Influenergy
        </Link>{" "}
        AI Find where we will match your influencers according to your needs and
        create the magic!
      </p>
      <Button
        className="bg-primary hover:bg-primary/90 text-white text-lg group"
        size="lg"
        onClick={onGenerate}
      >
        <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
        Generate Matches
      </Button>
    </div>
  </motion.div>
);

export default function Page() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
      setError("Failed to generate matches. Please try again.");
      setIsGenerating(false);
    }
  };

  if (error) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => setError(null)}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-gray-600">Generating your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isGenerating ? (
        <GenerateView onGenerate={handleGenerate} />
      ) : (
        <div className="space-y-10 py-6 container mx-auto px-4">
          <CreatorsList
            type="ugc"
            title="UGC Creators"
            data={Array(4).fill(null)}
          />
          <CreatorsList
            type="influencer"
            title="Influencers"
            data={Array(4).fill(null)}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
