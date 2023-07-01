"use server";
import {
  createManufacturer,
  deleteManufacturer,
  updateManufacturer,
} from "@/lib/db/manufacturer";
import { ManufacturerSchemaType } from "@/types";

export async function createNewManufacturerAction(
  data: ManufacturerSchemaType
) {
  const newManufacturer = await createManufacturer(data);
  return JSON.stringify(newManufacturer);
}

export async function updateManufacturerAction(
  data: ManufacturerSchemaType,
  id: string
) {
  const updatedManufacturer = await updateManufacturer(data, id);
  return JSON.stringify(updatedManufacturer);
}
export async function deleteManufacturerAction(id: string) {
  const deletedManufacturer = await deleteManufacturer(id);
  return JSON.stringify(deletedManufacturer);
}
