import { ExtendedVehicle, PaginationProps, VehiclesFilterProps } from "@/types";
import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import VehiclesFilterForm from "@/components/vehicles-filter-form";
import { cn } from "@/lib/utils";
import VehicleListItem from "./vehicle-list-item";

type VehiclesListProps = {
  vehicles: ExtendedVehicle[];
  totalPages: number;
  currentPage: number;
  searchParams: PaginationProps & VehiclesFilterProps;
  isAdminUser: boolean;
};
const VehiclesList = ({
  vehicles,
  totalPages,
  currentPage,
  searchParams,
  isAdminUser,
}: VehiclesListProps) => {
  return (
    <>
      <CardHeader className="space-y-4 ">
        <Title>Vehicles</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <Link
            title="Add New Vehicle"
            href="/vehicles/create"
            className={cn(buttonVariants({}), " md:ml-auto ")}
          >
            <span>Create New</span>
          </Link>
        </div>
        <VehiclesFilterForm />
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
                  searchParams={searchParams}
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
              currentPage={currentPage}
              searchParams={searchParams}
            />
          ) : (
            ""
          )}
        </>
      </CardFooter>
    </>
  );
};

export default VehiclesList;
