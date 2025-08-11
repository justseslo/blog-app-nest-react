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
import Link from "next/link";
import React, { useState } from "react";

interface ISignupData{}
export default function Signup() {
  const [formData,setFormData] = useState()
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
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800 ">Username:</Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="you"
                name="username"
                
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800">Email:</Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Label className="text-lg text-emerald-800">Password:</Label>
              <Input
                className="ring ring-emerald-600 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                placeholder="******"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button
            className="bg-emerald-700 hover:bg-emerald-900 hover:scale-105 cursor-pointer"
            size={"lg"}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
