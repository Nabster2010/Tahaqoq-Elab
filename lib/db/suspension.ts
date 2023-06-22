import { SuspensionSchemaType } from "@/types";
import { db } from ".";

export async function getSuspensions() {
  try {
    const suspensions = await db.suspension.findMany();
    return { suspensions };
  } catch (error) {
    console.log("error fetching suspensions", { error });
    return { error };
  }
}

export async function getSuspensionById(vehicleId: number) {
  try {
    const suspension = await db.suspension.findUnique({
      where: {
        vehicleId,
      },
    });
    return { suspension };
  } catch (error) {
    console.log("error fetching suspension", { error });
    return { error };
  }
}

export async function createSuspension(suspension: SuspensionSchemaType) {
  try {
    const newSuspension = await db.suspension.create({
      data: {
        ...suspension,
      },
    });
    return { newSuspension };
  } catch (error) {
    console.log("error creating suspension");
    return { error };
  }
}

export async function updateSuspension(suspension: SuspensionSchemaType) {
  try {
    const updatedSuspension = await db.suspension.update({
      where: {
        vehicleId: suspension.vehicleId,
      },
      data: {
        ...suspension,
      },
    });
    return { updatedSuspension };
  } catch (error) {
    console.log("error updating suspension");
    return { error };
  }
}
