import { siteConfig } from "@/config/site";
import { VehicleTypeSchemaType } from "@/types";
import { db } from ".";

export async function getVehicleTypes() {
  try {
    const vehicleTypes = await db.vehicleType.findMany({
      orderBy: {
        manufacturer: {
          name: "asc",
        },
      },
    });
    return { vehicleTypes };
  } catch (error) {
    console.log("error fetching vehicle types", { error });
    return { error };
  }
}
export async function getPaginatedVehicleTypes(
  search = "",
  page = 1,
  pageSize = siteConfig.pageSize
) {
  const skip: number = (page - 1) * pageSize;
  try {
    const vehicleTypes = await db.vehicleType.findMany({
      where: {
        modelType: {
          contains: search.toLowerCase(),
        },
      },
      include: {
        manufacturer: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        manufacturer: {
          name: "asc",
        },
      },
      skip,
      take: pageSize,
    });
    const count = await db.vehicleType.count({
      where: {
        modelType: {
          contains: search.toLowerCase(),
        },
      },
    });
    return {
      vehicleTypes,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching vehicle Types", { error });
    return { error };
  }
}

export async function getVehicleTypeById(id: string) {
  try {
    const vehicleType = await db.vehicleType.findUnique({
      where: {
        id,
      },
    });
    return { vehicleType };
  } catch (error) {
    console.log("error fetching vehicle type", { error });
    return { error };
  }
}

export async function createVehicleType(vehicleType: VehicleTypeSchemaType) {
  try {
    const newVehicleType = await db.vehicleType.create({
      data: {
        ...vehicleType,
      },
    });
    return { newVehicleType };
  } catch (error) {
    console.log("error creating vehicle type");
    return { error };
  }
}

export async function updateVehicleType(
  data: VehicleTypeSchemaType,
  id: string
) {
  try {
    const updatedVehicleType = await db.vehicleType.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedVehicleType };
  } catch (error) {
    console.log("error updating vehicle type");
    return { error };
  }
}

export async function deleteVehicleType(id: string) {
  try {
    const deleteVehicleType = await db.vehicleType.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error) {
    console.log("error deleting vehicle type");
    return { success: false, error };
  }
}
