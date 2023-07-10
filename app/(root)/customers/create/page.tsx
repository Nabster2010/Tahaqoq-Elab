import BackButton from "@/components/back-button";
import CustomerCreateForm from "@/components/customer-create-form";

const CreateCustomerPage = async () => {
  return (
    <section>
      <BackButton />
      <CustomerCreateForm />
    </section>
  );
};

export default CreateCustomerPage;
