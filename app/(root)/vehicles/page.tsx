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
import VehicleListItem from "@/components/vehicle-list-item";
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth";
import { getPaginatedVehicles } from "@/lib/db/vehicle";
import { cn } from "@/lib/utils";
import { ExtendedVehicle } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "Vehicles",
  description: "List all  Vehicle",
};

const VehiclesPage = async ({
  searchParams,
}: {
  //pathName?search=[search]&page=[page]&pageSize=[pageSize]&sortby=[sortby]&order=[order]&reportDate=[from]_[to]
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
  const sortby = searchParams.sortby;
  const order = searchParams.order;
  const reportDate = searchParams.reportDate;
  const { vehicles, currentPage, totalPages } = await getPaginatedVehicles(
    search,
    page,
    pageSize,
    sortby,
    order,
    reportDate
  );

  // const searchAction = async (data: FormData) => {
  //   "use server";
  //   const search = data.get("search")?.toString();
  //   redirect(`/vehicles?search=${search}&pageSize=${pageSize}`);
  // };

  return (
    <Card className="mt-4 ">
      <CardHeader className="space-y-4">
        <Title>Vehicles</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm
            //action={searchAction}
            defaultValue={search}
            searchParams={searchParams}
          />
          <Link
            href="/vehicles/create"
            className={cn(buttonVariants({}), " md:ml-auto ")}
          >
            Create New
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="px-1 w-fit ">No</TableHead>
              <TableHead className="hidden md:table-cell">Vin</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Customer
              </TableHead>
              <TableHead className="hidden px-1 md:table-cell">
                Ctrl No
              </TableHead>
              <TableHead className="hidden px-1 text-center md:table-cell">
                Port
              </TableHead>
              <TableHead className="hidden px-1 text-center md:table-cell">
                Broker
              </TableHead>
              <TableHead className="px-1 text-center">Result</TableHead>
              <TableHead className="px-1 text-center">Edit</TableHead>
              <TableHead className="hidden px-1 text-center md:table-cell">
                Receipt
              </TableHead>
              <TableHead className="px-1 text-center">Report</TableHead>
              {isAdminUser && (
                <TableHead className="px-1 text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles && vehicles?.length > 0 ? (
              vehicles.map((vehicle) => (
                <VehicleListItem
                  key={vehicle.id}
                  vehicle={vehicle as ExtendedVehicle}
                  page={page}
                  pageSize={pageSize}
                  search={search}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={11}>
                  No Vehicles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <>
          {totalPages && totalPages >= 1 ? (
            <Pagination
              pathName="vehicles"
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              search={search}
            />
          ) : (
            ""
          )}
        </>
      </CardFooter>
    </Card>
  );
};

export default VehiclesPage;
