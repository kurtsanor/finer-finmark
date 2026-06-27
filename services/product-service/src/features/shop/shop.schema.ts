import { z } from "zod";

export const shopSchema = z.object({
  name: z.string().trim().min(1, "Shop name is required"),
  description: z.string().trim().min(1, "Shop description is required"),
});
