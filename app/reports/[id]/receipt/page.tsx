import { getVehicleById } from "@/lib/db/vehicle";
import { ExtendedVehicle } from "@/types";
import Receipt from "./Reciept";

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
