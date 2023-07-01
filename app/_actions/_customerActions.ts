"use server";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "@/lib/db/customer";
import { CustomerSchemaType } from "@/types";
export async function createNewCustomerAction(data: CustomerSchemaType) {
  const newCustomer = await createCustomer(data);
  return JSON.stringify(newCustomer);
}

export async function updateCustomerAction(
  data: CustomerSchemaType,
  id: string
) {
  const updatedCustomer = await updateCustomer(data, id);
  return JSON.stringify(updatedCustomer);
}

export async function deleteCustomerAction(id: string) {
  const deletedCustomer = await deleteCustomer(id);
  return JSON.stringify(deletedCustomer);
}
