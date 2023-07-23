import BackButton from "@/components/back-button";
import ColorUpdateForm from "@/components/color-update-form";
import { getColorById } from "@/lib/db/color";
import { notFound } from "next/navigation";

const ColorPage = async ({ params }: { params: { id: string } }) => {
  const { color } = await getColorById(params.id);
  if (!color) {
    return notFound();
  }
  return (
    <section>
      <BackButton />
      <ColorUpdateForm color={color} />
    </section>
  );
};

export default ColorPage;
