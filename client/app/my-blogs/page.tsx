import MyBloglist from "@/components/features/my-blogs/my-bloglist";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import React from "react";

export default async function MyBlogsPage() {
  const myblogs = await getMyBlogs();

  return <MyBloglist myblogs={myblogs} />;
}

const getMyBlogs = async () => {
  const mycookies = await cookies();
  try {
    const res = await api.get("/blogs/my-blogs", {
      headers: { Cookie: mycookies.toString() },
    });
    if (res.data.success) return res.data.myblogs;
  } catch (error) {
    console.error(error);
  }
};
