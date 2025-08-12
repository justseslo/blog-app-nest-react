"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ISignupData {
  username: string;
  email: string;
  password: string;
}
export default function Signup() {
  const router = useRouter();
  const [msg, setMsg] = useState<string>("");
  const [formData, setFormData] = useState<ISignupData>({
    email: "",
    password: "",
    username: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFormData = () => {
    setFormData({ email: "", password: "", username: "" });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        router.push("/login");
      }
      clearFormData();
    } catch (error) {
      if (error instanceof AxiosError) {
        setMsg(error.response?.data?.msg);
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
      console.error(error);
      clearFormData();
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle className="text-center text-4xl text-emerald-900">
            Signup
          </CardTitle>
          <CardAction>
            <Link
              href={"/login"}
              className="text-emerald-800 text-lg hover:underline"
            >
              login
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            id="signup"
            onSubmit={handleSubmit}
          >
            {msg ? <p className="text-red-700">{msg}</p> : null}
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800 " htmlFor="username">
                Username:
              </Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="you"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800" htmlFor="email">
                Email:
              </Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="you@example.com"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800" htmlFor="password">
                Password:
              </Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="******"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button
            className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
            size={"lg"}
            form="signup"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
