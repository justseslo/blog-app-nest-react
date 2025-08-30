"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { href, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { checkToken } from "@/features/auth/slice/auth.slice";
import { api } from "@/lib/api";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import { MdSegment } from "react-icons/md";
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
  const links = [
    { href: "/blogs/1", text: "Blogs" },
    { href: "/my-blogs/1", text: "My Blogs" },
    { href: "/blogs/create-blog", text: "Create Blog" },
    { href: "/authors", text: "Authors" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];
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
      <div className="gap-5 items-center sm:flex hidden">
        {links.map((link, index) => (
          <a href={link.href} key={index} className="hover:underline">
            {link.text}
          </a>
        ))}
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
      <Sheet>
        <SheetTrigger className="sm:hidden ">
          <MdSegment size={30} className="cursor-pointer" />
        </SheetTrigger>

        <SheetContent
          className="sm:hidden bg-emerald-800 flex text-white flex-col "
          side="left"
        >
          <SheetClose className="flex justify-end mt-4 mr-4">
            <MdSegment size={30} className="cursor-pointer rotate-y-180" />
          </SheetClose>
          <div className=" flex flex-col ">
            {links.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="hover:underline text-2xl py-3 hover:bg-emerald-900 rounded-xl text-center"
              >
                {link.text}
              </a>
            ))}
          </div>
          <SheetFooter>
            {isLogined ? (
              <Button
                className="bg-white text-emerald-900 hover:scale-105 hover:bg-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <div className="flex gap-5 items-center justify-around">
                <a className="hover:underline text-2xl" href={"/login"}>
                  Login
                </a>
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="bg-white text-emerald-900 text-xl hover:scale-105 hover:bg-gray-300 cursor-pointer"
                  size={"lg"}
                >
                  Signup
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
