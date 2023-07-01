import BackButton from "@/components/back-button";
import TestLinkCard from "@/components/test-link-card";
import Title from "@/components/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { getVehicleById } from "@/lib/db/vehicle";
import { getAppliedTests, slugify } from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";

export const metadata = {
  title: "Results",
  description: "Add inspection results for Vehicle",
};
const VehicleResultPage = async ({
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
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);
  if (!vehicle) {
    return <div>Vehicle {slugify(vehicleId)} not found</div>;
  }

  const completedTests = getAppliedTests(vehicle as ExtendedVehicle);
  return (
    <>
      <BackButton
        to={`/vehicles?search=${search}&page=${page}&pageSize=${pageSize}`}
      />

      <Card>
        <CardHeader>
          <Title> Vehicle {slugify(vehicleId)} Results</Title>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center justify-center gap-4">
          {Object.keys(completedTests).map((test) => (
            <TestLinkCard
              key={test}
              test={test}
              status={
                completedTests[test as keyof typeof completedTests] as
                  | "PASS"
                  | "FAIL"
                  | "INCOMPLETE"
              }
              href={`/results/${vehicleId}/${test}?search=${search}&page=${page}&pageSize=${pageSize}`}
            />
          ))}
        </CardContent>
        <CardFooter className="justify-center gap-2 px-4 pt-8 pb-2 md:px-4 md:pb-2 ">
          <div className="flex flex-row items-center justify-center gap-1 px-2 border rounded border-slate-400 ">
            ⚪️
            <Label variant="optional" className="text-xs">
              Incomplete
            </Label>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 px-2 border rounded border-slate-400 ">
            🟢
            <Label variant="optional" className="text-xs">
              Pass
            </Label>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 px-2 border rounded border-slate-400 ">
            🔴
            <Label variant="optional" className="text-xs">
              Fail
            </Label>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default VehicleResultPage;