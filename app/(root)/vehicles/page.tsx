import { Icons } from "@/components/icons";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/search-form";
import Title from "@/components/Title";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { canIssueReport, slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ExtendedVehicle } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Vehicles",
  description: "List all  Vehicle",
};

const VehiclesPage = async ({
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
  const { vehicles, currentPage, totalPages } = await getPaginatedVehicles(
    search,
    page,
    pageSize
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
              <TableHead className="w-fit ">No</TableHead>
              <TableHead className="hidden md:table-cell">Vin</TableHead>
              <TableHead className="hidden md:table-cell">Request No</TableHead>
              <TableHead className="hidden md:table-cell">Bayan No</TableHead>
              <TableHead className="hidden md:table-cell">Port</TableHead>
              <TableHead>Test Results</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead className="text-right ">Report</TableHead>
              {isAdminUser && (
                <TableHead className="text-right ">Delete</TableHead>
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
                <TableCell className="w-full text-center" colSpan={7}>
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
