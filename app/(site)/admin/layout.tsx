import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Admin Section",
};
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role.toLowerCase() !== "admin") {
    return notFound();
  }

  return <div>{children}</div>;
};

export default AdminLayout;
