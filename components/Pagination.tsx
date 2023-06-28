import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pathName: string;
  search?: string;
};
const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pathName,
  search,
}: PaginationProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto">
        {/* <!-- Help text --> */}
        <span className="text-sm ">
          Page <span className="font-semibold ">{currentPage}</span> of{" "}
          <span className="font-semibold ">{totalPages}</span>
        </span>
        {/* <!-- Buttons --> */}
        <div className="inline-flex mt-2 xs:mt-0">
          <Button
            disabled={currentPage === 1}
            className={cn("text-sm font-medium border-r rounded-r-none")}
          >
            <Link
              href={`/${pathName}/?search=${search}&page=${
                currentPage - 1
              }&pageSize=${pageSize}`}
            >
              Prev
            </Link>
          </Button>
          <Button
            disabled={currentPage === totalPages}
            className={cn("text-sm font-medium  rounded-l-none")}
          >
            <Link
              href={`/${pathName}/?search=${search || ""}&page=${
                currentPage + 1
              }&pageSize=${pageSize}`}
            >
              {" "}
              Next
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
