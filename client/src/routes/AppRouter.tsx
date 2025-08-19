import React from "react";
import { Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import { SignupPage } from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import BlogsPage from "@/pages/blogs/BlogsPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" index element={<HomePage />} />
        <Route path="blogs" element={<BlogsPage />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRouter;
