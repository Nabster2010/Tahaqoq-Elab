import Loader from "@/components/Loader";
import { getVehicleById } from "@/lib/db/vehicle";
import { ExtendedVehicle } from "@/types";
import dynamic from "next/dynamic";

const Receipt = dynamic(() => import("./Reciept"), {
  loading: () => <Loader />,
  ssr: false,
});
const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = parseInt(params.id);
  const { vehicle } = await getVehicleById(id);
  return <Receipt vehicle={vehicle as ExtendedVehicle} />;
};

export default page;
