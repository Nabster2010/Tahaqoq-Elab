import { siteConfig } from "@/config/site";
import { ColorSchemaType } from "@/types";
import { db } from ".";

export async function getColors() {
  try {
    const colors = await db.color.findMany({
      orderBy: {
        color: "asc",
      },
    });
    return { colors };
  } catch (error) {
    console.log("error fetching colors", { error });
    return { error };
  }
}
export async function getPaginatedColors(
  search: string | undefined,
  page = 1,
  pageSize = siteConfig.pageSize
) {
  const skip: number =
    (isNaN(parseInt(page.toString())) ? 0 : +page - 1) *
    (pageSize ? +pageSize : siteConfig.pageSize);
  try {
    const colors = await db.color.findMany({
      where: {
        color: {
          contains: search || undefined,
        },
      },
      orderBy: {
        color: "asc",
      },
      skip,
      take: pageSize,
    });
    const colorsCount = await db.color.count({
      where: {
        color: {
          contains: search || undefined,
        },
      },
    });

    return {
      colors,
      totalPages: Math.ceil(colorsCount / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching colors", { error });
    return { error };
  }
}
export async function getColorById(id: string) {
  try {
    const color = await db.color.findUnique({
      where: {
        id,
      },
    });
    return { color };
  } catch (error) {
    console.log("error fetching color", { error });
    return { error };
  }
}

export async function createColor(color: ColorSchemaType) {
  try {
    const newColor = await db.color.create({
      data: {
        ...color,
      },
    });
    return { newColor };
  } catch (error) {
    console.log("error creating color");
    return { error };
  }
}

export async function updateColor(data: ColorSchemaType, id: string) {
  try {
    const updatedColor = await db.color.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedColor };
  } catch (error) {
    console.log("error updating color");
    return { error };
  }
}

export async function deleteColor(id: string) {
  try {
    const deletedColor = await db.color.delete({
      where: {
        id,
      },
    });
    return { deletedColor };
  } catch (error) {
    console.log("error deleting color");
    return { error };
  }
}
