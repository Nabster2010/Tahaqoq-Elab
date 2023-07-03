import { z } from "zod";

export const BrokerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string(),
  email: z.string(),
  percentage: z.number(),
});
