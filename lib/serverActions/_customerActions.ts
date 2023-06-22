"use server";
import { createCustomer, updateCustomer } from "@/lib/db/customer";
import { CustomerSchemaType } from "@/types";
export async function createNewCustomerAction(data: CustomerSchemaType) {
  const newCustomer = await createCustomer(data);
  return newCustomer;
}

export async function updateCustomerAction(
  data: CustomerSchemaType,
  id: string
) {
  const updatedCustomer = await updateCustomer(data, id);
  return updatedCustomer;
}
