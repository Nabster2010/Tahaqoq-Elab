import BackButton from "@/components/back-button";
import VehicleTypeUpdateForm from "@/components/vehicleType-update-form";
import { siteConfig } from "@/config/site";
import { getManufacturers } from "@/lib/db/manufacturer";
import { getVehicleTypeById } from "@/lib/db/vehicleType";

const VehicleTypePage = async ({
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
  const search = searchParams.search ? searchParams.search : "";

  const { manufacturers } = await getManufacturers();
  const { vehicleType } = await getVehicleTypeById(params.id);
  if (!vehicleType) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">
        Vehicle Type Not Found
      </div>
    );
  }
  return (
    <section>
      <BackButton
        to={`/vehicleTypes?search=${search}&page=${page}&pageSize=${pageSize}`}
      />

      <VehicleTypeUpdateForm
        vehicleType={vehicleType}
        manufacturers={manufacturers || []}
      />
    </section>
  );
};

export default VehicleTypePage;
