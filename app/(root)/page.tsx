import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="absolute inset-0 z-10 w-full h-full ">
        <Image alt="bg" src="/images/bg.jpeg" className="object-cover" fill />
        <div className="absolute inset-0 opacity-40 bg-slate-950" />
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-24 text-white ">
        <section className="flex flex-col items-center justify-center px-4 py-8 mx-2 md:px-8 backdrop-blur-sm bg-slate-900/20 rounded-xl">
          <div className="  text-3xl font-bold leading-[3rem] md:tracking-widest  text-center">
            <h1 className="text-4xl text-transparent uppercase md:text-5xl md:leading-loose bg-clip-text bg-gradient-to-r from-amber-400 to-red-600">
              {siteConfig.title}
            </h1>

            <p className="mt-6">{siteConfig.description}</p>

            <p className="mt-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600">
                {siteConfig.branch}
              </span>{" "}
              (ELAB)
            </p>
          </div>
          <Link
            href={"/vehicles"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "md:mt-8 w-full md:w-52 mt-16  font-bold text-slate-950 bg-slate-50 hover:bg-slate-300"
            )}
          >
            START
          </Link>
        </section>
      </div>
    </main>
  );
}
