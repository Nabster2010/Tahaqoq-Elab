import BackButton from "@/components/back-button";
import SuspensionCreateForm from "@/components/suspension-create-form";
import SuspensionUpdateForm from "@/components/suspension-update-form";
import { getVehicleById } from "@/lib/db/vehicle";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Suspension Results",
  description: "Add Suspension results for Vehicle",
};

const SuspensionResultPage = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.suspensionTest;

  if (!vehicle) {
    return notFound();
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <SuspensionUpdateForm suspensionResult={vehicle.suspensionTest!} />
      ) : (
        <SuspensionCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default SuspensionResultPage;
