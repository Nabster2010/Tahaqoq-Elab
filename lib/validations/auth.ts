import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const newUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
