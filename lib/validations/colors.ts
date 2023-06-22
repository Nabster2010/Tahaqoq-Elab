import { z } from "zod";

export const ColorSchema = z.object({
  color: z.string().nonempty("Color is required"),
  description: z.string().nonempty("Description is required"),
});
