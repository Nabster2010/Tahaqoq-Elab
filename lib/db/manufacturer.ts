import { siteConfig } from "@/config/site";
import { ManufacturerSchemaType, PageSearchParams } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

export async function getManufacturers() {
  try {
    const manufacturers = await db.vehicleManufacturer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { manufacturers };
  } catch (error) {
    console.log("error fetching manufacturers", { error });
    return { error };
  }
}

export async function getPaginatedManufacturers(params: PageSearchParams) {
  //start sanitize params
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
    const [manufacturers, count] = await db.$transaction([
      db.vehicleManufacturer.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: pageSize,
      }),
      db.vehicleManufacturer.count({
        where: {
          name: {
            contains: search,
          },
        },
      }),
    ]);
    return {
      manufacturers,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching manufacturers", { error });
    return { error };
  }
}
export async function getManufacturerById(id: string) {
  try {
    const manufacturer = await db.vehicleManufacturer.findUnique({
      where: {
        id,
      },
    });
    return { manufacturer };
  } catch (error) {
    console.log("error fetching manufacturer", { error });
    return { error };
  }
}

export async function createManufacturer(manufacturer: ManufacturerSchemaType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newManufacturer = await db.vehicleManufacturer.create({
      data: {
        ...manufacturer,
        userId,
      },
    });
    return { newManufacturer };
  } catch (error) {
    console.log("error creating manufacturer");
    return { error };
  }
}

export async function updateManufacturer(
  data: ManufacturerSchemaType,
  id: string
) {
  try {
    const updatedManufacturer = await db.vehicleManufacturer.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedManufacturer };
  } catch (error) {
    console.log("error updating manufacturer");
    return { error };
  }
}

export async function deleteManufacturer(id: string) {
  try {
    const deletedModelTypes = db.vehicleType.deleteMany({
      where: {
        manufacturerId: id,
      },
    });
    const deleteManufacturer = db.vehicleManufacturer.delete({
      where: {
        id,
      },
    });
    await db.$transaction([deletedModelTypes, deleteManufacturer]);

    return { success: true };
  } catch (error) {
    console.log("error deleting manufacturer");
    console.log(error);
    return { success: false, error };
  }
}
