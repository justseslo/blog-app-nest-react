"use client";
import { getMe } from "@/lib/reduxtk/features/user/me.slice";
import { AppDispatch, RootState } from "@/lib/reduxtk/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState>((state) => state.me.user);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getMe());
    }
  }, []);
  return (
    <div className="bg-emerald-800 text-white p-5 rounded-bl-4xl rounded-br-4xl flex justify-between items-center">
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
        {user ? (
          <Button className="bg-white text-emerald-900 hover:scale-105 hover:bg-gray-300 cursor-pointer">
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
    </div>
  );
}
