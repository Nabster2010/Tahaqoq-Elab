import { testLimits } from "@/config/testConfig";
import { cn } from "@/lib/utils";

const Indicator = ({
  value,
  test,
  className,
}: {
  value: number;
  test: string;
  className?: string;
}) => {
  const { min, max } = testLimits[test as keyof typeof testLimits];
  const result = value >= min && value <= max;
  return result ? (
    <svg
      className={cn("w-8 h-8 ml-auto text-green-600", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ) : (
    <svg
      className={cn("w-8 h-8 ml-auto text-red-600", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default Indicator;
