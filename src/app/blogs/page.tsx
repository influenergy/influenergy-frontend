import Header from "@/components/home/Header";
import BlogGrid from "@/components/blogs/BlogGrid";
import { Metadata } from "next";
import { blogs } from "@/constants/Blogs";

export const metadata: Metadata = {
  title: "Blogs | InfluEnergy",
  description: "Explore our collection of insightful blogs and articles",
};

export default function Blogs() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
          Explore Our Blogs
        </h1>

        <BlogGrid blogs={blogs} />
      </div>
    </div>
  );
}
