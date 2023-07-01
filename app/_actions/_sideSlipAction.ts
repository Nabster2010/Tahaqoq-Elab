"use server";
import { createSideSlip, updateSideSlip } from "@/lib/db/sideSlip";
import { SideSlipSchemaType } from "@/types";

export async function createNewSideSlipAction(data: SideSlipSchemaType) {
  const newSideSlip = await createSideSlip(data);
  return JSON.stringify(newSideSlip);
}

export async function updateSideSlipAction(data: SideSlipSchemaType) {
  const updatedSideSlip = await updateSideSlip(data);
  return JSON.stringify(updatedSideSlip);
}
