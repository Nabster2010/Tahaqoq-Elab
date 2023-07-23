import BackButton from "@/components/back-button";
import ManufacturerUpdateForm from "@/components/manufacturer-update-form";
import { getManufacturerById } from "@/lib/db/manufacturer";
import { notFound } from "next/navigation";

const ManufacturerPage = async ({ params }: { params: { id: string } }) => {
  const { manufacturer } = await getManufacturerById(params.id);
  if (!manufacturer) {
    return notFound();
  }
  return (
    <section>
      <BackButton />
      <ManufacturerUpdateForm manufacturer={manufacturer} />
    </section>
  );
};

export default ManufacturerPage;
