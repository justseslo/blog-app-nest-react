import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IComment } from "../types/comment.interface";
import { api } from "@/lib/api";
export const getCommentsByBlogId = createAsyncThunk(
  "comments/getCommentsByBlogId",
  async (blogId: string) => {
    try {
      const res = await api.get(`/comments/${blogId}`);
      if (res.data.success) return res.data.comments;
    } catch (error) {
      throw error;
    }
  }
);
interface ICommentState {
  comments: IComment[];
}
const initialState: ICommentState = { comments: [] };
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers(builder) {
    builder.addCase(getCommentsByBlogId.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
  reducers: {},
});


