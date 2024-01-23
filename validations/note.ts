import z from "zod";

export const noteSchema = z.object({
  title: z.string().max(30),
  description: z.string(),
});
