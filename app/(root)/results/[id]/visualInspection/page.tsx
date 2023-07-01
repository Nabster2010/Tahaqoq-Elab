import BackButton from "@/components/back-button";
import VisualInspectionCreateForm from "@/components/visualInspection-create-form";
import VisualInspectionUpdateForm from "@/components/visualInspection-update-form";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";

export const metadata = {
  title: "Visual Results",
  description: "Add Visual inspection results for Vehicle",
};
const VisualInspectionResultPage = async ({
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

  const hasResult = !!vehicle?.visualInspection;

  if (!vehicle) {
    return <div>vehicle not found</div>;
  }
  return (
    <section className="">
      <BackButton
        to={`/results/${vehicleId}?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
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
