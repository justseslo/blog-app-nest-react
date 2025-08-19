"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { AppDispatch, RootState } from "@/store/store";
import { checkToken } from "@/features/auth/slice/auth.slice";
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLogined = useSelector((state: RootState) => state.auth.isLogined);
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.removeItem("auth_attempt");
        dispatch(checkToken());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="bg-emerald-800 text-white p-5 rounded-bl-4xl rounded-br-4xl flex justify-between items-center">
      <h1 className="text-3xl">BlogApp</h1>
      <div className="flex gap-5 items-center">
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
