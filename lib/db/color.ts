import { siteConfig } from "@/config/site";
import { ColorSchemaType, PageSearchParams } from "@/types";
import { getServerSession } from "next-auth";
import { db } from ".";
import { authOptions } from "../auth";

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
export async function getPaginatedColors(params: PageSearchParams) {
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
    const colors = await db.color.findMany({
      where: {
        color: {
          contains: search,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });
    const colorsCount = await db.color.count({
      where: {
        color: {
          contains: search,
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
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const newColor = await db.color.create({
      data: {
        ...color,
        userId,
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
