import Navbar from "@/components/layout/Navbar";
import React from "react";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
 