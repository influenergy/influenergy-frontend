import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

interface BlogPost {
  id: number;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

export default function Blog() {
  // Sample blog data - in a real application, this would come from an API or CMS
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      image: "/landing/blog/blog1.png",
      author: "John Doe",
      date: "June 20, 2023",
      title: "Bill Walsh leadership lessons",
      description:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    },
    {
      id: 2,
      image: "/landing/blog/blog2.png",
      author: "Sarah Johnson",
      date: "July 15, 2023",
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
    },
    {
      id: 3,
      image: "/landing/blog/blog3.png",
      author: "Michael Chen",
      date: "August 5, 2023",
      title: "What is Wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full py-16 px-6 md:px-16 lg:px-24 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Header section with title and view all link */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-4 md:mb-0 w-full ">
            Explore Our Blogs
          </h2>
        </motion.div>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute top-0 right-0"
        >
          <Link
            href="/blogs"
            className="flex items-center text-primary font-semibold hover:underline group "
          >
            View All
          </Link>
        </motion.div>

        {/* Blog posts grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogPosts.map((post) => (
            <Link href={`/blogs`} key={post.id}>
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={item}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Blog image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Blog content */}
                <div className="p-6">
                  {/* Author and date */}
                  <div className="flex items-center text-primary text-sm mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Blog title with arrow icon */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold pr-4">{post.title}</h3>
                    <MoveUpRight
                      size={16}
                      className="text-black mt-1 flex-shrink-0"
                    />
                  </div>

                  {/* Blog description */}
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
