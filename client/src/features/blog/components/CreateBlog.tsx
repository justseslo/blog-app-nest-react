"use client";
import React, { useState } from "react";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import type { ICreateBlog } from "../types/blog.interface";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { getBlogs } from "../slice/blogs.slice";
import type { IMsg } from "@/common/types/message.interface";
import BlogForm from "./BlogForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

export default function CreateBlog() {
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState<IMsg>({ type: "", msg: "" });
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/blogs", formData, { withCredentials: true });
      if (res.data.success) {
        dispatch(getBlogs());
        setMsg({ msg: res.data.msg, type: "success" });
        setTimeout(() => {
          setMsg({ msg: "", type: "" });
        }, 2000);
      }
      clearFormData();
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg({ msg: error.response?.data?.msg, type: "error" });
        setTimeout(() => {
          setMsg({ msg: "", type: "" });
        }, 2000);
      }
      console.error(error);
      clearFormData();
    }
  };
  const [formData, setFormData] = useState<ICreateBlog>({
    content: "",
    description: "",
    imageUrl: "",
    title: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFormData = () => {
    setFormData({ content: "", description: "", imageUrl: "", title: "" });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-4xl text-emerald-900">
          Create Blog
        </CardTitle>
      </CardHeader>
      <CardContent className="sm:min-w-md">
        <BlogForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleCreate}
          msg={msg}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
          size={"lg"}
          form="signup"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
