import { BrakeSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getBrakeTests() {
  try {
    const brakeTests = await db.brake.findMany();
    return { brakeTests };
  } catch (error) {
    console.log("error fetching brakes", { error });
    return { error };
  }
}

export async function getBrakeTestById(vehicleId: number) {
  try {
    const brakeTest = await db.brake.findUnique({
      where: {
        vehicleId,
      },
    });
    return { brakeTest };
  } catch (error) {
    console.log("error fetching brake", { error });
    return { error };
  }
}

export async function createBrakeTest(brakeTest: BrakeSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newBrakeTest = await db.brake.create({
      data: {
        ...brakeTest,
        userId,
      },
    });
    return { newBrakeTest };
  } catch (error) {
    console.log("error creating brake");
    return { error };
  }
}

export async function updateBrakeTest(data: BrakeSchemaType) {
  try {
    const updatedBrakeTest = await db.brake.update({
      where: {
        vehicleId: data.vehicleId,
      },
      data: {
        ...data,
      },
    });
    return { updatedBrakeTest };
  } catch (error) {
    console.log("error updating brake");
    return { error };
  }
}
