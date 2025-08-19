import Home from "@/pages/home/Home";
import React from "react";
import { Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import { SignupPage } from "@/pages/signup/Signup";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" index element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AppRoute;
 