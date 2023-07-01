import BackButton from "@/components/back-button";
import SideSlipCreateForm from "@/components/sideSlip-create-form";
import SideSlipUpdateForm from "@/components/sideSlip-update-form";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "SideSlip Results",
  description: "Add SideSlip results for Vehicle",
};

const SideSlipResultPage = async ({
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

  const hasResult = !!vehicle?.sideSlip;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      {hasResult ? (
        <SideSlipUpdateForm sideSlipResult={vehicle.sideSlip!} />
      ) : (
        <SideSlipCreateForm vehicleId={vehicle.id} />
      )}
    </section>
  );
};
export default SideSlipResultPage;
