import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Admin Section",
};
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  if (session.user.role !== "admin") {
    return (
      <div className="mt-16 text-2xl font-bold text-center">
        You are not authorized to view this page
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AdminLayout;
