"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";

type BackBtnProps = {
  to?: string;
  className?: string;
  icon?: boolean;
  title?: string;
};

const BackButton = ({
  to,
  className,
  icon = true,
  title = "Back",
}: BackBtnProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };
  return (
    <Button
      onClick={handleNavigation}
      variant="ghost"
      title="Go Back"
      className={cn(" my-2", className)}
    >
      <>
        {icon && <Icons.chevronLeft className="w-4 h-4 mr-2" />}
        {title}
      </>
    </Button>
  );
};

export default BackButton;
