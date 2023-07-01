import { getCustomers } from "@/lib/db/customer";
import VehicleCreateForm from "@/components/vehicle-create-form";
import BackButton from "@/components/back-button";
import { siteConfig } from "@/config/site";

const CreateVehiclePage = async ({
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
  const { customers } = await getCustomers();
  return (
    <section>
      <BackButton
        to={`/vehicles?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <VehicleCreateForm customers={customers || []} />
    </section>
  );
};

export default CreateVehiclePage;