import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button, buttonVariants } from "./ui/button";

type ConfirmDeleteProps = {
  title: string;
  desc?: string;
  variant?: "outline" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "lg" | "default";
  handleDelete: () => void;
  isPending: boolean;
  className?: string;
};

const ConfirmDelete = ({
  title,
  desc,
  handleDelete,
  isPending,
  variant = "destructive",
  size = "default",
  className,
}: ConfirmDeleteProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title="Delete Vehicle!"
          variant={variant}
          className={cn("w-full sm:w-auto", className)}
          type="button"
          size={size}
        >
          {isPending ? (
            <Icons.spinner className="w-4 h-4 animate-spin" />
          ) : (
            <Icons.trash className="w-4 h-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {desc ? desc : "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
