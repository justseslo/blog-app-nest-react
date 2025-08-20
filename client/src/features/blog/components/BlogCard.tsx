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
import type { IBlog } from "../types/blog.interface";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function BlogCard({
  blog,
  showActions = false,
  handleClick,
  handleDelete,
  handleUpdate,
}: {
  blog: IBlog;
  handleDelete?: (id: string) => void;
  showActions: boolean;
  handleClick?: (id: string) => void;
  handleUpdate?: () => void;
}) {
  return (
    <Card
      className="min-w-2xs py-0 gap-3 justify-between cursor-pointer"
      onClick={() => {
        handleClick?.(blog._id);
      }}
    >
      <div className="w-full">
        <AspectRatio ratio={16 / 9} className="relative w-full">
          <img
            src={blog.imageUrl}
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </AspectRatio>
      </div>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>{blog.description}</CardContent>
      <CardFooter
        className={`${showActions ? "flex justify-around" : ""} py-3`}
      >
        {showActions ? (
          <>
            <FaPen
              className="cursor-pointer"
              size={25}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate?.();
              }}
            />
            <MdDelete
              onClick={(e) => {
                e.stopPropagation();
                handleDelete?.(blog._id);
              }}
              className="cursor-pointer"
              size={25}
            />
          </>
        ) : (
          <p>Author: {blog.authorId.username}</p>
        )}
      </CardFooter>
    </Card>
  );
}
