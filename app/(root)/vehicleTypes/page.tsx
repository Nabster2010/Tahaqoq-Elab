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
import VehicleTypeListItem from "@/components/vehicleType-list-item";
import { authOptions } from "@/lib/auth";
import { getPaginatedVehicleTypes } from "@/lib/db/vehicleType";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: " Vehicle Types",
  description: "Add and update vehicle types",
};

const VehicleTypesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";

  const { vehicleTypes, currentPage, totalPages } =
    await getPaginatedVehicleTypes({
      ...searchParams,
      search: searchParams.search
        ? decodeURIComponent(searchParams.search as string)
        : undefined,
    });
  return (
    <Card className="mt-4">
      <CardHeader className="space-y-4">
        <Title>Vehicle Types</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm />
          <Link
            href="/vehicleTypes/create"
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
              <TableHead className="w-fit ">Model Type</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Manufacturer
              </TableHead>
              <TableHead className="text-right">Edit</TableHead>
              {isAdminUser && (
                <TableHead className="text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleTypes && vehicleTypes?.length > 0 ? (
              vehicleTypes.map((vehicleType) => (
                <VehicleTypeListItem
                  key={vehicleType.id}
                  vehicleType={vehicleType}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={4}>
                  No vehicle Types found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="vehicleTypes"
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

export default VehicleTypesPage;
