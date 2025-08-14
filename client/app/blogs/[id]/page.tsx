import BlogDetails from "@/components/features/blogs/blog-details";
import { IBlog } from "@/components/features/blogs/blog.interface";
import { api } from "@/lib/api";
import React from "react";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog: IBlog = await getBlogDetail(id);
  return <BlogDetails blog={blog} />;
}

const getBlogDetail = async (id: string) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    if (res.data.success) return res.data.blog;
  } catch (error) {
    console.error(error);
  }
};
