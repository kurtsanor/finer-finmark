import { z } from "zod";

const containsLetter = (val: string) => /[a-zA-Z]/.test(val);

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Product title must be at least 5 characters")
    .max(150, "Product title is too long")
    .refine(containsLetter, "Product name cannot consist of numbers only"),
  description: z
    .string()
    .trim()
    .min(20, "Please write a more detailed product description")
    .max(2000, "Description is too long (max 2000 characters)")
    .refine(containsLetter, "Description cannot consist of numbers only"),
  price: z
    .number("Price must be a valid number")
    .positive("Price must be greater than zero")
    .max(10000000, "Price must be less than 10,000,000")
    .refine(
      (val) => Number.isInteger(Math.round(val * 100)), "Price can have at most 2 decimal places",
    ),
  category: z
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(100, "Category is too long")
    .refine(containsLetter, "Category cannot consist of numbers only"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
