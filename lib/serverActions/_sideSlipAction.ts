"use server";
import { createSideSlip, updateSideSlip } from "@/lib/db/sideSlip";
import { SideSlipSchemaType } from "@/types";

export async function createNewSideSlipAction(data: SideSlipSchemaType) {
  const newSideSlip = await createSideSlip(data);
  return newSideSlip;
}

export async function updateSideSlipAction(data: SideSlipSchemaType) {
  const updatedSideSlip = await updateSideSlip(data);
  return updatedSideSlip;
}
