"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserDropDown = () => {
  const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant="ghost"
          className="p-2 rounded-full focus-visible:ring-0"
        >
          <Icons.user />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>{session?.user.name}</DropdownMenuItem>
        <DropdownMenuSeparator />
        {session?.user.role === "admin" && (
          <DropdownMenuItem>
            <Link href={"/admin"}>Admin</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <span>Logout</span>
          <Icons.logout className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
