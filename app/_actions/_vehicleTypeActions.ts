"use server";
import {
  createVehicleType,
  deleteVehicleType,
  updateVehicleType,
} from "@/lib/db/vehicleType";
import { VehicleTypeSchemaType } from "@/types";

export async function createNewVehicleTypeAction(data: VehicleTypeSchemaType) {
  const newVehicleType = await createVehicleType(data);
  return JSON.stringify(newVehicleType);
}

export async function updateVehicleTypeAction(
  data: VehicleTypeSchemaType,
  id: string
) {
  const updatedVehicleType = await updateVehicleType(data, id);
  return JSON.stringify(updatedVehicleType);
}

export async function deleteVehicleTypeAction(id: string) {
  const deletedVehicleType = await deleteVehicleType(id);
  return JSON.stringify(deletedVehicleType);
}
