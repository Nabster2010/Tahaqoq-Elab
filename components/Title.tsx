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
        "w-full py-3 text-xl md:text-2xl font-bold text-center rounded-md bg-secondary ",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
