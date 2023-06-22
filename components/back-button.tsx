import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

type BackBtnProps = {
  to: string;
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
  return (
    <Link
      href={to}
      className={cn(buttonVariants({ variant: "ghost" }), " my-2", className)}
    >
      <>
        {icon && <Icons.chevronLeft className="w-4 h-4 mr-2" />}
        {title}
      </>
    </Link>
  );
};

export default BackButton;
