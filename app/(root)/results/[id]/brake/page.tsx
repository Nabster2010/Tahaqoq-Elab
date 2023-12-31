import BackButton from "@/components/back-button";
import BrakeCreateForm from "@/components/brake-create-form";
import BrakeUpdateForm from "@/components/brake-update-form";
import { getVehicleById } from "@/lib/db/vehicle";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Brake Results",
  description: "Add Brake results for Vehicle",
};
const BrakeResultPage = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.brakeTest;

  if (!vehicle) {
    return notFound();
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <BrakeUpdateForm brakeTestResult={vehicle.brakeTest!} />
      ) : (
        <BrakeCreateForm vehicleId={vehicle.id!} />
      )}
    </section>
  );
};
export default BrakeResultPage;
