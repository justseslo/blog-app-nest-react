import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import React, { useState } from "react";
import { getCommentsByBlogId } from "../slice/comments.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";

export default function CreateComment({ blogId }: { blogId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState<string>("");
  const addComment = async (blogId: string) => {
    try {
      const res = await api.post(`/comments/${blogId}`, { content: content });
      if (res.data.success) dispatch(getCommentsByBlogId(blogId));
    } catch (error) {}
    setContent("");
  };
  return (
    <div className="flex flex-row items-center gap-5 mt-10">
      <Input
        className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        size={"lg"}
        className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
        onClick={() => {
          addComment(blogId);
        }}
      >
        Add
      </Button>
    </div>
  );
}
