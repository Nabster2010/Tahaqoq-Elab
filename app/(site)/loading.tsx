import { Icons } from "@/components/icons";
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}
