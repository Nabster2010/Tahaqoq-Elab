"use server";
import { createSuspension, updateSuspension } from "@/lib/db/suspension";
import { SuspensionSchemaType } from "@/types";

export async function createNewSuspensionAction(data: SuspensionSchemaType) {
  const newSuspension = await createSuspension(data);
  return newSuspension;
}

export async function updateSuspensionAction(data: SuspensionSchemaType) {
  const updatedSuspension = await updateSuspension(data);
  return updatedSuspension;
}
