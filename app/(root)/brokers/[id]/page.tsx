import BackButton from "@/components/back-button";
import BrokerUpdateForm from "@/components/broker-update-form";
import { siteConfig } from "@/config/site";
import { getBrokerById } from "@/lib/db/broker";

const BrokerPage = async ({
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

  const { broker } = await getBrokerById(params.id);
  if (!broker) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Broker Not Found</div>
    );
  }
  return (
    <section>
      <BackButton
        to={`/brokers?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <BrokerUpdateForm broker={broker} />
    </section>
  );
};

export default BrokerPage;
