import Title from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/lib/db/users";
import { cn } from "@/lib/utils";
import Link from "next/link";

const UsersPage = async () => {
  const { users } = await getUsers();
  return (
    <Card className="mt-4">
      <CardHeader>
        <Title>Users</Title>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="w-fit ">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Active</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users?.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.active ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.role}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      className={cn(buttonVariants({}))}
                      href={`/admin/users/${user.id}`}
                    >
                      Update
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={5}>
                  No Users Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersPage;
