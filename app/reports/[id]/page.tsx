import Loader from "@/components/Loader";
import { getVehicleById } from "@/lib/db/vehicle";
import { canIssueReport } from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import ReportNotFound from "./ReportNotFound";

const ReportViewer = dynamic(() => import("./ReportViewer"), {
  loading: () => <Loader />,
  ssr: false,
});
export const metadata = {
  title: "Report",
  description: "Vehicle test report as pdf",
};

const ReportPage = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  if (!vehicle) {
    notFound();
  }
  if (!canIssueReport(vehicle as ExtendedVehicle)) {
    return <ReportNotFound vehicleId={vehicleId.toString()} />;
  }

  return <ReportViewer vehicle={vehicle as ExtendedVehicle} />;
};

export default ReportPage;
