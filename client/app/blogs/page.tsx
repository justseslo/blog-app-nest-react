import BlogList from "@/components/features/blogs/bloglist";
import CreateBlog from "@/components/features/blogs/create-blog";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import React from "react";

export const getBlogs = async () => {
  const mycookies = await cookies();

  try {
    const res = await api.get("/blogs", {
      headers: { Cookie: mycookies.toString() },
    });
    if (res.data.success) {
      return res.data.blogs;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <div className="w-full h-full">
      <BlogList blogs={blogs} key={"blog-list"} />
      <CreateBlog />
    </div>
  );
}
