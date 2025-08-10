import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function TealInput({
  className,
  type = "text",
  placeholder = "",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn(
        "border border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-900 focus-visible:ring-offset-2 transition-all duration-300",
        className
      )}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}
