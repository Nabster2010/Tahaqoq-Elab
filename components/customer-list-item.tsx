"use client";
import { deleteCustomerAction } from "@/app/_actions/_customerActions";
import { cn } from "@/lib/utils";
import { Customer } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import ToastDesc from "./ToastDesc";
import { buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

type CustomerListProps = {
  customer: Customer;
  page: number;
  pageSize: number;
  search: string;
  isAdminUser: boolean;
};
const CustomerListItem = ({
  customer,
  page,
  pageSize,
  search,
  isAdminUser,
}: CustomerListProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(() => {
      deleteCustomerAction(customer.id).then((res) => {
        const data = JSON.parse(res);
        if (data.deletedCustomer) {
          toast({
            title: "Success",
            description: <ToastDesc>Customer Deleted Successfully</ToastDesc>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error>
                Error Deleting Customer! May connected with Vehicles
              </ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell className="font-bold">{customer.name}</TableCell>
      <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
      <TableCell className="text-right">
        <Link
          className={cn(buttonVariants({}))}
          href={`/customers/${customer.id}?page=${page}&pageSize=${pageSize}&search=${search}`}
        >
          Update
        </Link>
      </TableCell>
      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            handleDelete={handleDelete}
            title="Are you Sure you want to delete this Customer?"
            isPending={isPending}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomerListItem;
