import Navbar from "@/components/layout/Navbar";
import React from "react";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

 