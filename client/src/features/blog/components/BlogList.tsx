"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router";
import type { IBlog } from "../types/blog.interface";

export default function BlogList({ blogs }: { blogs: IBlog[] }) {
  const navigate = useNavigate()
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6 mt-7">
      {blogs.map((blog, index) => (
        <Card className="min-w-2xs py-0 gap-3 justify-between" onClick={()=>{
          navigate(`/blogs/${blog._id}`)
        }} key={blog._id}>
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="relative w-full">
              <img
                src={blog.imageUrl}
                className="w-full h-full object-cover rounded-xl"
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
          </div>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>{blog.description}</CardContent>
          <CardFooter>
            <p>Author: {blog.authorId!.username}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
