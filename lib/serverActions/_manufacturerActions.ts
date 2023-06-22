"use server";
import { createManufacturer, updateManufacturer } from "@/lib/db/manufacturer";
import { ManufacturerSchemaType } from "@/types";

export async function createNewManufacturerAction(
  data: ManufacturerSchemaType
) {
  const newManufacturer = await createManufacturer(data);
  return newManufacturer;
}

export async function updateManufacturerAction(
  data: ManufacturerSchemaType,
  id: string
) {
  const updatedManufacturer = await updateManufacturer(data, id);
  return updatedManufacturer;
}
