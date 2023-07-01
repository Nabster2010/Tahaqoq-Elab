import BackButton from "@/components/back-button";
import ManufacturerUpdateForm from "@/components/manufacturer-update-form";
import { siteConfig } from "@/config/site";
import { getManufacturerById } from "@/lib/db/manufacturer";

const ManufacturerPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };

  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";
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
      <BackButton
        to={`/manufacturers?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <ManufacturerUpdateForm manufacturer={manufacturer} />
    </section>
  );
};

export default ManufacturerPage;
