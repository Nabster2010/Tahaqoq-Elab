"use server";
import { createVehicleInfo, updateVehicleInfo } from "@/lib/db/vehiclesInfo";
import { VehicleInfoSchemaType } from "@/types";

export async function createNewVehicleInfoAction(data: VehicleInfoSchemaType) {
  const newVehicleInfo = await createVehicleInfo(data);
  return newVehicleInfo;
}

export async function updateVehicleInfoAction(data: VehicleInfoSchemaType) {
  const updatedVehicleInfo = await updateVehicleInfo(data);
  return updatedVehicleInfo;
}
