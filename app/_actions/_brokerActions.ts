"use server";
import { createBroker, deleteBroker, updateBroker } from "@/lib/db/broker";
import { BrokerSchemaType } from "@/types";
export async function createNewBrokerAction(data: BrokerSchemaType) {
  const newBroker = await createBroker(data);
  return JSON.stringify(newBroker);
}

export async function updateBrokerAction(data: BrokerSchemaType, id: string) {
  const updatedBroker = await updateBroker(data, id);
  return JSON.stringify(updatedBroker);
}

export async function deleteBrokerAction(id: string) {
  const deletedBroker = await deleteBroker(id);
  return JSON.stringify(deletedBroker);
}
