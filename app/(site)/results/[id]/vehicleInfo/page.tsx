import BackButton from "@/components/back-button";
import VehicleInfoCreateForm from "@/components/VehicleInfoCreateForm";
import VehicleInfoUpdateForm from "@/components/VehicleInfoUpdateForm";
import { getColors } from "@/lib/db/color";
import { getVehicleById } from "@/lib/db/vehicle";
import { getVehicleTypes } from "@/lib/db/vehicleType";

const VehicleInfoResultPage = async ({
  params,
}: {
  params: { id: string };
}) => {
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
      <BackButton to={`/results/${vehicleId}`} />
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
