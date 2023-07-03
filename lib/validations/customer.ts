import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  website: z.string(),
  taxId: z.string(),
  customerType: z.string().default("INDIVIDUAL"),
});
