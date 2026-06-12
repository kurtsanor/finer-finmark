import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(5, "Product title must be at least 5 characters")
    .max(150, "Product title is too long"),
  description: z
    .string()
    .min(20, "Please write a more detailed product description"),
  price: z
    .number("Price must be a valid number")
    .positive("Price must be greater than zero"),
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(100, "Category is too long"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
