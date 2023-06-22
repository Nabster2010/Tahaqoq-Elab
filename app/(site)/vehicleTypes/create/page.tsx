import BackButton from "@/components/back-button";
import VehicleTypeCreateForm from "@/components/vehicleType-create-form";
import { getManufacturers } from "@/lib/db/manufacturer";

const CreateVehicleTypePage = async () => {
  const { manufacturers } = await getManufacturers();
  return (
    <section>
      <BackButton to={"/vehicleTypes"} />
      <VehicleTypeCreateForm manufacturers={manufacturers || []} />
    </section>
  );
};

export default CreateVehicleTypePage;
