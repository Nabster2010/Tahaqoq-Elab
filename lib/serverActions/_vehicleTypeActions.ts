"use server";
import { createVehicleType, updateVehicleType } from "@/lib/db/vehicleType";
import { VehicleTypeSchemaType } from "@/types";

export async function createNewVehicleTypeAction(data: VehicleTypeSchemaType) {
  const newVehicleType = await createVehicleType(data);
  return newVehicleType;
}

export async function updateVehicleTypeAction(
  data: VehicleTypeSchemaType,
  id: string
) {
  const updatedVehicleType = await updateVehicleType(data, id);
  return updatedVehicleType;
}
