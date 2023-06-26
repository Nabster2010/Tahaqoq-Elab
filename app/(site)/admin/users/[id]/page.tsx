import BackButton from "@/components/back-button";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authOptions } from "@/lib/auth";
import { deleteUser, getUserById, updateUser } from "@/lib/db/users";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

const UserPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const { user } = await getUserById(params.id);
  if (!user) return notFound();

  const updateAction = async (data: FormData) => {
    "use server";
    const name = data.get("name") || user.name;
    const active = data.get("active") === "on" ? true : false;
    const role = data.get("role") || user.role;
    const branch = data.get("branch") || user.branch;
    const { user: updatedUser } = await updateUser(user.id, {
      name,
      active,
      role,
      branch,
    });
    if (updatedUser) {
      revalidatePath(`/admin/users`);
      redirect(`/admin/users`);
    }
  };
  const deleteUserAction = async (data: FormData) => {
    "use server";
    const id = data.get("id") as string;
    await deleteUser(id);
    revalidatePath(`/admin/users`);
    redirect(`/admin/users`);
  };

  return (
    <>
      <BackButton to="/admin/users" />
      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="underline underline-offset-4">
            Update User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateAction} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 ">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  defaultValue={user.name || ""}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  readOnly
                  defaultValue={user.email || ""}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="active"
                  id="active"
                  defaultChecked={user.active}
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
              <Select defaultValue={user.branch as string} name="branch">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select  Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DMM">DMM</SelectItem>
                  <SelectItem value="JED">JED</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={user.role} name="role">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select  Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">ADMIN</SelectItem>
                  <SelectItem value="user">USER</SelectItem>
                  <SelectItem value="tech">TECH</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="id" value={user.id} />
            </div>
            <div className="flex items-center justify-between">
              <Button
                disabled={session.user.id === user.id}
                variant="destructive"
                formAction={deleteUserAction}
                className="flex items-center gap-2"
              >
                <Icons.trash className="w-4 h-4" />
                <span> Delete</span>
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UserPage;
