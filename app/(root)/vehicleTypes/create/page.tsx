import BackButton from "@/components/back-button";
import VehicleTypeCreateForm from "@/components/vehicleType-create-form";
import { siteConfig } from "@/config/site";
import { getManufacturers } from "@/lib/db/manufacturer";

const CreateVehicleTypePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search ? searchParams.search : "";

  const { manufacturers } = await getManufacturers();
  return (
    <section>
      <BackButton
        to={`/vehicleTypes?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <VehicleTypeCreateForm manufacturers={manufacturers || []} />
    </section>
  );
};

export default CreateVehicleTypePage;
