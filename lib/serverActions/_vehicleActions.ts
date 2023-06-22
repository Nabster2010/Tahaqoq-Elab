"use server";
import { createVehicle, updateVehicle } from "@/lib/db/vehicle";
import { VehicleSchemaType } from "@/types";
export async function createNewVehicleAction(
  data: VehicleSchemaType,
  userId: string
) {
  const newVehicle = await createVehicle(data, userId);
  return newVehicle;
}

export async function updateVehicleAction(data: VehicleSchemaType, id: number) {
  const newVehicle = await updateVehicle(data, id);
  return newVehicle;
}
