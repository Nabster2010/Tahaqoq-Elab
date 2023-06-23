import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-24 ">
        <h1 className="text-2xl md:text-3xl font-bold leading-[3rem] md:tracking-widest  text-center">
          <span className="text-4xl uppercase md:text-5xl md:leading-loose">
            {siteConfig.title}
          </span>
          <br /> {siteConfig.description} <br /> {siteConfig.branch} (ELAB)
        </h1>
        <Link
          href={"/vehicles"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "md:mt-8 mt-16 w-40 font-bold"
          )}
        >
          START
        </Link>
      </div>
    </main>
  );
}
