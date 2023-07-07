import { db } from ".";
import type { FilterProps, PaginationProps, VehicleSchemaType } from "@/types";
import { siteConfig } from "@/config/site";
import { Prisma } from "@prisma/client";
import { isValidDate } from "../helpers";

export async function getVehicles() {
  try {
    const vehicles = await db.vehicle.findMany();
    return { vehicles };
  } catch (error) {
    console.log("error fetching vehicles", { error });
    return { error };
  }
}

export async function getPaginatedVehicles({
  search,
  page,
  pageSize,
  sortby,
  order,
  from,
  to,
}: PaginationProps & FilterProps) {
  const dateFrom = isValidDate(from) ? new Date(from).toISOString() : undefined;
  const dateTo = isValidDate(to) ? new Date(to).toISOString() : undefined;
  const sortItems = new Map([
    ["id", { id: order }],
    ["port", { port: order }],
    ["createdAt", { createdAt: order }],
    ["broker", { broker: { name: order } }],
    ["customer", { customer: { name: order } }],
    ["paymentType", { paymentType: order }],
  ]);
  const orderBy = sortItems.get(sortby);

  const skip: number =
    (isNaN(parseInt(page.toString())) ? 0 : +page - 1) *
    (pageSize ? +pageSize : siteConfig.pageSize);
  try {
    const vehicles = await db.vehicle.findMany({
      where: {
        id: {
          equals: isNaN(parseInt(search)) ? undefined : parseInt(search),
        },
        AND: {
          createdAt: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
      },
      skip,
      take: pageSize ? parseInt(pageSize) : siteConfig.pageSize,
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
          equals: isNaN(parseInt(search)) ? undefined : parseInt(search),
        },
        AND: {
          createdAt: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
      },
    });

    return {
      vehicles,
      totalPages: Math.ceil(
        vehicleCount / (pageSize ? parseInt(pageSize) : siteConfig.pageSize)
      ),
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
