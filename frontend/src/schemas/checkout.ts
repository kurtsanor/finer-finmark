import { z } from "zod";

export const checkoutSchema = z.object({
    shippingAddress: z.object({
        fullName: z.string().min(1, "Full name is required"),
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        postalCode: z.string().min(1, "Postal code is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
    }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;