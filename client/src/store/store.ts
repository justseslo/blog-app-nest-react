import { authSlice } from "@/features/auth/slice/auth.slice";
import { blogsSlice } from "@/features/blog/slice/blogs.slice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blogs: blogsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
