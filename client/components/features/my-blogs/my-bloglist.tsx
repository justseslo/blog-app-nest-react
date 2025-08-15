"use client";
import React from "react";
import { IBlog } from "../common/types/blog.interface";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function MyBloglist({ myblogs }: { myblogs: IBlog[] }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 gap-5 px-6 mt-7">
      {myblogs.map((blog, index) => (
        <Card
          className=" py-0 gap-3 justify-between pb-3"
          onClick={() => {}}
          key={blog._id}
        >
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="relative w-full">
              <Image
                src={blog.imageUrl}
                className="w-full h-full object-cover rounded-xl"
                alt=""
                fill
                priority={index < 2}
              />
            </AspectRatio>
          </div>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-around">
            <FaPen size={25} className="cursor-pointer" />{" "}
            <MdDelete size={25} className="cursor-pointer" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
