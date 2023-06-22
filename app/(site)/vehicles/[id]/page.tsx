import BackButton from "@/components/back-button";
import VehicleUpdateForm from "@/components/vehicle-update-form";
import { getCustomers } from "@/lib/db/customer";
import { getVehicleById } from "@/lib/db/vehicle";

const VehiclePage = async ({ params }: { params: { id: string } }) => {
  const { vehicle } = await getVehicleById(parseInt(params.id));
  const { customers } = await getCustomers();

  if (!vehicle) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Vehicle Not Found</div>
    );
  }

  return (
    <section>
      <BackButton to="/vehicles" />
      <VehicleUpdateForm customers={customers || []} vehicle={vehicle} />;
    </section>
  );
};

export default VehiclePage;
