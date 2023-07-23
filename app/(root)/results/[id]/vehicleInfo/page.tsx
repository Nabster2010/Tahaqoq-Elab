import BackButton from "@/components/back-button";
import VehicleInfoCreateForm from "@/components/VehicleInfoCreateForm";
import VehicleInfoUpdateForm from "@/components/VehicleInfoUpdateForm";
import { getColors } from "@/lib/db/color";
import { getVehicleById } from "@/lib/db/vehicle";
import { getVehicleTypes } from "@/lib/db/vehicleType";
import { defaultModelYear } from "@/lib/helpers";
import { ExtendedVehicleType } from "@/types";
import { Color } from "@prisma/client";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Vehicle Info Results",
  description: "Add Vehicle Info results for Vehicle",
};
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
    return notFound();
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <VehicleInfoUpdateForm
          vehicleInfo={vehicle.vehicleInfo!}
          colors={colors as Color[]}
          vehicleTypes={vehicleTypes as ExtendedVehicleType[]}
        />
      ) : (
        <VehicleInfoCreateForm
          defaultModelYear={defaultModelYear(vehicle.vin) || ""}
          vehicleId={vehicle.id}
          colors={colors as Color[]}
          vehicleTypes={vehicleTypes as ExtendedVehicleType[]}
        />
      )}
    </section>
  );
};
export default VehicleInfoResultPage;
