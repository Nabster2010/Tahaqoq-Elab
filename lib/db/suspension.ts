import { SuspensionSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

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
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newSuspension = await db.suspension.create({
      data: {
        ...suspension,
        userId,
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
