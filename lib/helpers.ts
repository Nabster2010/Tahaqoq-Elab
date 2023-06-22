import { siteConfig } from "@/config/site";
import { testLimits } from "@/config/testConfig";
import { ExtendedVehicle } from "@/types";
import {
  Brake,
  Emission,
  HighBeamLevel,
  SideSlip,
  Suspension,
  VisualInspection,
} from "@prisma/client";

export const tests = [
  "brakeTest",
  "emissionTest",
  "highBeamLevel",
  "suspensionTest",
  "sideSlip",
  "vehicleInfo",
  "visualInspection",
];
export function addLeadingZeros(num: number, totalLength: number = 4) {
  return String(num).padStart(totalLength, "0");
}

export const slugify = (id: number) => {
  return `${siteConfig.reportLeadingChars}${addLeadingZeros(id)}`;
};

interface ObjectItem {
  name: string;
  defaultValue: string;
}

export function transferObjects(
  objects: ObjectItem[],
  visualInspectionResult?: VisualInspection
): {
  [key: string]: string;
} {
  const transferredObject: { [key: string]: string } = {};
  objects.forEach((item) => {
    transferredObject[item.name] = visualInspectionResult
      ? //@ts-ignore
        visualInspectionResult[item.name]
      : item.defaultValue;
  });
  return transferredObject;
}

export const getTestStatus = (test: any) => {
  if (test === null) {
    return "INCOMPLETE";
  }
  if (test.result === "PASS") {
    return "PASS";
  } else {
    return "FAIL";
  }
};

export const getVisualInspectionResult = (
  visualInspectionResults: VisualInspection | null
) => {
  if (visualInspectionResults === null) {
    return "INCOMPLETE";
  }
  const { vehicleId, createdAt, updatedAt, ...tests } = visualInspectionResults;
  const result = Object.values(tests).every((test) => test === "PASS");
  return result ? "PASS" : "FAIL";
};

export const getBrakeTestResult = (brakeTest: Partial<Brake>) => {
  const { front, rear, parking } = brakeTest;
  if (!front || !rear || !parking) {
    return "FAIL";
  }
  const mainBrake = [front, rear].every((item) => item >= testLimits.mainBrake);
  const parkingBrake = parking >= testLimits.parkingBrake;
  return mainBrake && parkingBrake ? "PASS" : "FAIL";
};

export const getEmissionResult = (
  emissionData: Partial<Emission>,
  fuelType: string
) => {
  const { co, hc, diesel } = emissionData;
  switch (fuelType) {
    case "HYBRID":
      return "FAIL";

    case "PETROL":
      return co! <= testLimits.co && hc! <= testLimits.hc ? "PASS" : "FAIL";

    case "DIESEL":
      return diesel! <= testLimits.diesel ? "PASS" : "FAIL";

    default:
      return "PASS";
  }
};

export const getHighBeamLevelResult = (
  highBeamResult: Partial<HighBeamLevel>
) => {
  const { left, right, level } = highBeamResult;
  return [left, right, level].every((item: any) => item <= testLimits.highBeam)
    ? "PASS"
    : "FAIL";
};
export const getSuspensionResult = (suspensionResult: Partial<Suspension>) => {
  const { fl, fr, rl, rr } = suspensionResult;
  if (!fr || !fl || !rl || !rr) {
    return "FAIL";
  }
  let rear = [rl, rr].every((item) => item >= testLimits.rearSuspension);
  let front = [fl, fr].every((item) => item >= testLimits.frontSuspension);

  return rear && front ? "PASS" : "FAIL";
};
export const getSideSlipResult = (sideSlipResult: Partial<SideSlip>) => {
  const { reading } = sideSlipResult;
  if (reading === 0) return "PASS";
  return reading && reading <= testLimits.sideSlip ? "PASS" : "FAIL";
};

export const getAppliedTests = (vehicle: ExtendedVehicle) => {
  return {
    vehicleInfo: !!vehicle.vehicleInfo ? "PASS" : "INCOMPLETE",
    emission: getTestStatus(vehicle.emissionTest),
    highBeam: getTestStatus(vehicle.highBeamLevel),
    sideSlip: getTestStatus(vehicle.sideSlip),
    suspension: getTestStatus(vehicle.suspensionTest),
    brake: getTestStatus(vehicle.brakeTest),
    visualInspection: getVisualInspectionResult(vehicle.visualInspection),
  };
};

export const getFinalResult = (vehicle: ExtendedVehicle) => {
  const completedTests = getAppliedTests(vehicle);
  return Object.values(completedTests).some((v) => v === "INCOMPLETE")
    ? "INCOMPLETE"
    : Object.values(completedTests).every((v) => v === "PASS")
    ? "PASS"
    : "FAIL";
};

export const canIssueReport = (vehicle: ExtendedVehicle) => {
  const result = tests.map(
    (test: string) => vehicle[test as keyof ExtendedVehicle]
  );
  return result.every((v) => v !== null);
};

export const englishDateFormat = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB").format(date);
};
export const arabicDateFormat = (date: Date) => {
  return new Intl.DateTimeFormat("ar-SA", {
    numberingSystem: "latn",
  }).format(date);
};

export const validateByTestLimits = (
  value: number,
  min: number,
  max: number
) => {
  if (value <= max && value >= min) {
    return true;
  }

  return false;
};
