import { siteConfig } from "@/config/site";
import { CustomerSchemaType, PageSearchParams } from "@/types";
import { db } from ".";

export async function getCustomers() {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return {
      customers,
    };
  } catch (error) {
    console.log("error fetching customers", { error });
    return { error };
  }
}
export async function getPaginatedCustomers(params: PageSearchParams) {
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
    const customers = await db.customer.findMany({
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
    const count = await db.customer.count({
      where: {
        name: {
          contains: search,
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
