import { z } from "zod";

export const createShopSchema = z.object({
  name: z
    .string()
    .min(3, "Shop name must be at least 3 characters")
    .max(100, "Shop name cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Please provide a more detailed shop description"),
});

export type CreateShopFormValues = z.infer<typeof createShopSchema>;
