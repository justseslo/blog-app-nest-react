import React from "react";
import { Button } from "../ui/button";

export default function TealButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className="cursor-pointer bg-teal-600 hover:bg-teal-900 hover:scale-105"
      size={"lg"}
      {...props}
    >
      {children}
    </Button>
  );
}
