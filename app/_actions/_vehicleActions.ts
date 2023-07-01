"use server";
import { createVehicle, deleteVehicle, updateVehicle } from "@/lib/db/vehicle";
import { VehicleSchemaType } from "@/types";
export async function createNewVehicleAction(
  data: VehicleSchemaType,
  userId: string
) {
  const newVehicle = await createVehicle(data, userId);
  return JSON.stringify(newVehicle);
}

export async function updateVehicleAction(data: VehicleSchemaType, id: number) {
  const updatedVehicle = await updateVehicle(data, id);
  return JSON.stringify(updatedVehicle);
}

export async function deleteVehicleAction(id: number) {
  const deletedVehicle = await deleteVehicle(id);
  return JSON.stringify(deletedVehicle);
}
