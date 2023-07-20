import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ReportNotFound({ vehicleId }: { vehicleId: string }) {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto space-y-8 text-center">
          <h1 className="font-extrabold tracking-tight text-7xl lg:text-9xl">
            404
          </h1>
          <p className="text-3xl font-bold tracking-tight md:text-4xl">
            Report is not Available.
          </p>
          <p className="text-lg font-light ">Please Add results First.</p>
          <Link href={`/results/${vehicleId}`} className={cn(buttonVariants())}>
            Submit Results
          </Link>
        </div>
      </div>
    </section>
  );
}
