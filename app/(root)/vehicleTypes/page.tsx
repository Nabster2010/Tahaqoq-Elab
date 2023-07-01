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
import VehicleTypeCreateForm from "@/components/vehicleType-create-form";
import VehicleTypeListItem from "@/components/vehicleType-list-item";
import { siteConfig } from "@/config/site";
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
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search ? searchParams.search : "";

  const { vehicleTypes, currentPage, totalPages } =
    await getPaginatedVehicleTypes(search, page, pageSize);

  return (
    <Card className="mt-4">
      <CardHeader className="space-y-4">
        <Title>Vehicle Types</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm searchParams={searchParams} />
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
                  page={page}
                  pageSize={pageSize}
                  search={search}
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

export default VehicleTypesPage;
