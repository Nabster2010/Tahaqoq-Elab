import { z } from "zod";

export const BrokerSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  phone: z.string().trim(),
  email: z.string().trim(),
  percentage: z.number(),
});
