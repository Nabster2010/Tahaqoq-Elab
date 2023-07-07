import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type PaginationProps = {
  totalPages: number;
  pathName?: string;
  searchParamsAll: {
    page: number;
    search: string;
    pageSize: string;
    sortby: string;
    order: string;
    from: string;
    to: string;
  };
};
const Pagination = ({
  totalPages,
  pathName,
  searchParamsAll,
}: PaginationProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto">
        {/* <!-- Help text --> */}
        <span className="text-sm ">
          Page <span className="font-semibold ">{searchParamsAll?.page}</span>{" "}
          of <span className="font-semibold ">{totalPages}</span>
        </span>
        {/* <!-- Buttons --> */}
        <div className="inline-flex mt-2 xs:mt-0">
          <Button
            disabled={searchParamsAll.page === 1}
            className={cn("text-sm font-medium border-r rounded-r-none")}
          >
            <Link
              href={`/${pathName}/?search=${searchParamsAll?.search}&page=${
                searchParamsAll.page - 1
              }&pageSize=${searchParamsAll?.pageSize}&sortby=${
                searchParamsAll?.sortby
              }&order=${searchParamsAll?.order}&from=${
                searchParamsAll?.from
              }&to=${searchParamsAll?.to}`}
            >
              Prev
            </Link>
          </Button>
          <Button
            disabled={searchParamsAll.page === totalPages}
            className={cn("text-sm font-medium  rounded-l-none")}
          >
            <Link
              href={`/${pathName}/?search=${searchParamsAll.search}&page=${
                searchParamsAll.page + 1
              }&pageSize=${searchParamsAll.pageSize}&sortby=${
                searchParamsAll.sortby
              }&order=${searchParamsAll.order}&from=${
                searchParamsAll?.from
              }&to=${searchParamsAll?.to}`}
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
