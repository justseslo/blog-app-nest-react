import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlogForm from "./BlogForm";
import { FaPen } from "react-icons/fa";
import type { IMsg } from "@/common/types/message.interface";
import type { IBlog } from "../types/blog.interface";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useParams } from "react-router";
import { getBlogs, getMyblogs } from "../slice/blogs.slice";

export default function UpdateBlog({ blog }: { blog: IBlog }) {
  const dispatch = useDispatch<AppDispatch>();
  const { page } = useParams();

  const [msg, setMsg] = useState<IMsg>({ msg: "", type: "" });
  const [formData, setFormData] = useState<IBlog>(blog);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = async (e: React.FormEvent, blogId: string) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/blogs/${blogId}`, formData);
      if (res.data.success) dispatch(getMyblogs(page ? page : "1"));
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg({ msg: error.response?.data?.msg, type: "error" });
        setTimeout(() => {
          setMsg({ msg: "", type: "" });
        }, 2000);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaPen
          className="cursor-pointer"
          size={25}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-4xl text-emerald-900">
            Update Blog
          </DialogTitle>
        </DialogHeader>
        <BlogForm
          blog={blog}
          handleUpdate={handleUpdate}
          msg={msg}
          formData={formData}
          handleChange={handleChange}
          isCreate={false}
        />
        <DialogFooter>
          <Button
            className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
            size={"lg"}
            form="update"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
