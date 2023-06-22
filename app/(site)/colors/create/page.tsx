import BackButton from "@/components/back-button";
import ColorCreateForm from "@/components/color-create-form";

const CreateColorPage = async () => {
  return (
    <section>
      <BackButton to={"/colors"} />
      <ColorCreateForm />
    </section>
  );
};

export default CreateColorPage;
