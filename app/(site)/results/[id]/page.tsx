import BackButton from "@/components/back-button";
import TestLinkCard from "@/components/test-link-card";
import Title from "@/components/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getVehicleById } from "@/lib/db/vehicle";
import { getAppliedTests, slugify } from "@/lib/helpers";

import { ExtendedVehicle } from "@/types";

const VehicleResultPage = async ({ params }: { params: { id: string } }) => {
  const vehicleId = Number(params.id);
  const { vehicle } = await getVehicleById(vehicleId);
  if (!vehicle) {
    return <div>Vehicle {slugify(vehicleId)} not found</div>;
  }

  const completedTests = getAppliedTests(vehicle as ExtendedVehicle);
  return (
    <>
      <BackButton to={`/vehicles`} />

      <Card className="">
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
              href={`/results/${vehicleId}/${test}`}
              src={`/images/${test}.png`}
              title={test}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default VehicleResultPage;
