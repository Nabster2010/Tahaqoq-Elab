import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "flex items-center text-background justify-center w-8 h-8 p-2 font-serif text-xl font-bold rounded-full  bg-gradient-to-r from-amber-400 to-red-600",
        className
      )}
    >
      T
    </span>
  );
};

export default Logo;
