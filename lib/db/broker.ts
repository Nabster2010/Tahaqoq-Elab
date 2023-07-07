import { siteConfig } from "@/config/site";
import { BrokerSchemaType } from "@/types";
import { db } from ".";

export async function getBrokers() {
  try {
    const brokers = await db.broker.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return {
      brokers,
    };
  } catch (error) {
    console.log("error fetching brokers", { error });
    return { error };
  }
}
export async function getPaginatedBrokers(
  search = "",
  page = 1,
  pageSize = siteConfig.pageSize
) {
  const skip: number =
    (isNaN(parseInt(page.toString())) ? 0 : +page - 1) *
    (pageSize ? +pageSize : siteConfig.pageSize);

  try {
    const brokers = await db.broker.findMany({
      where: {
        name: {
          contains: search.toLowerCase() || undefined,
        },
      },

      orderBy: {
        name: "asc",
      },
      skip,
      include: {
        _count: true,
      },
      take: pageSize,
    });

    //TODO: fix this
    const count = await db.broker.count({
      where: {
        name: {
          contains: search.toLowerCase() || undefined,
        },
      },
    });
    return {
      brokers,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching brokers", { error });
    return { error };
  }
}

export async function getBrokerById(id: string) {
  try {
    const broker = await db.broker.findUnique({
      where: {
        id,
      },
    });
    return { broker };
  } catch (error) {
    console.log("error fetching broker", { error });
    return { error };
  }
}

export async function createBroker(broker: BrokerSchemaType) {
  try {
    const newBroker = await db.broker.create({
      data: {
        ...broker,
      },
    });
    return { newBroker };
  } catch (error) {
    console.log("error creating broker");
    console.log(error);
    return { error };
  }
}

export async function updateBroker(data: BrokerSchemaType, id: string) {
  try {
    const updatedBroker = await db.broker.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedBroker };
  } catch (error) {
    console.log("error updating broker");
    console.log(error);
    return { error };
  }
}

export async function deleteBroker(id: string) {
  try {
    const deletedBroker = await db.broker.delete({
      where: {
        id,
      },
    });
    return { deletedBroker };
  } catch (error) {
    console.log("error deleting broker");
    return { error };
  }
}
