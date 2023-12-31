import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getUsers() {
  try {
    const users = await db.user.findMany();
    return { users };
  } catch (error) {
    console.log("error fetching users", { error });
    return { error };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return { user };
  } catch (error) {
    console.log("error fetching user", { error });
    return { error };
  }
}
export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return { user };
  } catch (error) {
    console.log("error fetching user", { error });
    return { error };
  }
}

export async function updateUser(id: User["id"], data: any) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin")
    return { error: "Only admins can update users" };

  try {
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        role: data.role.toLowerCase() || "user",
      },
    });
    return { user };
  } catch (error) {
    console.log("error updating user", { error });
    return { error };
  }
}

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin")
    return { error: "Only admins can delete users" };
  if (session?.user.id === id) return { error: "You cannot delete yourself" };

  try {
    const user = await db.user.delete({
      where: {
        id,
      },
    });
    return { user };
  } catch (error) {
    console.log("error deleting user", { error });
    return { error };
  }
}
