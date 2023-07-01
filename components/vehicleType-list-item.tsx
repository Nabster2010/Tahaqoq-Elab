"use client";
import { deleteVehicleTypeAction } from "@/app/_actions/_vehicleTypeActions";
import { cn } from "@/lib/utils";
import { VehicleType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import ToastDesc from "./ToastDesc";
import { buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

type VehicleTypeListProps = {
  vehicleType: VehicleType & { manufacturer: { name: string } };
  page: number;
  pageSize: number;
  search: string;
  isAdminUser: boolean;
};
const VehicleTypeListItem = ({
  vehicleType,
  page,
  pageSize,
  search,
  isAdminUser,
}: VehicleTypeListProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(() => {
      deleteVehicleTypeAction(vehicleType.id).then((res) => {
        const data = JSON.parse(res);
        if (data.success === true) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>VehicleType Deleted Successfully</ToastDesc>
            ),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error>Error Deleting VehicleType!</ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  };

  return (
    <TableRow key={vehicleType.id}>
      <TableCell className="font-bold">{vehicleType.modelType}</TableCell>
      <TableCell className="hidden md:table-cell">
        {vehicleType.description}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {vehicleType.manufacturer.name}
      </TableCell>
      <TableCell className="text-right">
        <Link
          className={cn(buttonVariants({}))}
          href={`/vehicleTypes/${vehicleType.id}?search=${search}&page=${page}&pageSize=${pageSize}`}
        >
          Update
        </Link>
      </TableCell>
      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            handleDelete={handleDelete}
            title="Are you Sure you want to delete this Manufacturer?"
            isPending={isPending}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default VehicleTypeListItem;
