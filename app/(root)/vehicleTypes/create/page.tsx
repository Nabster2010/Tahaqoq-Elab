import BackButton from "@/components/back-button";
import VehicleTypeCreateForm from "@/components/vehicleType-create-form";
import { getManufacturers } from "@/lib/db/manufacturer";
import { PageSearchParams } from "@/types";
import { VehicleManufacturer } from "@prisma/client";

const CreateVehicleTypePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { manufacturers } = await getManufacturers();
  return (
    <section>
      <BackButton />
      <VehicleTypeCreateForm
        manufacturers={manufacturers as VehicleManufacturer[]}
      />
    </section>
  );
};

export default CreateVehicleTypePage;
