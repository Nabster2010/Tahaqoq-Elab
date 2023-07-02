"use client";
import { deleteCustomerAction } from "@/app/_actions/_customerActions";
import { deleteVehicleAction } from "@/app/_actions/_vehicleActions";
import { siteConfig } from "@/config/site";
import { canIssueReport, slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ExtendedVehicle } from "@/types";
import { Customer, Vehicle } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import { Icons } from "./icons";
import ToastDesc from "./ToastDesc";
import { Button, buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

type VehicleListProps = {
  vehicle: Vehicle & { customer: { name: string } };
  page: number;
  pageSize: number;
  search: string;
  isAdminUser: boolean;
};
const VehicleListItem = ({
  vehicle,
  page,
  pageSize,
  search,
  isAdminUser,
}: VehicleListProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(() => {
      deleteVehicleAction(vehicle.id).then((res) => {
        const data = JSON.parse(res);
        if (data.success) {
          toast({
            title: "Success",
            description: <ToastDesc>Vehicle Deleted Successfully</ToastDesc>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: <ToastDesc error>Error Deleting Vehicle!</ToastDesc>,
          });
        }
      });
    });
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell className="font-bold">{slugify(vehicle.id)}</TableCell>
      <TableCell className="hidden md:table-cell">{vehicle.vin}</TableCell>
      <TableCell className="hidden md:table-cell">
        {vehicle.customer?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">{vehicle.reqNo}</TableCell>
      <TableCell className="hidden md:table-cell">
        {siteConfig.ports.find((v) => v.description === vehicle.port)?.name}
      </TableCell>
      <TableCell className="">
        <Link
          prefetch={false}
          className={cn(buttonVariants({}), "whitespace-nowrap ")}
          href={`/results/${vehicle.id}?search=${
            search ? search : ""
          }&page=${page}&pageSize=${pageSize}`}
        >
          {canIssueReport(vehicle as ExtendedVehicle)
            ? "View Result"
            : "Add Result"}
        </Link>
      </TableCell>
      <TableCell className="">
        <Link
          className={cn(buttonVariants({}))}
          href={`/vehicles/${vehicle.id}?search=${
            String(search) || ""
          }&page=${page}&pageSize=${pageSize}`}
        >
          Update
        </Link>
      </TableCell>
      <TableCell className="text-end">
        <Button
          variant="secondary"
          className="ring-2 ring-gray-300"
          disabled={!canIssueReport(vehicle as ExtendedVehicle)}
        >
          <Link target={"_blank"} href={`/reports/${vehicle.id}`}>
            {canIssueReport(vehicle as ExtendedVehicle) ? (
              <Icons.report className="w-6 h-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ban"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
            )}
          </Link>
        </Button>
      </TableCell>

      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            handleDelete={handleDelete}
            title="Are you Sure you want to delete this Vehicle?"
            desc="This action will lead to a missing vehicle_id."
            isPending={isPending}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default VehicleListItem;
