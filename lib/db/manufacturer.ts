import { siteConfig } from "@/config/site";
import { ManufacturerSchemaType } from "@/types";
import { db } from ".";

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

export async function getPaginatedManufacturers(
  search = "",
  page = 1,
  pageSize = siteConfig.pageSize
) {
  const skip: number = (page - 1) * pageSize;
  try {
    const manufacturers = await db.vehicleManufacturer.findMany({
      where: {
        name: {
          contains: search.toLowerCase(),
        },
      },
      orderBy: {
        name: "asc",
      },
      skip,
      take: pageSize,
    });
    const count = await db.vehicleManufacturer.count({
      where: {
        name: {
          contains: search.toLowerCase(),
        },
      },
    });
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
  try {
    const newManufacturer = await db.vehicleManufacturer.create({
      data: {
        ...manufacturer,
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
