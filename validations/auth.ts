import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2).max(20),
});
