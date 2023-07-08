import { db } from ".";
import type {
  PaginationProps,
  VehicleSchemaType,
  VehiclesFilterProps,
} from "@/types";
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

export async function getPaginatedVehicles(
  params: PaginationProps & VehiclesFilterProps
) {
  //start sanitize params
  let search = params.search || undefined;
  let page =
    params.page && !isNaN(parseInt(params.page.toString()))
      ? parseInt(params.page.toString())
      : 1;
  let pageSize =
    params.pageSize && !isNaN(parseInt(params.pageSize.toString()))
      ? parseInt(params.pageSize.toString())
      : siteConfig.pageSize;
  let sortby = params.sortby || "id";
  let order = params.order || "desc";
  let dateFrom =
    params.from && isValidDate(params.from) ? new Date(params.from) : undefined;
  let dateTo =
    params.to && isValidDate(params.to) ? new Date(params.to) : undefined;
  // end params sanitize
  const sortItems = new Map([
    ["id", { id: order }],
    ["port", { port: order }],
    ["createdAt", { createdAt: order }],
    ["broker", { broker: { name: order } }],
    ["customer", { customer: { name: order } }],
    ["paymentType", { paymentType: order }],
  ]);
  const orderBy = sortItems.get(sortby);
  const skip: number = page > 1 ? (page - 1) * pageSize : 0;

  const where = (search: string | undefined) => {
    if (search && !isNaN(parseInt(search))) {
      return {
        id: {
          equals: parseInt(search) || undefined,
        },
      };
    } else if (search) {
      return {
        customer: {
          name: {
            contains: search.toLowerCase() || undefined,
          },
        },
      };
    }
  };

  try {
    const vehicles = await db.vehicle.findMany({
      where: {
        ...where(search),
        AND: {
          createdAt: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
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
        ...where(search),
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
