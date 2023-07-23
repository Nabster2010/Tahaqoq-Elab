import BackButton from "@/components/back-button";
import VisualInspectionCreateForm from "@/components/visualInspection-create-form";
import VisualInspectionUpdateForm from "@/components/visualInspection-update-form";
import { getVehicleById } from "@/lib/db/vehicle";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Visual Results",
  description: "Add Visual inspection results for Vehicle",
};
const VisualInspectionResultPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);
  const hasResult = !!vehicle?.visualInspection;

  if (!vehicle) {
    return notFound();
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <VisualInspectionUpdateForm
          visualInspectionResult={vehicle.visualInspection!}
        />
      ) : (
        <VisualInspectionCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default VisualInspectionResultPage;
