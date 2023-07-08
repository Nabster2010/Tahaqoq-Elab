"use client";
import { deleteManufacturerAction } from "@/app/_actions/_manufacturerActions";
import { cn } from "@/lib/utils";
import { PageSearchParams } from "@/types";
import { VehicleManufacturer } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import ToastDesc from "./ToastDesc";
import { buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

type ManufacturerListProps = {
  manufacturer: VehicleManufacturer;
  searchParams: PageSearchParams;
  isAdminUser: boolean;
};
const ManufacturerListItem = ({
  manufacturer,
  searchParams,
  isAdminUser,
}: ManufacturerListProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(() => {
      deleteManufacturerAction(manufacturer.id).then((res) => {
        const data = JSON.parse(res);
        if (data.success === true) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Manufacturer Deleted Successfully</ToastDesc>
            ),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error>Error Deleting Manufacturer!</ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  };

  return (
    <TableRow key={manufacturer.id}>
      <TableCell className="font-bold">{manufacturer.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {manufacturer.description}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {manufacturer.country}
      </TableCell>

      <TableCell className="text-right">
        <Link
          className={cn(buttonVariants({}))}
          href={`/manufacturers/${manufacturer.id}?${new URLSearchParams(
            searchParams
          ).toString()}`}
        >
          Update
        </Link>
      </TableCell>
      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            handleDelete={handleDelete}
            title="Are you Sure you want to delete this Manufacturer?"
            desc="Deleting this Manufacturer will also delete all the  ModelTypes  associated with it"
            isPending={isPending}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default ManufacturerListItem;
