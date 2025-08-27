import Pagination from "@/components/layout/Pagination";
import BlogCard from "@/features/blog/components/BlogCard";
import { getBlogsCount, getMyblogs } from "@/features/blog/slice/blogs.slice";
import { api } from "@/lib/api";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

export default function MyBlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const myblogs = useSelector((state: RootState) => state.blogs.myBlogs);
  const { page } = useParams();
  useEffect(() => {
    dispatch(getMyblogs(page ? page : "1"));
    dispatch(getBlogsCount());
  }, [page]);
  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/blogs/${id}`);
      if (res.data.success) {
        dispatch(getMyblogs(page ? page : "1"));
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-5 px-6 mt-7">
        {myblogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            showActions={true}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <Pagination route="my-blogs" />
    </div>
  );
}
