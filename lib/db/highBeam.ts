import { HighBeamLevelSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getHighBeamLevels() {
  try {
    const highBeamLevels = await db.highBeamLevel.findMany();
    return { highBeamLevels };
  } catch (error) {
    console.log("error fetching highBeamLevels", { error });
    return { error };
  }
}

export async function getHighBeamLevelById(vehicleId: number) {
  try {
    const highBeamLevel = await db.highBeamLevel.findUnique({
      where: {
        vehicleId,
      },
    });
    return { highBeamLevel };
  } catch (error) {
    console.log("error fetching highBeamLevel", { error });
    return { error };
  }
}

export async function createHighBeamLevel(
  highBeamLevel: HighBeamLevelSchemaType
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newHighBeamLevel = await db.highBeamLevel.create({
      data: {
        ...highBeamLevel,
        userId,
      },
    });
    return { newHighBeamLevel };
  } catch (error) {
    console.log("error creating highBeamLevel");
    return { error };
  }
}

export async function updateHighBeamLevel(
  highBeamLevel: HighBeamLevelSchemaType
) {
  try {
    const updatedHighBeamLevel = await db.highBeamLevel.update({
      where: {
        vehicleId: highBeamLevel.vehicleId,
      },
      data: {
        ...highBeamLevel,
      },
    });
    return { updatedHighBeamLevel };
  } catch (error) {
    console.log("error updating highBeamLevel");
    return { error };
  }
}
