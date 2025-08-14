import BlogList from "@/components/features/blogs/bloglist";
import CreateBlog from "@/components/features/blogs/create-blog";
import { api } from "@/lib/api";
import React from "react";

export const getBlogs = async () => {
  try {
    const res = await api.get("/blogs", { withCredentials: true });
    if (res.data.success) {
      return res.data.blogs;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function Blogs() {
  const blogs = await getBlogs();
  return (
    <div className="w-full h-full">
      <BlogList blogs={blogs} key={"blog-list"}/>
      <CreateBlog />
    </div>
  );
}
