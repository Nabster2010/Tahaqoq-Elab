import BackButton from "@/components/back-button";
import VehicleUpdateForm from "@/components/vehicle-update-form";
import { siteConfig } from "@/config/site";
import { getBrokers } from "@/lib/db/broker";
import { getCustomers } from "@/lib/db/customer";
import { getVehicleById } from "@/lib/db/vehicle";

const VehiclePage = async ({
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
  const { vehicle } = await getVehicleById(parseInt(params.id));
  const { customers } = await getCustomers();
  const { brokers } = await getBrokers();

  if (!vehicle) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Vehicle Not Found</div>
    );
  }

  return (
    <section>
      <BackButton
        to={`/vehicles?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <VehicleUpdateForm
        customers={customers || []}
        brokers={brokers || []}
        vehicle={vehicle}
      />
    </section>
  );
};

export default VehiclePage;
