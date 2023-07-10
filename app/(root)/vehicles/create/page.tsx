import { getCustomers } from "@/lib/db/customer";
import VehicleCreateForm from "@/components/vehicle-create-form";
import BackButton from "@/components/back-button";
import { siteConfig } from "@/config/site";
import { getBrokers } from "@/lib/db/broker";
import { Broker, Customer } from "@prisma/client";

const CreateVehiclePage = async () => {
  const { customers } = await getCustomers();
  const { brokers } = await getBrokers();
  return (
    <section>
      <BackButton />
      <VehicleCreateForm
        customers={customers as Customer[]}
        brokers={brokers as Broker[]}
      />
    </section>
  );
};

export default CreateVehiclePage;
