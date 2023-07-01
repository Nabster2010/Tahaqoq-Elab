import BackButton from "@/components/back-button";
import ColorUpdateForm from "@/components/color-update-form";
import { siteConfig } from "@/config/site";
import { getColorById } from "@/lib/db/color";

const ColorPage = async ({
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
  const { color } = await getColorById(params.id);
  if (!color) {
    return (
      <div className="pt-6 pb-8 text-center md:py-10">Color Not Found</div>
    );
  }
  return (
    <section>
      <BackButton
        to={`/colors?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <ColorUpdateForm color={color} />
    </section>
  );
};

export default ColorPage;
