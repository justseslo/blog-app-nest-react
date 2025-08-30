import React, { useEffect } from "react";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { getCommentsByBlogId } from "../slice/comments.slice";

export default function Comments({ blogId }: { blogId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCommentsByBlogId(blogId));
  }, []);
  return (
    <div className="mt-16">
      <CreateComment blogId={blogId} /> <CommentList />
    </div>
  );
}
