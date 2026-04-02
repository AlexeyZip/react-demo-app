import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must contain at least 2 characters"),
  email: z.email("Please enter a valid email"),
  address: z.string().min(5, "Address must contain at least 5 characters"),
  city: z.string().min(2, "City must contain at least 2 characters"),
  postalCode: z
    .string()
    .min(3, "Postal code must contain at least 3 characters"),
});

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
