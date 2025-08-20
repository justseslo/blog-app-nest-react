"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { checkToken } from "@/features/auth/slice/auth.slice";
import { api } from "@/lib/api";
export default function Navbar() {
  const navigate = useNavigate();
  const isLogined = useSelector((state: RootState) => state.auth.isLogined);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/logout", {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(checkToken());
      }
    } catch (error) {}
  };
  return (
    <nav className="bg-emerald-800 text-white p-5 rounded-bl-4xl rounded-br-4xl flex justify-between items-center">
      <h1
        className="text-3xl cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        BlogApp
      </h1>
      <div className="flex gap-5 items-center">
        <a className="hover:underline" href={"/blogs"}>
          Blogs
        </a>
        <a className="hover:underline" href={"/about"}>
          About
        </a>
        <a className="hover:underline" href={"/contact"}>
          Contact
        </a>
        <a className="hover:underline" href={"/authors"}>
          Authors
        </a>
        <a className="hover:underline" href={"/my-blogs"}>
          My Blogs
        </a>
        {isLogined ? (
          <Button
            className="bg-white text-emerald-900 hover:scale-105 hover:bg-gray-300 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <div className="flex gap-5 items-center">
            <a className="hover:underline" href={"/login"}>
              Login
            </a>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              className="bg-white text-emerald-900 hover:scale-105 hover:bg-gray-300 cursor-pointer"
            >
              Signup
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
