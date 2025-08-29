"use client";
import RichContentRenderer from "@/components/blogs/RichTextRender";
import Header from "@/components/home/Header";
import { BlogContent } from "@/constants/Blogs";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const params = useParams();

  const blog = BlogContent.find((blog) => blog.id === params.slug);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Image
          src="https://d20cf3kfv1a9jn.cloudfront.net/images/empty.png"
          width={400}
          height={400}
          alt="Blog Not Found"
          className="object-cover"
        />
        <p className="text-4xl font-semibold mt-4">
          Blog Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          objectFit="cover"
          className="w-full"
        />
        <h1 className="absolute bottom-16 left-16 text-4xl font-bold text-white text-left w-full">
          {blog.title}
        </h1>
      </div>

      {/* Blog Body */}
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white rounded-lg p-8">
          <p className="text-sm text-gray-500 mb-4">{blog.publishedInfo}</p>
          <RichContentRenderer content={blog.content} />
        </article>
      </main>
    </div>
  );
}
