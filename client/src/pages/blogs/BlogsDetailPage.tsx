import BlogDetail from "@/features/blog/components/BlogDetail";
import { getBlogDetail } from "@/features/blog/slice/blogs.slice";
import CommentList from "@/features/comment/components/CommentList";
import Comments from "@/features/comment/components/Comments";
import CreateComment from "@/features/comment/components/CreateComment";
import { api } from "@/lib/api";
import type { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

export default function BlogsDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const blogDetail = useSelector((state: RootState) => state.blogs.currentBlog);
  useEffect(() => {
    dispatch(getBlogDetail(id as string));
  }, [id]);
  if (!blogDetail) return <div>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <BlogDetail blog={blogDetail} />
      <Comments blogId={blogDetail._id} />
    </div>
  );
}
