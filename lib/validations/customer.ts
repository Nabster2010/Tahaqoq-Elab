import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  email: z.string().trim(),
  phone: z.string().trim(),
  address: z.string(),
  website: z.string().trim(),
  taxId: z.string().trim(),
  customerType: z.string().default("INDIVIDUAL"),
});
