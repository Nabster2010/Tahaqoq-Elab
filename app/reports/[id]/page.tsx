import { getVehicleById } from "@/lib/db/vehicle";
import { canIssueReport } from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";
import ReportViewer from "./ReportViewer";

export const metadata = {
  title: "Report",
  description: "Vehicle test report as pdf",
};

const page = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }
  if (!canIssueReport(vehicle as ExtendedVehicle)) {
    return (
      <div>Cannot Show Report for this vehicle please Complete the Results</div>
    );
  }

  return <ReportViewer vehicle={vehicle as ExtendedVehicle} />;
};

export default page;
