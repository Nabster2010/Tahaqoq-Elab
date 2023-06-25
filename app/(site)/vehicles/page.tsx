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
import { siteConfig } from "@/config/site";
import { getPaginatedVehicles } from "@/lib/db/vehicle";
import { canIssueReport, slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ExtendedVehicle } from "@/types";
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
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search =
    searchParams.search && typeof parseInt(searchParams.search) === "number"
      ? parseInt(searchParams.search)
      : undefined;

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles && vehicles?.length > 0 ? (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {slugify(vehicle.id)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle.vin}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle.reqNo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle.bayanNo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {
                      siteConfig.ports.find(
                        (v) => v.description === vehicle.port
                      )?.name
                    }
                  </TableCell>
                  <TableCell className="">
                    <Link
                      className={cn(buttonVariants({}), "whitespace-nowrap ")}
                      href={`/results/${vehicle.id}`}
                    >
                      {canIssueReport(vehicle as ExtendedVehicle)
                        ? "View Result"
                        : "Add Result"}
                    </Link>
                  </TableCell>
                  <TableCell className="">
                    <Link
                      className={cn(buttonVariants({}))}
                      href={`/vehicles/${vehicle.id}`}
                    >
                      Update
                    </Link>
                  </TableCell>
                  <TableCell className="text-end">
                    <Button
                      variant="secondary"
                      className="ring-2 ring-gray-300"
                      disabled={!canIssueReport(vehicle as ExtendedVehicle)}
                    >
                      <Link target={"_blank"} href={`/reports/${vehicle.id}`}>
                        {canIssueReport(vehicle as ExtendedVehicle) ? (
                          <Icons.report className="w-6 h-6" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-ban"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m4.9 4.9 14.2 14.2" />
                          </svg>
                        )}
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
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
