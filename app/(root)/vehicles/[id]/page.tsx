import BackButton from "@/components/back-button";
import VehicleUpdateForm from "@/components/vehicle-update-form";
import { getBrokers } from "@/lib/db/broker";
import { getCustomers } from "@/lib/db/customer";
import { getVehicleById } from "@/lib/db/vehicle";
import { Broker, Customer } from "@prisma/client";
import { notFound } from "next/navigation";

const VehiclePage = async ({ params }: { params: { id: string } }) => {
  const { vehicle } = await getVehicleById(parseInt(params.id));
  const { customers } = await getCustomers();
  const { brokers } = await getBrokers();

  if (!vehicle) {
    return notFound();
  }

  return (
    <section>
      <BackButton />
      <VehicleUpdateForm
        customers={customers as Customer[]}
        brokers={brokers as Broker[]}
        vehicle={vehicle}
      />
    </section>
  );
};

export default VehiclePage;
