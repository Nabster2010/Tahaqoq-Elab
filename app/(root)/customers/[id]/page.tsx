import BackButton from "@/components/back-button";
import CustomerUpdateForm from "@/components/customer-update-form";
import { getCustomerById } from "@/lib/db/customer";
import { notFound } from "next/navigation";

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const { customer } = await getCustomerById(params.id);
  if (!customer) {
    return notFound();
  }
  return (
    <section>
      <BackButton />
      <CustomerUpdateForm customer={customer} />
    </section>
  );
};

export default CustomerPage;
