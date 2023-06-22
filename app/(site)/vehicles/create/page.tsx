import { getCustomers } from "@/lib/db/customer";
import VehicleCreateForm from "@/components/vehicle-create-form";
import BackButton from "@/components/back-button";

const CreateVehiclePage = async () => {
  const { customers } = await getCustomers();
  return (
    <section>
      <BackButton to="/vehicles" />
      <VehicleCreateForm customers={customers || []} />
    </section>
  );
};

export default CreateVehiclePage;
