"use server";
import { createBrakeTest, updateBrakeTest } from "@/lib/db/brake";
import { BrakeSchemaType } from "@/types";

export async function createNewBrakeTestAction(data: BrakeSchemaType) {
  const newBrakeTest = await createBrakeTest(data);
  return JSON.stringify(newBrakeTest);
}

export async function updateBrakeTestAction(data: BrakeSchemaType) {
  const updatedBrakeTest = await updateBrakeTest(data);
  return JSON.stringify(updatedBrakeTest);
}
