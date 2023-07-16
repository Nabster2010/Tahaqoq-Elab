import { z } from "zod";

export const VehicleTypeSchema = z.object({
  modelType: z.string().trim().nonempty("Model type is required"),
  description: z.string().trim().nonempty("description  is required"),
  manufacturerId: z.string().nonempty("manufacturer is required"),
});
