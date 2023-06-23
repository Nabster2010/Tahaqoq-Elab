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
import { getPaginatedVehicleTypes } from "@/lib/db/vehicleType";
import { cn } from "@/lib/utils";
import Link from "next/link";

const VehicleTypesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleTypes && vehicleTypes?.length > 0 ? (
              vehicleTypes.map((vehicleType) => (
                <TableRow key={vehicleType.id}>
                  <TableCell className="font-medium">
                    {vehicleType.modelType}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicleType.description}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {vehicleType.manufacturer.name}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link
                      className={cn(buttonVariants({}))}
                      href={`/vehicleTypes/${vehicleType.id}`}
                    >
                      Update
                    </Link>
                  </TableCell>
                </TableRow>
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
