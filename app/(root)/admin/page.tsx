import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AdminPage = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="underline underline-offset-4">
          Admin Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          className={cn(buttonVariants({ size: "lg" }))}
          href={"/admin/users"}
        >
          Manage Users
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
