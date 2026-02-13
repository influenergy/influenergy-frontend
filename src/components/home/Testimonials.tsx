"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "../dashboard/VideoModal";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Content Creator",
    video: "https://d20cf3kfv1a9jn.cloudfront.net/videos/testimonial_1.mp4",
  },
  {
    name: "Ananya Singh",
    role: "Lifestyle Influencer",
    video: "https://d20cf3kfv1a9jn.cloudfront.net/videos/testimonial_2.mp4",
  },
  {
    name: "Kunal Verma",
    role: "Tech Reviewer",
    video: "https://d20cf3kfv1a9jn.cloudfront.net/videos/testimonial_3.mp4",
  },
  {
    name: "Pooja Patel",
    role: "Fashion Creator",
    video: "https://d20cf3kfv1a9jn.cloudfront.net/videos/testimonial_4.mp4",
  },
];

export default function Testimonials() {
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#352547]">
            What Our Customers are Saying
          </h2>
          <p className="text-gray-600 mt-3">
            From campaign discovery to successful collaborations — hear it from creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="cursor-pointer bg-white rounded-2xl shadow-md border p-2"
              onClick={() => {
                setActiveVideo(t.video);
                setOpen(true);
              }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden">
                <video
                  src={t.video}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        videoUrl={activeVideo}
      />
    </>
  );
}
