import { z } from "zod";

export const ColorSchema = z.object({
  color: z.string().trim().nonempty("Color is required"),
  description: z.string().trim().nonempty("Description is required"),
});
