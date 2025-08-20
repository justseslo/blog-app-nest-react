import BlogCard from "@/features/blog/components/BlogCard";
import { getMyblogs } from "@/features/blog/slice/blogs.slice";
import { api } from "@/lib/api";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function MyBlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const myblogs = useSelector((state: RootState) => state.blogs.myBlogs);
  useEffect(() => {
    dispatch(getMyblogs());
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/blogs/${id}`);
      if (res.data.success) {
        dispatch(getMyblogs());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6 mt-7">
      {myblogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          showActions={true}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
