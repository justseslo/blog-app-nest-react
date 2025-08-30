import React from "react";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { api } from "@/lib/api";
import { useDispatch } from "react-redux";
import { getCommentsByBlogId } from "../slice/comments.slice";
export default function CommentList() {
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (commentId: string, blogId: string) => {
    try {
      const res = await api.delete(`/comments/${commentId}`);
      if (res.data.success) dispatch(getCommentsByBlogId(blogId));
    } catch (error) {}
  };
  return (
    <div className="flex mt-7 flex-col items-center gap-5">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white w-full rounded-lg shadow-2xl p-3 py-4 flex flex-col gap-1"
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Author: {comment.authorId.username}</p>
            <p className="text-gray-600">
              {new Date(comment.createdAt).toDateString()}
            </p>
          </div>
          <p>{comment.content}</p>
          <div className="flex justify-end gap-5">
            <FaPen size={25} className="cursor-pointer" />
            <MdDelete
              size={27}
              className="cursor-pointer"
              onClick={() => {
                handleDelete(comment._id, comment.blogId);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
