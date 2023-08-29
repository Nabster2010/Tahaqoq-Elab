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
  let searchBy = params.searchBy || "id";
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
  const searchItems = new Map([
    [
      "id",
      {
        id: {
          equals:
            search && !isNaN(parseInt(search)) ? parseInt(search) : undefined,
        },
      },
    ],
    ["port", { port: { contains: search } }],
    ["reqNo", { reqNo: { contains: search } }],
    ["bayanNo", { bayanNo: { contains: search } }],
    ["vin", { vin: { contains: search } }],
    [
      "broker",
      {
        broker: {
          name: {
            contains: search?.toLowerCase(),
          },
        },
      },
    ],
    [
      "customer",
      {
        customer: {
          name: {
            contains: search?.toLowerCase(),
          },
        },
      },
    ],
  ]);

  const orderBy = sortItems.get(sortby);
  const skip: number = page > 1 ? (page - 1) * pageSize : 0;
  try {
    const [vehicles, count] = await db.$transaction([
      db.vehicle.findMany({
        where: {
          ...searchItems.get(searchBy),
          AND: {
            createdAt: {
              gte: dateFrom
                ? new Date(dateFrom.setHours(0, 0, 0, 0))
                : undefined,
              lte: dateTo
                ? new Date(dateTo.setHours(23, 59, 59, 999))
                : undefined,
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
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          sideSlip: true,
          suspensionTest: true,
          visualInspection: true,
        },
        orderBy:
          orderBy as Prisma.Enumerable<Prisma.VehicleOrderByWithRelationInput>,
      }),

      db.vehicle.count({
        where: {
          ...searchItems.get(searchBy),
          AND: {
            createdAt: {
              gte: dateFrom,
              lte: dateTo,
            },
          },
        },
      }),
    ]);

    return {
      vehicles,
      itemsCount: count,
      totalPages: Math.ceil(count / pageSize),
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
        user: { select: { name: true, email: true } },
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
    const vinExists = await db.vehicle.findFirst({
      where: {
        vin: vehicle.vin,
      },
    });
    if (vinExists) {
      return {
        error: {
          message: "VIN already exists",
        },
      };
    } else {
      const newVehicle = await db.vehicle.create({
        data: {
          ...vehicle,
          userId: userId,
        },
      });
      return { newVehicle };
    }
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
