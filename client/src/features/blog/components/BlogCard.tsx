"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { IBlog } from "../types/blog.interface";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getBlogs } from "../slice/blogs.slice";
import type { AppDispatch } from "@/store/store";
import { useParams } from "react-router";
import UpdateBlog from "./UpdateBlog";

export default function BlogCard({
  blog,
  showActions = false,
  handleClick,
  handleDelete,
}: {
  blog: IBlog;
  handleDelete?: (id: string) => void;
  showActions: boolean;
  handleClick?: (id: string) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { page } = useParams();
  const toggleLike = async (blogId: string) => {
    try {
      const res = await api.post(`/likes/${blogId}`);
      if (res.data.success) {
        dispatch(getBlogs(page ? page : "1"));
      }
    } catch (error) {}
  };

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
      {!showActions && <CardContent>{blog.description}</CardContent>}
      <CardFooter
        className={`${
          showActions ? "justify-around" : "justify-between"
        } py-3 flex`}
      >
        {showActions ? (
          <>
            <UpdateBlog blog={blog} />
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
          <>
            <p>Author: {blog.authorId.username}</p>
            <div className="flex flex-col justify-center items-center">
              {blog.isLiked ? (
                <IoMdHeart
                  size={29}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(blog._id);
                  }}
                />
              ) : (
                <IoMdHeartEmpty
                  size={29}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(blog._id);
                  }}
                />
              )}
              <p>{blog.likes}</p>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
