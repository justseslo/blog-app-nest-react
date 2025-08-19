"use client";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { IBlog } from "../types/blog.interface";

export default function BlogDetail({ blog }: { blog: IBlog }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="object-cover transition-transform duration-300 hover:scale-105"
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
      <article className="leading-8 tracking-wide">{blog.content}</article>
    </div>
  );
}

