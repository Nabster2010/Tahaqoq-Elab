"use server";
import { createEmission, updateEmission } from "@/lib/db/emissionTest";
import { EmissionSchemaType } from "@/types";

export async function createNewEmissionAction(data: EmissionSchemaType) {
  const newEmission = await createEmission(data);
  return JSON.stringify(newEmission);
}

export async function updateEmissionAction(data: EmissionSchemaType) {
  const updatedEmission = await updateEmission(data);
  return JSON.stringify(updatedEmission);
}
