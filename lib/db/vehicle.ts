import { db } from ".";
import type { VehicleSchemaType } from "@/types";
import { siteConfig } from "@/config/site";
import { Prisma } from "@prisma/client";

export async function getVehicles() {
  try {
    const vehicles = await db.vehicle.findMany();
    return { vehicles };
  } catch (error) {
    console.log("error fetching vehicles", { error });
    return { error };
  }
}
export async function getPaginatedVehicles(
  search: string | undefined,
  page = 1,
  pageSize = siteConfig.pageSize,
  sortby: string | undefined,
  order = "asc",
  reportDate: string | undefined
) {
  //filter by date
  const filterByDate = reportDate?.split("_").map((date) => new Date(date));

  const sortItems = new Map([
    ["id", { id: order }],
    ["port", { port: order }],
    ["createdAt", { createdAt: order }],
    ["broker", { broker: { name: order } }],
    ["customer", { customer: { name: order } }],
    ["paymentType", { paymentType: order }],
  ]);
  // order by these fields
  const orderBy = sortby ? sortItems.get(sortby) : { id: "desc" };

  const id = !!parseInt(search as string)
    ? parseInt(search as string)
    : undefined;
  const skip: number = (page - 1) * pageSize;
  try {
    const vehicles = await db.vehicle.findMany({
      where: {
        id: {
          equals: id ? id : undefined,
        },
        AND: [
          {
            createdAt: {
              gte: filterByDate?.[0] || undefined,
            },
          },
          {
            createdAt: {
              lte: filterByDate?.[1] || undefined,
            },
          },
        ],
      },
      skip,
      take: pageSize,
      include: {
        broker: true,
        vehicleInfo: {
          include: {
            vehicleType: {
              include: {
                manufacturer: true,
              },
            },
            color: true,
          },
        },
        emissionTest: true,
        highBeamLevel: true,
        brakeTest: true,
        customer: {
          select: {
            name: true,
          },
        },
        sideSlip: true,
        suspensionTest: true,
        visualInspection: true,
      },
      orderBy:
        orderBy as Prisma.Enumerable<Prisma.VehicleOrderByWithRelationInput>,
    });
    const vehicleCount = await db.vehicle.count({
      where: {
        id: {
          equals: id || undefined,
        },
      },
    });

    return {
      vehicles,
      totalPages: Math.ceil(vehicleCount / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching vehicles", { error });
    return { error };
  }
}
export async function getVehicleById(id: number) {
  try {
    const vehicle = await db.vehicle.findUnique({
      where: { id },
      include: {
        broker: true,
        vehicleInfo: {
          include: {
            vehicleType: {
              include: {
                manufacturer: true,
              },
            },
            color: true,
          },
        },
        emissionTest: true,
        highBeamLevel: true,
        brakeTest: true,
        sideSlip: true,
        suspensionTest: true,
        visualInspection: true,
        customer: {
          select: { name: true, phone: true },
        },
      },
    });
    return { vehicle };
  } catch (error) {
    console.log("error fetching vehicle", { error });
    return { error };
  }
}

export async function createVehicle(
  vehicle: VehicleSchemaType,
  userId: string
) {
  try {
    const newVehicle = await db.vehicle.create({
      data: {
        ...vehicle,
        userId: userId,
      },
    });
    return { newVehicle };
  } catch (error: any) {
    console.log("error creating vehicle");
    console.log(error);
    return { error };
  }
}

export async function updateVehicle(data: VehicleSchemaType, id: number) {
  try {
    const updatedVehicle = await db.vehicle.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedVehicle };
  } catch (error: any) {
    console.log("error updating vehicle");
    return { error };
  }
}

export async function deleteVehicle(id: number) {
  try {
    const deleteVehicle = await db.vehicle.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error) {
    console.log("error deleting vehicle");
    console.log(error);
    return { success: false, error };
  }
}
