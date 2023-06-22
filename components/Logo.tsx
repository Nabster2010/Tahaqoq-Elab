import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "flex items-center justify-center w-8 h-8 p-2 font-serif text-xl font-bold rounded-full text-background bg-foreground ",
        className
      )}
    >
      T
    </span>
  );
};

export default Logo;
