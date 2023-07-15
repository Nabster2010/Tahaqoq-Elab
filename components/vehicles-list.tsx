import { ExtendedVehicle, PaginationProps, VehiclesFilterProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VehicleListItem from "./vehicle-list-item";

type VehiclesListProps = {
  vehicles: ExtendedVehicle[];
  searchParams: PaginationProps & VehiclesFilterProps;
  isAdminUser: boolean;
};
const VehiclesList = ({
  vehicles,
  searchParams,
  isAdminUser,
}: VehiclesListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold ">
          <TableHead className="px-1 w-fit ">No</TableHead>
          <TableHead className="hidden print:table-cell md:table-cell">
            Vin
          </TableHead>
          <TableHead className="hidden text-center print:table-cell md:table-cell">
            Customer
          </TableHead>
          <TableHead className="hidden px-1 print:table-cell md:table-cell">
            Ctrl No
          </TableHead>
          <TableHead className="hidden px-1 text-center print:table-cell md:table-cell">
            Port
          </TableHead>
          <TableHead className="hidden px-1 text-center print:table-cell md:table-cell">
            Broker
          </TableHead>
          <TableHead className="hidden px-1 text-center print:table-cell md:table-cell">
            Date
          </TableHead>
          <TableHead className="px-1 text-center print:hidden">
            Result
          </TableHead>
          <TableHead className="px-1 text-center print:hidden">Edit</TableHead>
          <TableHead className="hidden px-1 text-center print:hidden md:table-cell">
            Receipt
          </TableHead>
          <TableHead className="px-1 text-center print:hidden">
            Report
          </TableHead>
          {isAdminUser && (
            <TableHead className="px-1 text-right print:hidden">
              Delete
            </TableHead>
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
  );
};

export default VehiclesList;
