import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Icons.spinner className="w-12 h-12 animate-spin" />
    </div>
  );
}
