import { SideSlipSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getSideSlips() {
  try {
    const sideSlips = await db.sideSlip.findMany();
    return { sideSlips };
  } catch (error) {
    console.log("error fetching sideSlips", { error });
    return { error };
  }
}

export async function getSideSlipById(vehicleId: number) {
  try {
    const sideSlip = await db.sideSlip.findUnique({
      where: {
        vehicleId,
      },
    });
    return { sideSlip };
  } catch (error) {
    console.log("error fetching sideSlip", { error });
    return { error };
  }
}

export async function createSideSlip(sideSlip: SideSlipSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newSideSlip = await db.sideSlip.create({
      data: {
        ...sideSlip,
        userId,
      },
    });
    return { newSideSlip };
  } catch (error) {
    console.log("error creating sideSlip");
    return { error };
  }
}

export async function updateSideSlip(sideSlip: SideSlipSchemaType) {
  try {
    const updatedSideSlip = await db.sideSlip.update({
      where: {
        vehicleId: sideSlip.vehicleId,
      },
      data: {
        ...sideSlip,
      },
    });
    return { updatedSideSlip };
  } catch (error) {
    console.log("error updating sideSlip");
    return { error };
  }
}
