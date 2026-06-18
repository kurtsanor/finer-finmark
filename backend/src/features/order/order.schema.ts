import { z } from "zod";

export const createOrderSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    postalCode: z.string().trim().min(1, "Postal code is required"),
    phoneNumber: z.string().trim().min(1, "Phone number is required"),
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["placed", "confirmed", "shipped", "delivered"]),
});