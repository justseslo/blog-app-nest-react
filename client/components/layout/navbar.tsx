"use client";
import { checkToken } from "@/lib/reduxtk/features/auth/auth.slice";
import { AppDispatch, RootState } from "@/lib/reduxtk/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLogined = useSelector<RootState>((state) => state.auth.isLogined);
  useEffect(() => {
    const hasAuthAttempt = localStorage.getItem("auth_attempt");
    if (hasAuthAttempt === "true") {
      dispatch(checkToken());
    }
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
        <Link className="hover:underline" href={"/about"}>
          About
        </Link>
        <Link className="hover:underline" href={"/contact"}>
          Contact
        </Link>
        <Link className="hover:underline" href={"/authors"}>
          Authors
        </Link>
        <Link className="hover:underline" href={"/my-blogs"}>
          My Blogs
        </Link>
        {isLogined ? (
          <Button
            className="bg-white text-emerald-900 hover:scale-105 hover:bg-gray-300 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <div className="flex gap-5 items-center">
            <Link className="hover:underline" href={"/login"}>
              Login
            </Link>
            <Button
              onClick={() => {
                router.push("/signup");
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
