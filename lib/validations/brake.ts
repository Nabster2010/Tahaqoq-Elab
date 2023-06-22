import { z } from "zod";

export const BrakeSchema = z.object({
  vehicleId: z.number(),
  parking: z.number().max(100).min(0),
  front: z.number().max(100).min(0),
  rear: z.number().max(100).min(0),
  result: z.string().default("PASS"),
});
