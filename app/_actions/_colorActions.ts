"use server";
import { createColor, deleteColor, updateColor } from "@/lib/db/color";
import { ColorSchemaType } from "@/types";
export async function createNewColorAction(data: ColorSchemaType) {
  const newColor = await createColor(data);
  return JSON.stringify(newColor);
}

export async function updateColorAction(data: ColorSchemaType, id: string) {
  const updatedColor = await updateColor(data, id);
  return JSON.stringify(updatedColor);
}

export async function deleteColorAction(id: string) {
  const deletedColor = await deleteColor(id);
  return JSON.stringify(deletedColor);
}
