import { VehicleInfoSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getVehiclesInfo() {
  try {
    const vehiclesInfo = await db.vehicleInfo.findMany();
    return { vehiclesInfo };
  } catch (error) {
    console.log("error fetching vehiclesInfo", { error });
    return { error };
  }
}

export async function getVehicleInfoById(vehicleId: number) {
  try {
    const vehicleInfo = await db.vehicleInfo.findUnique({
      where: {
        vehicleId,
      },
    });
    return { vehicleInfo };
  } catch (error) {
    console.log("error fetching vehicleInfo", { error });
    return { error };
  }
}

export async function createVehicleInfo(vehicleInfo: VehicleInfoSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    const newVehicleInfo = await db.vehicleInfo.create({
      data: {
        ...vehicleInfo,
        userId,
      },
    });
    return { newVehicleInfo };
  } catch (error) {
    console.log("error creating vehicleInfo");
    return { error };
  }
}

export async function updateVehicleInfo(vehicleInfo: VehicleInfoSchemaType) {
  try {
    const updatedVehicleInfo = await db.vehicleInfo.update({
      where: {
        vehicleId: vehicleInfo.vehicleId,
      },
      data: {
        ...vehicleInfo,
      },
    });
    return { updatedVehicleInfo };
  } catch (error) {
    console.log("error updating vehicleInfo");
    return { error };
  }
}
