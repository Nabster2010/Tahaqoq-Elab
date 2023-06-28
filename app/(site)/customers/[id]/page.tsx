import BackButton from "@/components/back-button";
import CustomerUpdateForm from "@/components/customer-update-form";
import { siteConfig } from "@/config/site";
import { getCustomerById } from "@/lib/db/customer";

const CustomerPage = async ({
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

  const { customer } = await getCustomerById(params.id);
  if (!customer) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Customer Not Found</div>
    );
  }
  return (
    <section>
      <BackButton
        to={`/customers?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <CustomerUpdateForm customer={customer} />
    </section>
  );
};

export default CustomerPage;
