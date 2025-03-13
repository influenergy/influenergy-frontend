"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  image: string;
  date: string;
  title: string;
  description: string;
  link?: string;
  slug?: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={300}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </motion.div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <p className="mr-2">•</p>
                <p>{blog.date}</p>
              </div>
              <h2 className="font-bold text-xl sm:text-2xl mb-2 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
                {blog.description}
              </p>
              <motion.a
                href={blog?.link ? blog.link : `blogs/${blog.slug}`}
                className="inline-block mt-3 sm:mt-4 text-blue-500 hover:text-blue-700 font-medium"
                whileHover={{
                  textDecoration: "underline",
                  x: 3,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More →
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  );
}
