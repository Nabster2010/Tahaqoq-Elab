import BackButton from "@/components/back-button";
import VehicleInfoCreateForm from "@/components/VehicleInfoCreateForm";
import VehicleInfoUpdateForm from "@/components/VehicleInfoUpdateForm";
import { siteConfig } from "@/config/site";
import { getColors } from "@/lib/db/color";
import { getVehicleById } from "@/lib/db/vehicle";
import { getVehicleTypes } from "@/lib/db/vehicleType";

export const metadata = {
  title: "Vehicle Info Results",
  description: "Add Vehicle Info results for Vehicle",
};
const VehicleInfoResultPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);
  const { colors } = await getColors();
  const { vehicleTypes } = await getVehicleTypes();
  const hasResult = !!vehicle?.vehicleInfo;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      {hasResult ? (
        <VehicleInfoUpdateForm
          vehicleInfo={vehicle.vehicleInfo!}
          vehicleTypes={vehicleTypes || []}
          colors={colors || []}
        />
      ) : (
        <VehicleInfoCreateForm
          vehicleId={vehicle.id}
          colors={colors || []}
          vehicleTypes={vehicleTypes || []}
        />
      )}
    </section>
  );
};
export default VehicleInfoResultPage;
