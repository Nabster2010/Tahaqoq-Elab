"use client";
import { useSession } from "next-auth/react";
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

const VehicleActionsMenu = ({ handleDelete, pending, vehicle }: any) => {
  const { data: session, status } = useSession();
  const isAdminUser =
    status === "authenticated" && session?.user?.role === "admin";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.more />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuItem className="">
          <span>Edit</span>
          <Icons.edit className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <span>Receipt</span>
          <Icons.print className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <span>Report</span>
          <Icons.report className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <Link target={"_blank"} href={`/reports/${vehicle.id}/receipt`}>
            Results
          </Link>
          <Icons.print className="w-4 h-4 ml-auto " />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isAdminUser && (
          <>
            <DropdownMenuItem className="">
              <span>Delete</span>
              <Icons.trash className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VehicleActionsMenu;
