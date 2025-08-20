import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBlog } from "../types/blog.interface";
import { api } from "@/lib/api";
interface IBlogsState {
  blogs: IBlog[];
  currentBlog: IBlog | undefined;
  myBlogs: IBlog[];
}
const initialState: IBlogsState = {
  blogs: [],
  currentBlog: undefined,
  myBlogs: [],
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
export const getMyblogs = createAsyncThunk("blogs/myBlogs", async () => {
  try {
    const res = await api.get("/blogs/my-blogs");
    if (res.data.success) return res.data.myblogs;
  } catch (error) {
    throw error;
  }
});
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
    builder.addCase(getMyblogs.fulfilled, (state, action) => {
      state.myBlogs = action.payload;
    });
  },
});
