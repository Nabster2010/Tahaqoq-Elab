import BackButton from "@/components/back-button";
import SideSlipCreateForm from "@/components/sideSlip-create-form";
import SideSlipUpdateForm from "@/components/sideSlip-update-form";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "SideSlip Results",
  description: "Add SideSlip results for Vehicle",
};

const SideSlipResultPage = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.sideSlip;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <SideSlipUpdateForm sideSlipResult={vehicle.sideSlip!} />
      ) : (
        <SideSlipCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default SideSlipResultPage;
