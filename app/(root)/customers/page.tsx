import CustomerListItem from "@/components/customer-list-item";
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
import { authOptions } from "@/lib/auth";
import { getPaginatedCustomers } from "@/lib/db/customer";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";
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

  return (
    <Card className="mt-4">
      <CardHeader className="">
        <Title className="mb-4">Customers</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm />
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
              {isAdminUser && (
                <TableHead className="text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers && customers?.length > 0 ? (
              customers.map((customer) => (
                <CustomerListItem
                  customer={customer}
                  key={customer.id}
                  page={page}
                  pageSize={pageSize}
                  search={search}
                  isAdminUser={isAdminUser}
                />
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
            totalPages={totalPages}
            searchParamsAll={{
              search,
              page: currentPage,
              pageSize: pageSize.toString(),
            }}
          />
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomersPage;
