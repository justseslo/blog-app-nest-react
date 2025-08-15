"use client";
import React from "react";
import { IBlog } from "./blog.interface";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function BlogDetails({ blog }: { blog: IBlog }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </AspectRatio>
      </div>

      <header className="mb-8 space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {blog.authorId?.username}
          </span>
          <time>{new Date(blog.createdAt!).toDateString()}</time>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>
      </header>
      <article>{blog.content}</article>
    </div>
  );
}
