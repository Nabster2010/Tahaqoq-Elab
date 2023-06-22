import BackButton from "@/components/back-button";
import ColorUpdateForm from "@/components/color-update-form";
import { getColorById } from "@/lib/db/color";

const ColorPage = async ({ params }: { params: { id: string } }) => {
  const { color } = await getColorById(params.id);
  if (!color) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Color Not Found</div>
    );
  }
  return (
    <section>
      <BackButton to={"/colors"} />
      <ColorUpdateForm color={color} />
    </section>
  );
};

export default ColorPage;
