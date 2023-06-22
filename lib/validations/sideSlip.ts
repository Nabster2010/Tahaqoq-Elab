import { z } from "zod";

export const SideSlipSchema = z.object({
  vehicleId: z.number(),
  reading: z.number().min(0),
  result: z.string().default("PASS"),
});
