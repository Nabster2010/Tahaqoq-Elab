import Pagination from "@/components/Pagination";
import SearchForm from "@/components/search-form";
import Title from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteConfig } from "@/config/site";
import { getPaginatedCustomers } from "@/lib/db/customer";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Customers",
  description: "add and edit Customers",
};
const CustomersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";
  const { customers, currentPage, totalPages } = await getPaginatedCustomers(
    search,
    page,
    pageSize
  );

  // const searchAction = async (data: FormData) => {
  //   "use server";
  //   const search = data.get("search") as String;
  //   redirect(`/customers?search=${encodeURI(search.toString())}`);
  // };

  return (
    <Card className="mt-4">
      <CardHeader className="">
        <Title className="mb-4">Customers</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm
            path="/customers"
            //action={searchAction}
            defaultValue={search}
            searchParams={searchParams}
          />
          <Link
            href="/customers/create"
            className={cn(buttonVariants({}), "ml-auto w-full md:w-auto ")}
          >
            Create New
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="w-fit ">Name</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers && customers?.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.phone}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      className={cn(buttonVariants({}))}
                      href={`/customers/${customer.id}?page=${page}&pageSize=${pageSize}&search=${search}`}
                    >
                      Update
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={4}>
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="customers"
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            search={search}
          />
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomersPage;
