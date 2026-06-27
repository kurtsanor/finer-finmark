import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(2, "Category must be at least 2 characters"),
});
