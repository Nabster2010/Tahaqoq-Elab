import BackButton from "@/components/back-button";
import HighBeamLevelCreateForm from "@/components/highBeamLevel-create-form";
import HighBeamLevelUpdateForm from "@/components/highBeamLevel-update-form";
import { getVehicleById } from "@/lib/db/vehicle";
import { notFound } from "next/navigation";

export const metadata = {
  title: "HighBeam Results",
  description: "Add HighBeam results for Vehicle",
};
const HighBeamLevelResultPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.highBeamLevel;

  if (!vehicle) {
    return notFound();
  }
  return (
    <section className="">
      <BackButton />
      {hasResult ? (
        <HighBeamLevelUpdateForm highBeamLevelResult={vehicle.highBeamLevel!} />
      ) : (
        <HighBeamLevelCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default HighBeamLevelResultPage;
