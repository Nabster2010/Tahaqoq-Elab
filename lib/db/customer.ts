import { siteConfig } from "@/config/site";
import { CustomerSchemaType } from "@/types";
import { db } from ".";

export async function getCustomers() {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        name: "asc",
      },
      include: { broker: true },
    });
    return {
      customers,
    };
  } catch (error) {
    console.log("error fetching customers", { error });
    return { error };
  }
}
export async function getPaginatedCustomers(
  search = "",
  page = 1,
  pageSize = siteConfig.pageSize
) {
  const skip: number = (page - 1) * pageSize;
  try {
    const customers = await db.customer.findMany({
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
        broker: true,
        _count: true,
      },
      take: pageSize,
    });

    //TODO: fix this
    const count = await db.customer.count({
      where: {
        name: {
          contains: search.toLowerCase() || undefined,
        },
      },
    });
    return {
      customers,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.log("error fetching customers", { error });
    return { error };
  }
}

export async function getCustomerById(id: string) {
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
      include: {
        broker: true,
      },
    });
    return { customer };
  } catch (error) {
    console.log("error fetching customer", { error });
    return { error };
  }
}

export async function createCustomer(customer: CustomerSchemaType) {
  try {
    const newCustomer = await db.customer.create({
      data: {
        ...customer,
      },
    });
    return { newCustomer };
  } catch (error) {
    console.log("error creating customer");
    console.log(error);
    return { error };
  }
}

export async function updateCustomer(data: CustomerSchemaType, id: string) {
  try {
    const updatedCustomer = await db.customer.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { updatedCustomer };
  } catch (error) {
    console.log("error updating customer");
    console.log(error);
    return { error };
  }
}

export async function deleteCustomer(id: string) {
  try {
    const deletedCustomer = await db.customer.delete({
      where: {
        id,
      },
    });
    return { deletedCustomer };
  } catch (error) {
    console.log("error deleting customer");
    return { error };
  }
}
