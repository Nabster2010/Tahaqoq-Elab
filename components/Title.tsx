import { cn } from "@/lib/utils";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};
const Title = ({ children, className }: TitleProps) => {
  return (
    <h1
      className={cn(
        "w-full uppercase py-3 text-xl md:text-2xl font-bold text-center border rounded-md  bg-border/50  ",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
