import BackButton from "@/components/back-button";
import CustomerUpdateForm from "@/components/customer-update-form";
import { getCustomerById } from "@/lib/db/customer";

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const { customer } = await getCustomerById(params.id);
  if (!customer) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Customer Not Found</div>
    );
  }
  return (
    <section>
      <BackButton to={"/customers"} />
      <CustomerUpdateForm customer={customer} />
    </section>
  );
};

export default CustomerPage;
