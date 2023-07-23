import BackButton from "@/components/back-button";
import BrokerUpdateForm from "@/components/broker-update-form";
import { getBrokerById } from "@/lib/db/broker";
import { notFound } from "next/navigation";

const BrokerPage = async ({ params }: { params: { id: string } }) => {
  const { broker } = await getBrokerById(params.id);
  if (!broker) {
    return notFound();
  }
  return (
    <section>
      <BackButton />
      <BrokerUpdateForm broker={broker} />
    </section>
  );
};

export default BrokerPage;
