import Pagination from "@/components/Pagination";
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
import FilterForm from "@/components/filter-form";

export const metadata = {
  title: "Vehicles",
  description: "List all  Vehicle",
};

const VehiclesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchParamsDefault = {
    search: "",
    page: 1,
    pageSize: siteConfig.pageSize.toString(),
    sortby: "id",
    order: "desc",
    from: "",
    to: "",
  };

  //get all search params

  const searchParamsAll = {
    ...searchParamsDefault,
    ...searchParams,
    page: isNaN(Number(searchParams?.page)) ? 1 : Number(searchParams?.page),
  };

  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";
  const { vehicles, totalPages, error } = await getPaginatedVehicles(
    searchParamsAll
  );
  return (
    <Card className="mt-4 ">
      <CardHeader className="space-y-4">
        <Title>Vehicles</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <Link
            href="/vehicles/create"
            className={cn(buttonVariants({}), " md:ml-auto ")}
          >
            <span>Create New</span>
          </Link>
        </div>
        <FilterForm />
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
              <TableHead className="hidden px-1 text-center md:table-cell">
                Date
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
                  searchParams={searchParamsAll}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={12}>
                  No Vehicles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <>
          {vehicles && vehicles?.length > 0 && totalPages && totalPages >= 1 ? (
            <Pagination
              pathName="vehicles"
              totalPages={totalPages}
              searchParamsAll={searchParamsAll}
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
