import BackButton from "@/components/back-button";
import VehicleTypeUpdateForm from "@/components/vehicleType-update-form";
import { getManufacturers } from "@/lib/db/manufacturer";
import { getVehicleTypeById } from "@/lib/db/vehicleType";
import { VehicleManufacturer } from "@prisma/client";

const VehicleTypePage = async ({ params }: { params: { id: string } }) => {
  const { manufacturers } = await getManufacturers();
  const { vehicleType } = await getVehicleTypeById(params.id);
  if (!vehicleType) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">
        Vehicle Type Not Found
      </div>
    );
  }
  return (
    <section>
      <BackButton />

      <VehicleTypeUpdateForm
        vehicleType={vehicleType}
        manufacturers={manufacturers as VehicleManufacturer[]}
      />
    </section>
  );
};

export default VehicleTypePage;
