"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
interface IBlog {
  title: string;
  imageUrl: string;
  description: string;
  content: string;
}
interface IMsg {
  type: "error" | "success" | "";
  msg: string;
}
export default function CreateBlog() {
  const [msg, setMsg] = useState<IMsg>({ type: "", msg: "" });
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/blogs", formData, { withCredentials: true });
      if (res.data.success) {
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
  const [formData, setFormData] = useState<IBlog>({
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
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="absolute right-10 bottom-10 bg-emerald-800 text-white rounded-full min-w-12 min-h-12 cursor-pointer flex justify-center items-center"
          onClick={clearFormData}
        >
          <FaPlus size={23} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          className="flex flex-col gap-4 bg-white"
          id="signup"
          onSubmit={handleCreate}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-4xl text-emerald-900">
              Create Blog
            </DialogTitle>
          </DialogHeader>

          {msg ? (
            <p
              className={`${
                msg.type === "success" ? "text-emerald-500" : "text-red-700"
              }`}
            >
              {msg.msg}
            </p>
          ) : null}
          <div className="flex flex-col justify-center gap-3">
            <Label className="text-lg text-emerald-800" htmlFor="title">
              Title:
            </Label>
            <Input
              className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              placeholder="Enter title..."
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Label className="text-lg text-emerald-800" htmlFor="description">
              Description:
            </Label>
            <Textarea
              className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              placeholder="Enter description..."
              id="description"
              name="description"
              value={formData.description}
              maxLength={250}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Label className="text-lg text-emerald-800" htmlFor="content">
              Content:
            </Label>
            <Textarea
              className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              placeholder="Enter content..."
              id="content"
              name="content"
              maxLength={3000}
              onChange={handleChange}
              value={formData.content}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Label className="text-lg text-emerald-800" htmlFor="imageUrl">
              Image Url:
            </Label>
            <Input
              className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              placeholder="Enter image url..."
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button
              className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
              size={"lg"}
              form="signup"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
