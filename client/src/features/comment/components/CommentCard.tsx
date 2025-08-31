import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { api } from "@/lib/api";
import { useDispatch } from "react-redux";
import { getCommentsByBlogId } from "../slice/comments.slice";
import type { AppDispatch } from "@/store/store";
import type { IComment } from "../types/comment.interface";

export default function CommentCard({ comment }: { comment: IComment }) {
  const [content, setContent] = useState<string>(comment.content);

  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (commentId: string, blogId: string) => {
    try {
      const res = await api.delete(`/comments/${commentId}`);
      if (res.data.success) dispatch(getCommentsByBlogId(blogId));
    } catch (error) {}
  };
  const handleUpdate = async (commentId: string, blogId: string) => {
    try {
      const res = await api.patch(`/comments/${commentId}`, { content });
      if (res.data.success) dispatch(getCommentsByBlogId(blogId));
    } catch (error) {}
    setContent("");
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-2xl p-3 py-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Author: {comment.authorId.username}</p>
        <p className="text-gray-600">
          {new Date(comment.createdAt).toDateString()}
        </p>
      </div>
      <p>{comment.content}</p>
      <div className="flex justify-end gap-5">
        <Dialog>
          <DialogTrigger>
            <FaPen size={25} className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-4xl text-emerald-900">
                Update Comment
              </DialogTitle>
            </DialogHeader>
            <form
              action=""
              id="updateComment"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(comment._id, comment.blogId);
              }}
              className="flex flex-col gap-3"
            >
              <Label className="text-lg text-emerald-800">Content:</Label>
              <Input
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              />
            </form>
            <DialogFooter>
              <Button
                form="updateComment"
                className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
                size={"lg"}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <MdDelete
          size={27}
          className="cursor-pointer"
          onClick={() => {
            handleDelete(comment._id, comment.blogId);
          }}
        />
      </div>
    </div>
  );
}
