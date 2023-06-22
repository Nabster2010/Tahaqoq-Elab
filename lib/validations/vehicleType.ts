import { z } from "zod";

export const VehicleTypeSchema = z.object({
  modelType: z.string().nonempty("Model type is required"),
  description: z.string().nonempty("description  is required"),
  manufacturerId: z.string().nonempty("manufacturer is required"),
});
