import BackButton from "@/components/back-button";
import ColorCreateForm from "@/components/color-create-form";
import { siteConfig } from "@/config/site";

const CreateColorPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";

  return (
    <section>
      <BackButton
        to={`/colors?search=${search}&page=${page}&pageSize=${pageSize}`}
      />
      <ColorCreateForm />
    </section>
  );
};

export default CreateColorPage;
