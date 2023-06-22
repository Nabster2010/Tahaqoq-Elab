import BackButton from "@/components/back-button";
import VisualInspectionCreateForm from "@/components/visualInspection-create-form";
import VisualInspectionUpdateForm from "@/components/visualInspection-update-form";
import { getVehicleById } from "@/lib/db/vehicle";

const VisualInspectionResultPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.visualInspection;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton to={`/results/${vehicleId}`} />
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
