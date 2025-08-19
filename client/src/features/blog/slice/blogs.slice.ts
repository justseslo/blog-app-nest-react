import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBlog } from "../types/blog.interface";
import { api } from "@/lib/api";
interface IBlogsState {
  blogs: IBlog[];
  currentBlog: IBlog | undefined;
}
const initialState: IBlogsState = {
  blogs: [],
  currentBlog: undefined,
};
export const getBlogDetail = createAsyncThunk(
  "blogs/getBlogDetail",
  async (id: string) => {
    try {
      const res = await api.get(`/blogs/${id}`);
      if (res.data.success) return res.data.blog;
    } catch (error) {
      throw error;
    }
  }
);
export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
  try {
    const res = await api.get("/blogs");
    if (res.data.success) return res.data.blogs;
  } catch (error) {
    throw error;
  }
});
export const blogsSlice = createSlice({
  initialState,
  name: "blogs",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(getBlogDetail.fulfilled, (state, action) => {
      state.currentBlog = action.payload;
    });
  },
});
