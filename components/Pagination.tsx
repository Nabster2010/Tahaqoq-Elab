import { cn } from "@/lib/utils";
import { VehiclesFilterProps, PaginationProps } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";

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
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto">
        {/* <!-- Help text --> */}
        <span className="text-sm ">
          Page <span className="font-semibold ">{currentPage || 1}</span> of{" "}
          <span className="font-semibold ">{totalPages}</span>
        </span>
        {/* <!-- Buttons --> */}
        <div className="inline-flex mt-2 xs:mt-0">
          <Button
            disabled={currentPage === 1}
            className={cn("text-sm font-medium border-r rounded-r-none")}
          >
            <Link
              href={`/${pathName}/?${new URLSearchParams({
                ...searchParams,
                page: String(currentPage - 1),
              }).toString()}`}
            >
              Prev
            </Link>
          </Button>
          <Button
            disabled={currentPage === totalPages}
            className={cn("text-sm font-medium  rounded-l-none")}
          >
            <Link
              href={`/${pathName}/?${new URLSearchParams({
                ...searchParams,
                page: String(currentPage + 1),
              }).toString()}`}
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
