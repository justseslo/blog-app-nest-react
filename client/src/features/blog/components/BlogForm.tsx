import type { IMsg } from "@/common/types/message.interface";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";
import type { ICreateBlog } from "../types/blog.interface";

export default function BlogForm({
  handleSubmit,
  msg,
  formData,
  handleChange,
}: {
  handleSubmit: (e: React.FormEvent) => {};
  msg: IMsg;
  formData: ICreateBlog;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4 bg-white"
      id="signup"
      onSubmit={handleSubmit}
    >
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
          maxLength={15000}
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
    </form>
  );
}
