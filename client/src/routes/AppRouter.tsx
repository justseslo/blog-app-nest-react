import React from "react";
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import { SignupPage } from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import BlogsPage from "@/pages/blogs/BlogsPage";
import BlogsDetailPage from "@/pages/blogs/BlogsDetailPage";
import MyBlogsPage from "@/pages/blogs/MyBlogsPage";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import CreateBlogPage from "@/pages/blogs/CreateBlogPage";

export default function AppRouter() {
  const isLogined = useSelector((state: RootState) => state.auth.isLogined);
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" index element={<HomePage />} />
        <Route path="blogs/:page" element={<BlogsPage />} />
        <Route path="blog-detail/:id" element={<BlogsDetailPage />} />
        <Route
          path="blogs/create-blog"
          element={isLogined ? <CreateBlogPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="my-blogs/:page"
          element={isLogined ? <MyBlogsPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={isLogined ? <Navigate to={"/"} /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={isLogined ? <Navigate to={"/"} /> : <LoginPage />}
        />
      </Route>
    </Routes>
  );
}
