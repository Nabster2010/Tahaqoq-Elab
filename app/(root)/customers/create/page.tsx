import BackButton from "@/components/back-button";
import CustomerCreateForm from "@/components/customer-create-form";
import { siteConfig } from "@/config/site";
import { getBrokers } from "@/lib/db/broker";

const CreateCustomerPage = async ({
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
  const { brokers } = await getBrokers();
  return (
    <section>
      <BackButton
        to={`/customers?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <CustomerCreateForm brokers={brokers || []} />
    </section>
  );
};

export default CreateCustomerPage;
