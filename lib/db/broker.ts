import { siteConfig } from "@/config/site";
import { BrokerSchemaType, PageSearchParams } from "@/types";
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
export async function getPaginatedBrokers(params: PageSearchParams) {
  //start sanitize params
  let search = params.search
    ? decodeURIComponent(params.search).toLowerCase()
    : undefined;
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
    const brokers = await db.broker.findMany({
      where: {
        name: {
          contains: search,
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
          contains: search,
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
