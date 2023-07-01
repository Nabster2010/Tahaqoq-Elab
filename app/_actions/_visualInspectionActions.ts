"use server";
import {
  createVisualInspection,
  updateVisualInspection,
} from "@/lib/db/visualInspection";
import { VisualInspectionSchemaType } from "@/types";

export async function createNewVisualInspectionAction(
  data: VisualInspectionSchemaType
) {
  const newVisualInspection = await createVisualInspection(data);
  return JSON.stringify(newVisualInspection);
}

export async function updateVisualInspectionAction(
  data: VisualInspectionSchemaType
) {
  const updatedVisualInspection = await updateVisualInspection(data);
  return JSON.stringify(updatedVisualInspection);
}
