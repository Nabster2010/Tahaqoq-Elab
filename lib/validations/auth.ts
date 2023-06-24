import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const newUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
