"use client";
import { deleteBrokerAction } from "@/app/_actions/_brokerActions";
import { cn } from "@/lib/utils";
import { Broker } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import ConfirmDelete from "./confirm-delete";
import ToastDesc from "./ToastDesc";
import { buttonVariants } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { toast } from "./ui/use-toast";

type BrokerListProps = {
  broker: Broker;
  isAdminUser: boolean;
};
const BrokerListItem = ({ broker, isAdminUser }: BrokerListProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(() => {
      deleteBrokerAction(broker.id).then((res) => {
        const data = JSON.parse(res);
        if (data.deletedBroker) {
          toast({
            title: "Success",
            description: <ToastDesc>Broker Deleted Successfully</ToastDesc>,
          });
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: <ToastDesc error>Error Deleting Broker</ToastDesc>,
          });
        }
      });
    });
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell className="font-bold">{broker.name}</TableCell>
      <TableCell className="hidden md:table-cell">{broker.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{broker.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        {broker.percentage}
      </TableCell>
      <TableCell className="text-right">
        <Link className={cn(buttonVariants({}))} href={`/brokers/${broker.id}`}>
          Update
        </Link>
      </TableCell>
      {isAdminUser && (
        <TableCell className="text-right">
          <ConfirmDelete
            handleDelete={handleDelete}
            title="Are you Sure you want to delete this Broker?"
            isPending={isPending}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default BrokerListItem;
