import BackButton from "@/components/back-button";
import BrakeCreateForm from "@/components/brake-create-form";
import BrakeUpdateForm from "@/components/brake-update-form";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "Brake Results",
  description: "Add Brake results for Vehicle",
};
const BrakeResultPage = async ({
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

  const hasResult = !!vehicle?.brakeTest;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      {hasResult ? (
        <BrakeUpdateForm brakeTestResult={vehicle.brakeTest!} />
      ) : (
        <BrakeCreateForm vehicleId={vehicle.id!} />
      )}
    </section>
  );
};
export default BrakeResultPage;
