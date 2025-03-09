import Header from "@/components/home/Header";
import BlogGrid from "./components/BlogGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | InfluEnergy",
  description: "Explore our collection of insightful blogs and articles",
};

const blogs = [
  {
    image: "/landing/blog/blog1.png",
    author: "Alec Whitten",
    date: "1 Jan 2022",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
  },
  {
    image: "/landing/blog/blog2.png",
    author: "Demi Wilikinson",
    date: "1 Jan 2020",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
  },
  {
    image: "/landing/blog/blog3.png",
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the Industry.",
  },
  {
    image: "/landing/blog/blog1.png",
    author: "Alec Whitten",
    date: "1 Jan 2022",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
  },
  {
    image: "/landing/blog/blog2.png",
    author: "Demi Wilikinson",
    date: "1 Jan 2020",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
  },
  {
    image: "/landing/blog/blog3.png",
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the Industry.",
  },
];

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
