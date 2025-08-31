import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import CommentCard from "./CommentCard";
export default function CommentList() {
  const comments = useSelector((state: RootState) => state.comments.comments);

  return (
    <div className="flex mt-7 flex-col items-center gap-5">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment._id} />
      ))}
    </div>
  );
}
