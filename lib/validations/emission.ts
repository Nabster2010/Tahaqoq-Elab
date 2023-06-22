import { z } from "zod";

export const EmissionSchema = z.object({
  vehicleId: z.number(),
  co: z.number().min(0),
  hc: z.number().min(0),
  diesel: z.number().min(0),
  result: z.string().default("PASS"),
});
