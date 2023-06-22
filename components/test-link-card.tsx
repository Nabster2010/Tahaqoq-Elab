import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type TestLinkCardProps = {
  href: string;
  test: string;
  src: string;
  title: string;
  status: "PASS" | "FAIL" | "INCOMPLETE";
};

const TestLinkCard = ({
  href,
  test,
  src,
  title,
  status,
}: TestLinkCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex flex-col border-b-[6px] items-center justify-center w-32 h-32 gap-2 transition-transform rounded-lg shadow-md bg-border hover:scale-110",
        status === "INCOMPLETE" && "border-gray-400 ",
        status === "PASS" && "border-green-700 ",
        status === "FAIL" && "border-destructive "
      )}
    >
      {/* <span
        className={cn(
          "absolute w-3 h-3 rounded-full top-2 left-2 bg-destructive",
          status === "INCOMPLETE" && "bg-gray-400",
          status === "PASS" && "bg-green-700",
          status === "FAIL" && "bg-destructive"
        )}
      /> */}

      <Image alt={test} src={src} width={70} height={70} />
      <p>{title}</p>
    </Link>
  );
};

export default TestLinkCard;
