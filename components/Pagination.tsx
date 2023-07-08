"use client";
import { cn } from "@/lib/utils";
import { VehiclesFilterProps, PaginationProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";

type PaginationPropsType = {
  totalPages: number;
  currentPage: number;
  pathName?: string;
  searchParams: PaginationProps & VehiclesFilterProps;
};
const Pagination = ({
  totalPages,
  currentPage,
  pathName,
  searchParams,
}: PaginationPropsType) => {
  const router = useRouter();

  const initialPage =
    searchParams.page && !isNaN(parseInt(searchParams.page))
      ? parseInt(searchParams.page) - 1
      : 0;
  const handlePageChange = ({ selected }: { selected: number }) => {
    return router.push(
      `/${pathName}/?${new URLSearchParams({
        ...searchParams,
        page: String(selected + 1),
      }).toString()}`
    );
  };
  return (
    <ReactPaginate
      previousLabel={
        <Button
          size={"sm"}
          variant={"outline"}
          disabled={currentPage === 1}
          className={cn("text-sm font-medium border-r rounded-r-none")}
        >
          <Icons.chevronLeft className="w-5 h-5" />
        </Button>
      }
      nextLabel={
        <Button
          size={"sm"}
          variant={"outline"}
          disabled={currentPage === totalPages}
          className={cn("text-sm font-medium border-r rounded-l-none")}
        >
          <Icons.chevronRight className="w-5 h-5" />
        </Button>
      }
      breakLabel={"..."}
      breakLinkClassName={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "rounded-none"
      )}
      activeLinkClassName={"pagination-active-link"}
      containerClassName={"pagination-container"}
      initialPage={initialPage}
      pageCount={totalPages}
      disableInitialCallback={true}
      marginPagesDisplayed={2}
      pageLinkClassName={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        " rounded-none "
      )}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
