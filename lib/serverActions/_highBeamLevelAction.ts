"use server";
import { createHighBeamLevel, updateHighBeamLevel } from "@/lib/db/highBeam";
import { HighBeamLevelSchemaType } from "@/types";

export async function createNewHighBeamLevelAction(
  data: HighBeamLevelSchemaType
) {
  const newHighBeamLevel = await createHighBeamLevel(data);
  return newHighBeamLevel;
}

export async function updateHighBeamLevelAction(data: HighBeamLevelSchemaType) {
  const updatedHighBeamLevel = await updateHighBeamLevel(data);
  return updatedHighBeamLevel;
}
