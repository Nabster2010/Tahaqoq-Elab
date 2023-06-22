import BackButton from "@/components/back-button";
import ManufacturerCreateForm from "@/components/manufacturer-create-form";

const CreateColorPage = async () => {
  return (
    <section>
      <BackButton to={"/manufacturers"} />
      <ManufacturerCreateForm />
    </section>
  );
};

export default CreateColorPage;
