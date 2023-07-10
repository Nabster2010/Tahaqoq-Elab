import { VisualInspectionSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getVisualInspections() {
  try {
    const visualInspections = await db.visualInspection.findMany();
    return { visualInspections };
  } catch (error) {
    console.log("error fetching visual inspections", { error });
    return { error };
  }
}

export async function getVisualInspectionById(vehicleId: number) {
  try {
    const visualInspection = await db.visualInspection.findUnique({
      where: {
        vehicleId,
      },
    });
    return { visualInspection };
  } catch (error) {
    console.log("error fetching visual inspection", { error });
    return { error };
  }
}

export async function createVisualInspection(
  visualInspection: VisualInspectionSchemaType
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    const newVisualInspection = await db.visualInspection.create({
      data: {
        ...visualInspection,
        userId,
      },
    });
    return { newVisualInspection };
  } catch (error) {
    console.log("error creating visual inspection");
    return { error };
  }
}

export async function updateVisualInspection(
  visualInspection: VisualInspectionSchemaType
) {
  try {
    const updatedVisualInspection = await db.visualInspection.update({
      where: {
        vehicleId: visualInspection.vehicleId,
      },
      data: {
        ...visualInspection,
      },
    });
    return { updatedVisualInspection };
  } catch (error) {
    console.log("error updating visual inspection");
    return { error };
  }
}
