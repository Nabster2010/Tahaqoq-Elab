"use client";
import { deleteColorAction } from "@/app/_actions/_colorActions";
import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import ToastDesc from "./ToastDesc";
import { buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

const ColorListItem = ({
  color,
  search,
  page,
  pageSize,
  isAdminUser,
}: {
  color: Color;
  search: string;
  page: number;
  pageSize: number;
  isAdminUser: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(() => {
      deleteColorAction(color.id).then((data) => {
        const res = JSON.parse(data);
        if (res.deletedColor) {
          toast({
            title: "Success",
            description: <ToastDesc>Color Deleted Successfully</ToastDesc>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Deleting Color!
              </ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  };
  return (
    <TableRow key={color.id}>
      <TableCell className="font-bold">{color.color}</TableCell>
      <TableCell className="hidden md:table-cell">
        {color.description}
      </TableCell>

      <TableCell className="text-right">
        <Link
          className={cn(buttonVariants({}))}
          href={`/colors/${color.id}?search=${search}&page=${page}&pageSize=${pageSize}`}
        >
          Update
        </Link>
      </TableCell>
      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            isPending={isPending}
            title="Are you Sure you want to delete this Color?"
            handleDelete={handleDelete}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default ColorListItem;
