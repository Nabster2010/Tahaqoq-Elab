import BackButton from "@/components/back-button";
import SuspensionCreateForm from "@/components/suspension-create-form";
import SuspensionUpdateForm from "@/components/suspension-update-form";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "Suspension Results",
  description: "Add Suspension results for Vehicle",
};

const SuspensionResultPage = async ({
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

  const hasResult = !!vehicle?.suspensionTest;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      {hasResult ? (
        <SuspensionUpdateForm suspensionResult={vehicle.suspensionTest!} />
      ) : (
        <SuspensionCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default SuspensionResultPage;
