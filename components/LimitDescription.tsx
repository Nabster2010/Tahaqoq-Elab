import { testLimits } from "@/config/testConfig";

const LimitDescription = ({ limit }: { limit: string }) => {
  const { min, max, unit } = testLimits[limit as keyof typeof testLimits];
  return (
    <h1>
      Between {min}
      {unit} and{"  "}
      {max}
      {unit}
    </h1>
  );
};

export default LimitDescription;
