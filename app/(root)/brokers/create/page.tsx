import BackButton from "@/components/back-button";
import BrokerCreateForm from "@/components/broker-create-form";

const CreateBrokerPage = async () => {
  return (
    <section>
      <BackButton />
      <BrokerCreateForm />
    </section>
  );
};

export default CreateBrokerPage;
