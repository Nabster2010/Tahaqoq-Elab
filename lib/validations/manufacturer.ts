import { z } from "zod";

export const ManufacturerSchema = z.object({
  name: z.string().trim().nonempty("Manufacturer name  is required"),
  description: z.string().trim().nonempty("Description is required"),
  country: z.string().nonempty("Country is required"),
});
