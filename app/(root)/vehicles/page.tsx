import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getPaginatedVehicles } from "@/lib/db/vehicle";
import { ExtendedVehicle } from "@/types";
import { getServerSession } from "next-auth";
import VehiclesList from "@/components/vehicles-list";

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
  const { vehicles, totalPages, currentPage, error } =
    await getPaginatedVehicles({
      ...searchParams,
      search: searchParams.search
        ? decodeURIComponent(searchParams.search as string)
        : undefined,
    });
  if (error) return <div>Error loading vehicles</div>;

  return (
    <Card className="mt-4 ">
      <VehiclesList
        vehicles={vehicles as ExtendedVehicle[]}
        currentPage={currentPage as number}
        totalPages={totalPages as number}
        isAdminUser={isAdminUser}
        searchParams={searchParams}
      />
    </Card>
  );
};

export default VehiclesPage;
