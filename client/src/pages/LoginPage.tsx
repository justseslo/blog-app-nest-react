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
import { checkToken } from "@/features/auth/slice/auth.slice";
import { api } from "@/lib/api";
import type { AppDispatch } from "@/store/store";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

interface ISignupData {
  email: string;
  password: string;
}
export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const [formData, setFormData] = useState<ISignupData>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFormData = () => {
    setFormData({ email: "", password: "" });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(checkToken());
        return navigate("/blogs/1");
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
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle className="text-center text-4xl text-emerald-900">
            Login
          </CardTitle>
          <CardAction>
            <a
              href={"/signup"}
              className="text-emerald-800 text-lg hover:underline"
            >
              signup
            </a>
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
                type="email"
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
                type="password"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
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
