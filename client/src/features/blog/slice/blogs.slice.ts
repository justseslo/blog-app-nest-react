import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBlog } from "../types/blog.interface";
import { api } from "@/lib/api";
interface IBlogsState {
  blogs: IBlog[];
  currentBlog: IBlog | undefined;
  myBlogs: IBlog[];
  blogsCount: number;
  bestBlogs: IBlog[];
}
const initialState: IBlogsState = {
  blogs: [],
  currentBlog: undefined,
  myBlogs: [],
  blogsCount: 0,
  bestBlogs: [],
};
export const getBestBlogs = createAsyncThunk("blogs/getBestBlogs", async () => {
  try {
    const res = await api.get("/blogs/best-blogs");
    if (res.data.success) return res.data.bestBlogs;
  } catch (error) {
    throw error;
  }
});
export const getBlogDetail = createAsyncThunk(
  "blogs/getBlogDetail",
  async (id: string) => {
    try {
      const res = await api.get(`/blogs/details/${id}`);
      if (res.data.success) return res.data.blog;
    } catch (error) {
      throw error;
    }
  }
);
export const getMyblogs = createAsyncThunk(
  "blogs/myBlogs",
  async (page: string) => {
    try {
      const res = await api.get(`/blogs/my-blogs/${page}`);
      if (res.data.success) return res.data.myblogs;
    } catch (error) {
      throw error;
    }
  }
);
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (page: string) => {
    try {
      const res = await api.get(`/blogs/page/${page}`);
      if (res.data.success) return res.data.blogs;
    } catch (error) {
      throw error;
    }
  }
);
export const getBlogsCount = createAsyncThunk(
  "blogs/getBlogsCount",
  async () => {
    try {
      const res = await api.get("/blogs/count");
      if (res.data.success) return res.data.blogsCount;
    } catch (error) {
      throw error;
    }
  }
);
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
    builder.addCase(getBlogsCount.fulfilled, (state, action) => {
      state.blogsCount = action.payload;
    });
    builder.addCase(getBestBlogs.fulfilled, (state, action) => {
      state.bestBlogs = action.payload;
    });
  },
});
