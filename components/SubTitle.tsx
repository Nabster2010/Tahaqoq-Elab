import { cn } from "@/lib/utils";
import React from "react";

const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "mt-8 underline underline-offset-4 mb-8 text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default SubTitle;
