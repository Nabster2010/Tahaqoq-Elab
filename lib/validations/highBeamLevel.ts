import { z } from "zod";

export const HighBeamLevelSchema = z.object({
  vehicleId: z.number(),
  level: z.number().min(0),
  left: z.number().min(0),
  right: z.number().min(0),
  result: z.string().default("PASS"),
});
