"use server";
import { createColor, updateColor } from "@/lib/db/color";
import { ColorSchemaType } from "@/types";
export async function createNewColorAction(data: ColorSchemaType) {
  const newColor = await createColor(data);
  return newColor;
}

export async function updateColorAction(data: ColorSchemaType, id: string) {
  const updatedColor = await updateColor(data, id);
  return updatedColor;
}
