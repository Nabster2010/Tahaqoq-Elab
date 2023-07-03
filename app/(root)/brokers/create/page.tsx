import BackButton from "@/components/back-button";
import BrokerCreateForm from "@/components/broker-create-form";
import { siteConfig } from "@/config/site";

const CreateBrokerPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";

  return (
    <section>
      <BackButton
        to={`/brokers?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <BrokerCreateForm />
    </section>
  );
};

export default CreateBrokerPage;
