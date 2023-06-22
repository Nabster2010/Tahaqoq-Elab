"use server";
import { createBrakeTest, updateBrakeTest } from "@/lib/db/brake";
import { BrakeSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

export async function createNewBrakeTest(data: BrakeSchemaType) {
  const newBrakeTest = await createBrakeTest(data);
  return newBrakeTest;
}

export async function updateBrakeTestAction(data: BrakeSchemaType) {
  const updatedBrakeTest = await updateBrakeTest(data);
  return updatedBrakeTest;
}
