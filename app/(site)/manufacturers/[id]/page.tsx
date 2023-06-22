import BackButton from "@/components/back-button";
import ManufacturerUpdateForm from "@/components/manufacturer-update-form";
import { getManufacturerById } from "@/lib/db/manufacturer";

const ManufacturerPage = async ({ params }: { params: { id: string } }) => {
  const { manufacturer } = await getManufacturerById(params.id);
  if (!manufacturer) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">
        Manufacturer Not Found
      </div>
    );
  }
  return (
    <section>
      <BackButton to={"/manufacturers"} />
      <ManufacturerUpdateForm manufacturer={manufacturer} />
    </section>
  );
};

export default ManufacturerPage;
