import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

interface BlogPost {
  id: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
  categories: string[];
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-white">
      <div className="container mx-auto">
        {/* Header with title and view all link */}
        <div className="md:flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Our Blogs</h2>
          <Link
            href="/blogs"
            className="text-primary hover:underline flex items-center gap-1"
          >
            View All
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              {/* Blog image */}
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Blog content */}
              <div className="p-6">
                {/* Author and date */}
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-gray-600">
                    {post.author} • {post.date}
                  </p>
                </div>

                {/* Title with arrow icon */}
                <Link href={`/blogs/${post.id}`}>
                  <div className="flex justify-between items-center mb-3 group">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="bg-gray-100 rounded-full p-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <MoveUpRight size={16} />
                    </div>
                  </div>
                </Link>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, index) => (
                    <span key={index} className="text-sm text-gray-600">
                      {category}
                      {index < post.categories.length - 1 ? " | " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
