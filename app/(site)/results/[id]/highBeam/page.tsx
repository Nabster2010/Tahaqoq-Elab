import BackButton from "@/components/back-button";
import HighBeamLevelCreateForm from "@/components/highBeamLevel-create-form";
import HighBeamLevelUpdateForm from "@/components/highBeamLevel-update-form";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "HighBeam Results",
  description: "Add HighBeam results for Vehicle",
};
const HighBeamLevelResultPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  const hasResult = !!vehicle?.highBeamLevel;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      {hasResult ? (
        <HighBeamLevelUpdateForm highBeamLevelResult={vehicle.highBeamLevel!} />
      ) : (
        <HighBeamLevelCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default HighBeamLevelResultPage;
