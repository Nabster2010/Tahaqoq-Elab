import ManufacturerListItem from "@/components/manufacturer-list-item";
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
import { authOptions } from "@/lib/auth";
import { getPaginatedManufacturers } from "@/lib/db/manufacturer";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "Manufacturers",
  description: "add and edit Vehicles Manufacturers",
};

const ManufacturersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";

  const { manufacturers, currentPage, totalPages } =
    await getPaginatedManufacturers({
      ...searchParams,
      search: searchParams.search
        ? decodeURIComponent(searchParams.search as string)
        : undefined,
    });

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-2">
        <Title>Manufacturers</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm />

          <Link
            href="/manufacturers/create"
            className={cn(buttonVariants({}), "ml-auto w-full md:w-auto")}
          >
            Create New
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="w-fit ">Manufacturer</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              {isAdminUser && (
                <TableHead className="text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers && manufacturers?.length > 0 ? (
              manufacturers.map((manufacturer) => (
                <ManufacturerListItem
                  key={manufacturer.id}
                  manufacturer={manufacturer}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={4}>
                  No Manufacturers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="manufacturers"
            totalPages={totalPages}
            currentPage={currentPage}
            searchParams={searchParams}
          />
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default ManufacturersPage;
