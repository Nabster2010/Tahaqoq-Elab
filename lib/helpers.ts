import { siteConfig } from "@/config/site";
import { testLimits } from "@/config/testConfig";
import { ExtendedVehicle } from "@/types";
import {
  Brake,
  Customer,
  Emission,
  HighBeamLevel,
  SideSlip,
  Suspension,
  VisualInspection,
} from "@prisma/client";
import { string } from "zod";

export const tests = [
  "brakeTest",
  "emissionTest",
  "highBeamLevel",
  "suspensionTest",
  "sideSlip",
  "vehicleInfo",
  "visualInspection",
];
export function addLeadingZeros(num: number | string, totalLength: number = 5) {
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
  visualInspectionResults: VisualInspection | null,
  customer: Customer
) => {
  if (visualInspectionResults === null) {
    return "INCOMPLETE";
  }
  const {
    vehicleId,
    id,
    modifiedVehicleId,
    createdAt,
    updatedAt,
    userId,
    ...tests
  } = visualInspectionResults;
  const { customerType } = customer;
  const { fuelEconomy, ...otherTests } = tests;

  const fuelEconomyResult =
    fuelEconomy === "FAIL" && customerType === "COMPANY" ? "FAIL" : "PASS";
  const result = Object.values(otherTests).every((test) => test === "PASS");
  const finalResult = result && fuelEconomyResult === "PASS" ? "PASS" : "FAIL";
  return finalResult;
};

export const getBrakeTestResult = (brakeTest: Partial<Brake>) => {
  const { front, rear, parking } = brakeTest;
  const mainBrake = [front, rear].every(
    (item) =>
      item! >= testLimits.mainBrake.min && item! <= testLimits.mainBrake.max
  );
  const parkingBrake =
    parking! >= testLimits.parkingBrake.min &&
    parking! <= testLimits.parkingBrake.max;
  return mainBrake && parkingBrake ? "PASS" : "FAIL";
};

export const getEmissionResult = (
  emissionData: Partial<Emission>,
  fuelType: string
) => {
  const { co, hc, diesel } = emissionData;
  const coResult = co! <= testLimits.co.max && co! >= testLimits.co.min;
  const hcResult = hc! <= testLimits.hc.max && hc! >= testLimits.co.min;
  const dieselResult =
    diesel! <= testLimits.diesel.max && diesel! >= testLimits.co.min;
  switch (fuelType) {
    case "HYBRID":
      return "FAIL";
    case "PETROL":
      return coResult && hcResult ? "PASS" : "FAIL";
    case "DIESEL":
      return dieselResult ? "PASS" : "FAIL";
    default:
      return "PASS";
  }
};

export const getHighBeamLevelResult = (
  highBeamResult: Partial<HighBeamLevel>
) => {
  const { left, right } = highBeamResult;
  return [left, right].every(
    (item: any) =>
      item <= testLimits.highBeam.max && item >= testLimits.highBeam.min
  )
    ? "PASS"
    : "FAIL";
};
export const getSuspensionResult = (suspensionResult: Partial<Suspension>) => {
  const { fl, fr, rl, rr } = suspensionResult;
  let rear = [rl, rr].every(
    (item) =>
      item! >= testLimits.rearSuspension.min &&
      item! <= testLimits.rearSuspension.max
  );
  let front = [fl, fr].every(
    (item) =>
      item! >= testLimits.frontSuspension.min &&
      item! <= testLimits.frontSuspension.max
  );
  return rear && front ? "PASS" : "FAIL";
};
export const getSideSlipResult = (sideSlipResult: Partial<SideSlip>) => {
  const { reading } = sideSlipResult;

  return reading! <= testLimits.sideSlip.max &&
    reading! >= testLimits.sideSlip.min
    ? "PASS"
    : "FAIL";
};

export const getAppliedTests = (vehicle: ExtendedVehicle) => {
  return {
    vehicleInfo: !!vehicle.vehicleInfo ? "PASS" : "INCOMPLETE",
    emission: getTestStatus(vehicle.emissionTest),
    highBeam: getTestStatus(vehicle.highBeamLevel),
    sideSlip: getTestStatus(vehicle.sideSlip),
    suspension: getTestStatus(vehicle.suspensionTest),
    brake: getTestStatus(vehicle.brakeTest),
       visualInspection: getVisualInspectionResult(
      vehicle.visualInspection,
      vehicle.customer as any
    ),
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

export function stopPropagate(callback: () => void) {
  return (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation();
    e.preventDefault();

    callback();
  };
}

export const englishDateFormat = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export const arabicDateFormat = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    calendar: "islamic-umalqura",
  });
  let formattedDate = formatter.format(date).split(" ")[0];
  const parts = formattedDate.split("/");
  return parts[1] + "/" + parts[0] + "/" + parts[2];
};

export const defaultModelYear = (vin: string) => {
  const letter = vin.charAt(9).toLocaleLowerCase();
  const models = new Map([
    ["a", "2010"],
    ["b", "2011"],
    ["c", "2012"],
    ["d", "2013"],
    ["e", "2014"],
    ["f", "2015"],
    ["g", "2016"],
    ["h", "2017"],
    ["j", "2018"],
    ["k", "2019"],
    ["l", "2020"],
    ["m", "2021"],
    ["n", "2022"],
    ["p", "2023"],
    ["r", "2024"],
    ["s", "2025"],
    ["t", "2026"],
    ["v", "2027"],
    ["w", "2028"],
    ["x", "2029"],
  ]);

  return models.get(letter);
};

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function removeEmptyStrings(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v != "")
  );
}

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const randomFloat = (min: number, max: number) => {
  return Number((Math.random() * (max - min) + min).toFixed(1));
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
