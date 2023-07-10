import { EmissionSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getEmissions() {
  try {
    const emissions = await db.emission.findMany();
    return { emissions };
  } catch (error) {
    console.log("error fetching emissions", { error });
    return { error };
  }
}

export async function getEmissionById(vehicleId: number) {
  try {
    const emission = await db.emission.findUnique({
      where: {
        vehicleId,
      },
    });
    return { emission };
  } catch (error) {
    console.log("error fetching emission", { error });
    return { error };
  }
}

export async function createEmission(emission: EmissionSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newEmission = await db.emission.create({
      data: {
        ...emission,
        userId,
      },
    });
    return { newEmission };
  } catch (error) {
    console.log("error creating emission");
    return { error };
  }
}

export async function updateEmission(data: EmissionSchemaType) {
  try {
    const updatedEmission = await db.emission.update({
      where: {
        vehicleId: data.vehicleId,
      },
      data: {
        ...data,
      },
    });
    return { updatedEmission };
  } catch (error) {
    console.log("error updating emission");
    return { error };
  }
}
