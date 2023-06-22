import { z } from "zod";

export const SuspensionSchema = z.object({
  vehicleId: z.number(),
  fl: z.number().min(0).max(100),
  fr: z.number().min(0).max(100),
  rl: z.number().min(0).max(100),
  rr: z.number().min(0).max(100),
  result: z.string().default("PASS"),
});
