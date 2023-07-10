import BackButton from "@/components/back-button";
import BrokerUpdateForm from "@/components/broker-update-form";
import { getBrokerById } from "@/lib/db/broker";

const BrokerPage = async ({ params }: { params: { id: string } }) => {
  const { broker } = await getBrokerById(params.id);
  if (!broker) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Broker Not Found</div>
    );
  }
  return (
    <section>
      <BackButton />
      <BrokerUpdateForm broker={broker} />
    </section>
  );
};

export default BrokerPage;
