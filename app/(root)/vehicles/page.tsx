import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getPaginatedVehicles } from "@/lib/db/vehicle";
import { ExtendedVehicle } from "@/types";
import { getServerSession } from "next-auth";
import VehiclesList from "@/components/vehicles-list";
import Title from "@/components/Title";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import VehiclesFilterForm from "@/components/vehicles-filter-form";
import Pagination from "@/components/Pagination";

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
  const { vehicles, totalPages, currentPage, error, itemsCount } =
    await getPaginatedVehicles({
      ...searchParams,
      search: searchParams.search
        ? decodeURIComponent(searchParams.search as string)
        : undefined,
    });
  if (error) return <div>Error loading vehicles</div>;

  return (
    <Card className="mt-2 ">
      <CardHeader className="space-y-2 print:hidden">
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
        <VehiclesList
          vehicles={vehicles as ExtendedVehicle[]}
          isAdminUser={isAdminUser}
          searchParams={searchParams}
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-center justify-center gap-2 mx-auto">
          {itemsCount && itemsCount !== 0 ? (
            <p className="text-sm text-muted-foreground">
              Total Result: {itemsCount}
            </p>
          ) : (
            ""
          )}
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehiclesPage;
