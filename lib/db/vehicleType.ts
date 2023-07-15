import { siteConfig } from "@/config/site";
import { PageSearchParams, VehicleTypeSchemaType } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getVehicleTypes() {
  try {
    const vehicleTypes = await db.vehicleType.findMany({
      orderBy: {
        manufacturer: {
          name: "asc",
        },
      },
      include: {
        manufacturer: {
          select: {
            name: true,
          },
        },
      },
    });
    return { vehicleTypes };
  } catch (error) {
    console.log("error fetching vehicle types", { error });
    return { error };
  }
}
export async function getPaginatedVehicleTypes(params: PageSearchParams) {
  let search = params.search ? params.search.toLowerCase() : undefined;
  let page =
    params.page && !isNaN(parseInt(params.page.toString()))
      ? parseInt(params.page.toString())
      : 1;
  let pageSize =
    params.pageSize && !isNaN(parseInt(params.pageSize.toString()))
      ? parseInt(params.pageSize.toString())
      : siteConfig.pageSize;
  const skip: number = page > 1 ? (page - 1) * pageSize : 0;
  try {
    const [vehicleTypes, count] = await db.$transaction([
      db.vehicleType.findMany({
        where: {
          modelType: {
            contains: search,
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
          createdAt: "desc",
        },
        skip,
        take: pageSize,
      }),
      db.vehicleType.count({
        where: {
          modelType: {
            contains: search,
          },
        },
      }),
    ]);
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
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    const newVehicleType = await db.vehicleType.create({
      data: {
        ...vehicleType,
        userId,
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
