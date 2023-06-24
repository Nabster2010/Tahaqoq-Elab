"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

type TestLinkCardProps = {
  href: string;
  test: string;
  status: "PASS" | "FAIL" | "INCOMPLETE";
};

const TestLinkCard = ({ href, test, status }: TestLinkCardProps) => {
  const { theme } = useTheme();
  return (
    <Link
      href={href}
      className={cn(
        "relative flex flex-col border-b-[7px] items-center p-2 justify-center w-36 h-32 gap-3 transition-transform rounded-lg shadow-md bg-border hover:scale-105",
        status === "INCOMPLETE" && "border-gray-400 ",
        status === "PASS" && "border-green-700 ",
        status === "FAIL" && "border-destructive "
      )}
    >
      <>
        <Image
          className="dark:fill-foreground"
          alt={test}
          src={
            theme === "dark"
              ? `/images/${test}-dark.svg`
              : `/images/${test}.svg`
          }
          width={55}
          height={55}
        />
        <p className="font-semibold capitalize ">{test}</p>
      </>
    </Link>
  );
};

export default TestLinkCard;
