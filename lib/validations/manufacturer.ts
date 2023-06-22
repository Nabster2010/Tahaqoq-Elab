import { z } from "zod";

export const ManufacturerSchema = z.object({
  name: z.string().nonempty("Manufacturer name  is required"),
  description: z.string().nonempty("Description is required"),
  country: z.string().nonempty("Country is required"),
});
